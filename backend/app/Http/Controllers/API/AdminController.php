<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Quote;
use App\Models\Service;
use App\Models\FAQ;
use App\Models\Gallery;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class AdminController extends Controller
{
    // Dashboard
    public function dashboard()
    {
        return response()->json([
            'total_contacts' => Contact::count(),
            'total_quotes' => Quote::count(),
            'total_services' => Service::count(),
            'total_faqs' => FAQ::count(),
            'total_galleries' => Gallery::count(),
            'total_users' => User::count(),
            'recent_contacts' => Contact::latest()->take(5)->get(),
            'recent_quotes' => Quote::latest()->take(5)->get(),
        ]);
    }
    
    // ========== CONTACTS ==========
    public function getContacts()
    {
        $contacts = Contact::latest()->paginate(20);
        return response()->json($contacts);
    }
    
    public function updateContact($id, Request $request)
    {
        $contact = Contact::findOrFail($id);
        $contact->update($request->only(['name', 'email', 'phone', 'message', 'is_read']));
        return response()->json(['success' => true, 'message' => 'Contact updated']);
    }
    
    public function deleteContact($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response()->json(['success' => true, 'message' => 'Contact deleted']);
    }
    
    public function replyContact($id, Request $request)
    {
        $request->validate([
            'subject' => 'required|string',
            'reply_message' => 'required|string',
        ]);
        
        $contact = Contact::findOrFail($id);
        
        // Send email using PHPMailer
        $mail = new PHPMailer(true);
        
        try {
            $mail->isSMTP();
            $mail->Host = env('MAIL_HOST', 'smtp.gmail.com');
            $mail->SMTPAuth = true;
            $mail->Username = env('MAIL_USERNAME');
            $mail->Password = env('MAIL_PASSWORD');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = env('MAIL_PORT', 587);
            
            $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            $mail->addAddress($contact->email, $contact->name);
            
            $mail->isHTML(true);
            $mail->Subject = $request->subject;
            $mail->Body = "
                <html>
                <body style='font-family: Arial, sans-serif;'>
                    <h2 style='color: #00d4ff;'>Reply from Simon Junk Removal</h2>
                    <p>Dear <strong>{$contact->name}</strong>,</p>
                    <div style='background: #f5f5f5; padding: 15px; border-radius: 8px;'>
                        {$request->reply_message}
                    </div>
                    <p>Thank you for contacting us.</p>
                    <hr>
                    <p style='font-size: 12px; color: #888;'>Simon Junk Removal - Customer Support</p>
                </body>
                </html>
            ";
            
            $mail->send();
            
            return response()->json(['success' => true, 'message' => 'Reply sent successfully']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Mail error: ' . $mail->ErrorInfo], 500);
        }
    }
    
    // ========== QUOTES ==========
    public function getQuotes()
    {
        $quotes = Quote::latest()->paginate(20);
        return response()->json($quotes);
    }
    
    public function updateQuote($id, Request $request)
    {
        $quote = Quote::findOrFail($id);
        $quote->update($request->only(['name', 'email', 'phone', 'service', 'description', 'is_read']));
        return response()->json(['success' => true, 'message' => 'Quote updated']);
    }
    
    public function deleteQuote($id)
    {
        $quote = Quote::findOrFail($id);
        $quote->delete();
        return response()->json(['success' => true, 'message' => 'Quote deleted']);
    }
    
    public function replyQuote($id, Request $request)
    {
        $request->validate([
            'subject' => 'required|string',
            'reply_message' => 'required|string',
        ]);
        
        $quote = Quote::findOrFail($id);
        
        $mail = new PHPMailer(true);
        
        try {
            $mail->isSMTP();
            $mail->Host = env('MAIL_HOST', 'smtp.gmail.com');
            $mail->SMTPAuth = true;
            $mail->Username = env('MAIL_USERNAME');
            $mail->Password = env('MAIL_PASSWORD');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = env('MAIL_PORT', 587);
            
            $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            $mail->addAddress($quote->email, $quote->name);
            
            $mail->isHTML(true);
            $mail->Subject = $request->subject;
            $mail->Body = "
                <html>
                <body>
                    <h2 style='color: #00d4ff;'>Quote Request Reply - Simon Junk Removal</h2>
                    <p>Dear <strong>{$quote->name}</strong>,</p>
                    <div>{$request->reply_message}</div>
                    <p>Thank you for your interest in our services.</p>
                    <hr>
                    <p>Simon Junk Removal - Customer Support</p>
                </body>
                </html>
            ";
            
            $mail->send();
            
            return response()->json(['success' => true, 'message' => 'Reply sent successfully']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Mail error: ' . $mail->ErrorInfo], 500);
        }
    }
    
    // ========== SERVICES ==========
    public function getServices()
    {
        $services = Service::orderBy('order')->get();
        return response()->json($services);
    }
    
    public function storeService(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'short_description' => 'required|string',
            'icon' => 'required|string',
            'price_tag' => 'nullable|string',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $service = Service::create([
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
            'short_description' => $request->short_description,
            'long_description' => $request->long_description,
            'icon' => $request->icon,
            'price_tag' => $request->price_tag,
            'order' => Service::count() + 1,
        ]);
        
        return response()->json(['success' => true, 'message' => 'Service created', 'data' => $service]);
    }
    
    public function updateService($id, Request $request)
    {
        $service = Service::findOrFail($id);
        $service->update($request->all());
        return response()->json(['success' => true, 'message' => 'Service updated']);
    }
    
    public function deleteService($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();
        return response()->json(['success' => true, 'message' => 'Service deleted']);
    }
    
    // ========== FAQS ==========
    public function getFaqs()
    {
        $faqs = FAQ::orderBy('order')->get();
        return response()->json($faqs);
    }
    
    public function storeFaq(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'question' => 'required|string',
            'answer' => 'required|string',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $faq = FAQ::create([
            'question' => $request->question,
            'answer' => $request->answer,
            'order' => FAQ::count() + 1,
        ]);
        
        return response()->json(['success' => true, 'message' => 'FAQ created', 'data' => $faq]);
    }
    
    public function updateFaq($id, Request $request)
    {
        $faq = FAQ::findOrFail($id);
        $faq->update($request->all());
        return response()->json(['success' => true, 'message' => 'FAQ updated']);
    }
    
    public function deleteFaq($id)
    {
        $faq = FAQ::findOrFail($id);
        $faq->delete();
        return response()->json(['success' => true, 'message' => 'FAQ deleted']);
    }
    
    // ========== GALLERY ==========
    public function getGalleries()
    {
        $galleries = Gallery::orderBy('order')->get();
        return response()->json($galleries);
    }
    
    public function storeGallery(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'image_path' => 'required|string',
            'category' => 'required|string',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $gallery = Gallery::create([
            'title' => $request->title,
            'image_path' => $request->image_path,
            'category' => $request->category,
            'description' => $request->description,
            'order' => Gallery::count() + 1,
        ]);
        
        return response()->json(['success' => true, 'message' => 'Gallery item created', 'data' => $gallery]);
    }
    
    public function updateGallery($id, Request $request)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->update($request->all());
        return response()->json(['success' => true, 'message' => 'Gallery updated']);
    }
    
    public function deleteGallery($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();
        return response()->json(['success' => true, 'message' => 'Gallery deleted']);
    }
    
    // ========== USERS ==========
    public function getUsers()
    {
        $users = User::latest()->paginate(20);
        return response()->json($users);
    }
    
    public function updateUser($id, Request $request)
    {
        $user = User::findOrFail($id);
        $user->update($request->only(['name', 'email', 'role']));
        return response()->json(['success' => true, 'message' => 'User updated']);
    }
    
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['success' => true, 'message' => 'User deleted']);
    }
}