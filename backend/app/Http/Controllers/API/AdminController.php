<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Quote;
use App\Models\Service;
use App\Models\FAQ;
use App\Models\Gallery;
use App\Models\User;
use App\Models\HeroSetting;
use App\Models\ProcessSetting;
use App\Models\WhyChooseUs;
use App\Models\AboutSetting;
use App\Models\FooterSetting;  // 🔥 ADD THIS LINE
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
    
    // ========== HERO SETTINGS ==========
    public function getHeroSettings()
    {
        $hero = HeroSetting::where('is_active', true)->first();
        if (!$hero) {
            $hero = HeroSetting::create([
                'badge_text' => "Maplewood's Most Trusted | 12+ Years",
                'heading_line1' => 'Clear Your Space.',
                'heading_line2' => 'Fast. Fair. Green.',
                'description' => 'Professional junk removal services — from single items to full property cleanouts. Same-day service available.',
                'button_text' => 'Get Free Estimate →',
                'button_link' => '/contact',
                'stat1_text' => '3500+ projects',
                'stat2_text' => '95% recycled',
                'stat3_text' => '5.0 stars (412 reviews)',
                'hero_image' => '/download.jfif',
                'is_active' => true,
            ]);
        }
        return response()->json($hero);
    }
    
    public function updateHeroSettings($id, Request $request)
    {
        $hero = HeroSetting::findOrFail($id);
        $hero->update($request->all());
        return response()->json([
            'success' => true, 
            'message' => 'Hero settings updated successfully',
            'data' => $hero
        ]);
    }
    
    // ========== PROCESS SETTINGS ==========
    public function getProcessSettings()
    {
        $process = ProcessSetting::where('is_active', 1)->first();
        if (!$process) {
            $process = ProcessSetting::create([
                'section_title' => 'How We Work',
                'section_highlight' => 'We Work',
                'step1_title' => 'Free Quote',
                'step1_desc' => 'Call or text — get price instantly',
                'step2_title' => 'Schedule',
                'step2_desc' => 'Pick time that suits you',
                'step3_title' => 'We Haul',
                'step3_desc' => 'We load, sweep, clean up',
                'step4_title' => 'Green Disposal',
                'step4_desc' => 'Donate & recycle maximum',
                'is_active' => 1,
            ]);
        }
        return response()->json($process);
    }
    
    public function updateProcessSettings($id, Request $request)
    {
        $process = ProcessSetting::findOrFail($id);
        $process->update($request->all());
        return response()->json([
            'success' => true, 
            'message' => 'Process settings updated successfully',
            'data' => $process
        ]);
    }
    
    // ========== WHY CHOOSE US SETTINGS ==========
    public function getWhyChooseUs()
    {
        $why = WhyChooseUs::where('is_active', 1)->first();
        if (!$why) {
            $why = WhyChooseUs::create([
                'section_title' => 'Why Choose Us?',
                'section_highlight' => 'Choose Us?',
                'card1_icon' => 'fa-bolt',
                'card1_title' => 'Lightning Fast',
                'card1_desc' => 'Local team arrives within 1-2 hours',
                'card1_price' => '1-2 hour arrival',
                'card2_icon' => 'fa-dollar-sign',
                'card2_title' => 'Upfront Price',
                'card2_desc' => 'No hidden fees',
                'card2_price' => 'Transparent pricing',
                'card3_icon' => 'fa-leaf',
                'card3_title' => 'Eco Friendly',
                'card3_desc' => 'Green disposal',
                'card3_price' => '90%+ recycled',
                'is_active' => 1,
            ]);
        }
        return response()->json($why);
    }
    
    public function updateWhyChooseUs($id, Request $request)
    {
        $why = WhyChooseUs::findOrFail($id);
        $why->update($request->all());
        return response()->json([
            'success' => true, 
            'message' => 'Why Choose Us settings updated successfully',
            'data' => $why
        ]);
    }
    
    // ========== ABOUT SETTINGS ==========
    public function getAboutSettings()
    {
        $about = AboutSetting::where('is_active', 1)->first();
        if (!$about) {
            $about = AboutSetting::create([
                'heading' => 'About Simon Junk Removal',
                'highlight_word' => 'Simon Junk Removal',
                'paragraph1' => 'With over 12 years of experience, we\'ve helped thousands of homeowners and businesses clear their spaces efficiently and responsibly.',
                'paragraph2' => 'We believe in giving back to the community and protecting our environment. That\'s why we donate usable items to local charities and recycle over 90% of what we collect.',
                'about_image' => '/01.webp',
                'stat1_number' => '12+',
                'stat1_label' => 'Years Experience',
                'stat2_number' => '3500+',
                'stat2_label' => 'Projects Completed',
                'stat3_number' => '95%',
                'stat3_label' => 'Recycled/Donated',
                'card1_icon' => 'fa-truck',
                'card1_title' => 'Licensed & Insured',
                'card1_desc' => 'Fully licensed and insured for your peace of mind',
                'card2_icon' => 'fa-leaf',
                'card2_title' => 'Eco-Friendly',
                'card2_desc' => 'We recycle and donate whenever possible',
                'card3_icon' => 'fa-clock',
                'card3_title' => 'Same-Day Service',
                'card3_desc' => 'Emergency and same-day service available',
                'button_text' => 'Get Your Free Quote →',
                'button_link' => '/contact',
                'is_active' => 1,
            ]);
        }
        return response()->json($about);
    }
    
    public function updateAboutSettings($id, Request $request)
    {
        $about = AboutSetting::findOrFail($id);
        $about->update($request->all());
        return response()->json([
            'success' => true, 
            'message' => 'About settings updated successfully',
            'data' => $about
        ]);
    }
    
    // ========== FOOTER SETTINGS ==========
    public function getFooterSettings()
    {
        $footer = FooterSetting::where('is_active', 1)->first();
        if (!$footer) {
            $footer = FooterSetting::create([
                'company_name' => 'Simon Junk Removal',
                'company_desc' => 'Professional, eco-friendly junk removal serving Maplewood and all of Essex County, NJ.',
                'facebook_url' => '#',
                'instagram_url' => '#',
                'twitter_url' => '#',
                'copyright_text' => 'All rights reserved.',
                'license_text' => 'License #JR-2847-NJ',
                'phone' => '(248) 242-1376',
                'email' => 'salvadorgutierrez2012@gmail.com',
                'address' => 'Maplewood, NJ 07040',
                'footer_bg' => 'bg-navy-900/80',
                'is_active' => 1,
            ]);
        }
        return response()->json($footer);
    }
    
    public function updateFooterSettings($id, Request $request)
    {
        $footer = FooterSetting::findOrFail($id);
        $footer->update($request->all());
        return response()->json([
            'success' => true, 
            'message' => 'Footer settings updated successfully',
            'data' => $footer
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
    
    public function sendContactEmail(Request $request, $id)
    {
        $request->validate([
            'subject' => 'required|string',
            'message' => 'required|string',
            'to_email' => 'required|email',
            'to_name' => 'required|string'
        ]);
        
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
            $mail->addAddress($request->to_email, $request->to_name);
            
            $mail->isHTML(true);
            $mail->Subject = $request->subject;
            $mail->Body = "
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='UTF-8'>
                    <title>{$request->subject}</title>
                </head>
                <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
                    <div style='max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;'>
                        <div style='text-align: center; padding: 20px 0; border-bottom: 2px solid #00d4ff;'>
                            <h1 style='color: #00d4ff; margin: 0;'>Simon Junk Removal</h1>
                            <p style='color: #666; margin: 5px 0 0;'>Professional Junk Removal Services</p>
                        </div>
                        
                        <div style='padding: 20px 0;'>
                            <p>Dear <strong style='color: #00d4ff;'>{$request->to_name}</strong>,</p>
                            
                            <div style='background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #00d4ff;'>
                                " . nl2br(e($request->message)) . "
                            </div>
                            
                            <p>If you have any further questions, feel free to reply to this email or call us at <strong>(248) 242-1376</strong>.</p>
                        </div>
                        
                        <div style='padding: 15px 0; text-align: center; border-top: 1px solid #ddd; font-size: 12px; color: #888;'>
                            <p>© 2025 Simon Junk Removal. All rights reserved.</p>
                            <p>Maplewood, NJ | (248) 242-1376</p>
                        </div>
                    </div>
                </body>
                </html>
            ";
            
            $mail->AltBody = strip_tags($request->message) . "\n\n---\nSimon Junk Removal\n(248) 242-1376";
            $mail->send();
            
            return response()->json(['success' => true, 'message' => 'Email sent successfully to ' . $request->to_email]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to send email: ' . $mail->ErrorInfo], 500);
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
    
    public function sendQuoteEmail(Request $request, $id)
    {
        $request->validate([
            'subject' => 'required|string',
            'message' => 'required|string',
            'to_email' => 'required|email',
            'to_name' => 'required|string'
        ]);
        
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
            $mail->addAddress($request->to_email, $request->to_name);
            
            $mail->isHTML(true);
            $mail->Subject = $request->subject;
            $mail->Body = "
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='UTF-8'>
                    <title>{$request->subject}</title>
                </head>
                <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
                    <div style='max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;'>
                        <div style='text-align: center; padding: 20px 0; border-bottom: 2px solid #00d4ff;'>
                            <h1 style='color: #00d4ff; margin: 0;'>Simon Junk Removal</h1>
                            <p style='color: #666; margin: 5px 0 0;'>Professional Junk Removal Services</p>
                        </div>
                        <div style='padding: 20px 0;'>
                            <p>Dear <strong style='color: #00d4ff;'>{$request->to_name}</strong>,</p>
                            <div style='background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #00d4ff;'>
                                " . nl2br(e($request->message)) . "
                            </div>
                            <p>If you have any further questions, feel free to reply to this email or call us at <strong>(248) 242-1376</strong>.</p>
                        </div>
                        <div style='padding: 15px 0; text-align: center; border-top: 1px solid #ddd; font-size: 12px; color: #888;'>
                            <p>© 2025 Simon Junk Removal. All rights reserved.</p>
                            <p>Maplewood, NJ | (248) 242-1376</p>
                        </div>
                    </div>
                </body>
                </html>
            ";
            
            $mail->AltBody = strip_tags($request->message) . "\n\n---\nSimon Junk Removal\n(248) 242-1376";
            $mail->send();
            
            return response()->json(['success' => true, 'message' => 'Email sent successfully to ' . $request->to_email]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to send email: ' . $mail->ErrorInfo], 500);
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