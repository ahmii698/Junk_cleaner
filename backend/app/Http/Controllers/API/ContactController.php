<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        try {
            \Log::info('Contact request received:', $request->all());
            
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'message' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $contact = Contact::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'message' => $request->message,
                'ip_address' => $request->ip(),
            ]);

            // 🔥 Send email notification to admin
            $this->sendAdminNotification($contact);

            return response()->json([
                'success' => true,
                'message' => 'Contact form submitted successfully!',
                'data' => $contact
            ], 201);
            
        } catch (\Exception $e) {
            \Log::error('Contact error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // 🔥 New method to send email to admin
    private function sendAdminNotification($contact)
    {
        $adminEmail = env('MAIL_FROM_ADDRESS', 'salvadorgutierrez2012@gmail.com');
        $adminName = env('MAIL_FROM_NAME', 'Simon Junk Removal');
        
        $mail = new PHPMailer(true);
        
        try {
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host = env('MAIL_HOST', 'smtp.gmail.com');
            $mail->SMTPAuth = true;
            $mail->Username = env('MAIL_USERNAME');
            $mail->Password = env('MAIL_PASSWORD');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = env('MAIL_PORT', 587);
            
            // Email Headers
            $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            $mail->addAddress($adminEmail, $adminName);
            
            // Email Content
            $mail->isHTML(true);
            $mail->Subject = '🔔 New Contact Message - Simon Junk Removal';
            $mail->Body = "
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='UTF-8'>
                    <title>New Contact Message</title>
                </head>
                <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
                    <div style='max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;'>
                        <div style='text-align: center; padding: 20px 0; border-bottom: 2px solid #00d4ff;'>
                            <h1 style='color: #00d4ff; margin: 0;'>📬 New Contact Message</h1>
                            <p style='color: #666; margin: 5px 0 0;'>Someone just submitted a contact form</p>
                        </div>
                        
                        <div style='padding: 20px 0;'>
                            <table style='width: 100%; border-collapse: collapse;'>
                                <tr>
                                    <td style='padding: 10px; background: #e8f4f8; font-weight: bold; width: 120px;'>Name:</td>
                                    <td style='padding: 10px; background: #f0f0f0;'>{$contact->name}</td>
                                </tr>
                                <tr>
                                    <td style='padding: 10px; background: #e8f4f8; font-weight: bold;'>Email:</td>
                                    <td style='padding: 10px; background: #f0f0f0;'>{$contact->email}</td>
                                </tr>
                                <tr>
                                    <td style='padding: 10px; background: #e8f4f8; font-weight: bold;'>Phone:</td>
                                    <td style='padding: 10px; background: #f0f0f0;'>{$contact->phone}</td>
                                </tr>
                                <tr>
                                    <td style='padding: 10px; background: #e8f4f8; font-weight: bold;'>IP Address:</td>
                                    <td style='padding: 10px; background: #f0f0f0;'>{$contact->ip_address}</td>
                                </tr>
                                <tr>
                                    <td style='padding: 10px; background: #e8f4f8; font-weight: bold;'>Time:</td>
                                    <td style='padding: 10px; background: #f0f0f0;'>{$contact->created_at}</td>
                                </tr>
                                <tr>
                                    <td style='padding: 10px; background: #e8f4f8; font-weight: bold; vertical-align: top;'>Message:</td>
                                    <td style='padding: 10px; background: #f0f0f0;'>
                                        <div style='background: white; padding: 10px; border-radius: 5px;'>
                                            " . nl2br(e($contact->message)) . "
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style='padding: 15px 0; text-align: center; border-top: 1px solid #ddd;'>
                            <a href='" . env('APP_URL') . "/admin/contacts' style='background: #00d4ff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>View in Admin Panel →</a>
                        </div>
                        
                        <div style='padding: 15px 0; text-align: center; font-size: 12px; color: #888;'>
                            <p>© 2025 Simon Junk Removal. All rights reserved.</p>
                            <p>This is an automated notification. Please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            ";
            
            // Plain text alternative
            $mail->AltBody = "New Contact Message\n\nName: {$contact->name}\nEmail: {$contact->email}\nPhone: {$contact->phone}\nMessage: {$contact->message}\n\nView in admin panel: " . env('APP_URL') . "/admin/contacts";
            
            $mail->send();
            
            \Log::info('Admin notification sent for contact ID: ' . $contact->id);
            return true;
            
        } catch (Exception $e) {
            // Log error but don't stop the process
            \Log::error('Admin notification email failed: ' . $mail->ErrorInfo);
            return false;
        }
    }
}