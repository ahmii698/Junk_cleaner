<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class PasswordResetController extends Controller
{
    // 1. Send OTP to email
    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        $user = User::where('email', $request->email)->first();
        $otp = rand(100000, 999999);

        // Store OTP for 10 minutes
        Cache::put('otp_' . $request->email, $otp, 600);

        // ---------- PHPMailer ----------
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = env('MAIL_HOST', 'smtp.gmail.com');
            $mail->SMTPAuth   = true;
            $mail->Username   = env('MAIL_USERNAME');
            $mail->Password   = env('MAIL_PASSWORD');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = env('MAIL_PORT', 587);

            // Recipients
            $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            $mail->addAddress($request->email, $user->name);

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Password Reset OTP - Simon Junk Removal';
            $mail->Body = "
                <div style='font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background: #0a1628; color: white; border-radius: 10px;'>
                    <h2 style='color: #00d4ff;'>Password Reset Request</h2>
                    <p>Hello <strong>{$user->name}</strong>,</p>
                    <p>You requested to reset your password. Use the OTP below:</p>
                    <div style='background: #00d4ff; color: #0a1628; font-size: 32px; font-weight: bold; text-align: center; padding: 15px; border-radius: 8px; letter-spacing: 5px;'>
                        {$otp}
                    </div>
                    <p>This OTP is valid for <strong>10 minutes</strong>.</p>
                    <p>If you didn't request this, ignore this email.</p>
                    <hr style='border-color: #00d4ff;'>
                    <p style='font-size: 12px; color: #888;'>Simon Junk Removal - Admin</p>
                </div>
            ";

            $mail->send();
            return response()->json(['success' => true, 'message' => 'OTP sent to your email']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Mail error: ' . $mail->ErrorInfo], 500);
        }
    }

    // 2. Verify OTP
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp'   => 'required|numeric'
        ]);

        $cachedOtp = Cache::get('otp_' . $request->email);

        if (!$cachedOtp) {
            return response()->json(['success' => false, 'message' => 'OTP expired or not found'], 400);
        }

        if ($cachedOtp != $request->otp) {
            return response()->json(['success' => false, 'message' => 'Invalid OTP'], 400);
        }

        // Mark as verified for 10 minutes
        Cache::put('verified_' . $request->email, true, 600);

        return response()->json(['success' => true, 'message' => 'OTP verified successfully']);
    }

    // 3. Reset Password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'                 => 'required|email|exists:users,email',
            'password'              => 'required|min:8|confirmed',
            'password_confirmation' => 'required'
        ]);

        // Check if OTP verified
        if (!Cache::get('verified_' . $request->email)) {
            return response()->json(['success' => false, 'message' => 'OTP not verified'], 400);
        }

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        // Clear cache
        Cache::forget('otp_' . $request->email);
        Cache::forget('verified_' . $request->email);

        return response()->json(['success' => true, 'message' => 'Password reset successfully. Please login with new password.']);
    }
}