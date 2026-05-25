<?php

use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\QuoteController;
use App\Http\Controllers\API\ServiceController;
use App\Http\Controllers\API\GalleryController;
use App\Http\Controllers\API\FAQController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PasswordResetController;
use App\Http\Controllers\API\AdminController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);
Route::get('/galleries', [GalleryController::class, 'index']);
Route::get('/faqs', [FAQController::class, 'index']);

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/quotes', [QuoteController::class, 'store']);
Route::post('/upload-image', [QuoteController::class, 'uploadImage']);

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Password Reset Routes
Route::post('/forgot-password', [PasswordResetController::class, 'sendOtp']);
Route::post('/verify-otp', [PasswordResetController::class, 'verifyOtp']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);

// Protected Routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Public Settings (no auth required for frontend)
Route::get('/hero', [AdminController::class, 'getHeroSettings']);
Route::get('/process', [AdminController::class, 'getProcessSettings']);
Route::get('/why-choose-us', [AdminController::class, 'getWhyChooseUs']);
Route::get('/about', [AdminController::class, 'getAboutSettings']);
Route::get('/footer', [AdminController::class, 'getFooterSettings']);  // 🔥 ADD THIS

// ========== ADMIN ROUTES (Protected + Admin Middleware) ==========
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    
    // Hero Settings (Admin)
    Route::get('/hero', [AdminController::class, 'getHeroSettings']);
    Route::put('/hero/{id}', [AdminController::class, 'updateHeroSettings']);
    
    // Process Settings (Admin)
    Route::get('/process', [AdminController::class, 'getProcessSettings']);
    Route::put('/process/{id}', [AdminController::class, 'updateProcessSettings']);
    
    // Why Choose Us (Admin)
    Route::get('/why-choose-us', [AdminController::class, 'getWhyChooseUs']);
    Route::put('/why-choose-us/{id}', [AdminController::class, 'updateWhyChooseUs']);
    
    // About Settings (Admin)
    Route::get('/about', [AdminController::class, 'getAboutSettings']);
    Route::put('/about/{id}', [AdminController::class, 'updateAboutSettings']);
    
    // 🔥 Footer Settings (Admin)
    Route::get('/footer', [AdminController::class, 'getFooterSettings']);
    Route::put('/footer/{id}', [AdminController::class, 'updateFooterSettings']);
    
    // Contacts
    Route::get('/contacts', [AdminController::class, 'getContacts']);
    Route::put('/contacts/{id}', [AdminController::class, 'updateContact']);
    Route::delete('/contacts/{id}', [AdminController::class, 'deleteContact']);
    Route::post('/contacts/{id}/reply', [AdminController::class, 'replyContact']);
    Route::post('/contacts/{id}/send-email', [AdminController::class, 'sendContactEmail']);
    
    // Quotes
    Route::get('/quotes', [AdminController::class, 'getQuotes']);
    Route::put('/quotes/{id}', [AdminController::class, 'updateQuote']);
    Route::delete('/quotes/{id}', [AdminController::class, 'deleteQuote']);
    Route::post('/quotes/{id}/reply', [AdminController::class, 'replyQuote']);
    Route::post('/quotes/{id}/send-email', [AdminController::class, 'sendQuoteEmail']);
    
    // Services
    Route::get('/services', [AdminController::class, 'getServices']);
    Route::post('/services', [AdminController::class, 'storeService']);
    Route::put('/services/{id}', [AdminController::class, 'updateService']);
    Route::delete('/services/{id}', [AdminController::class, 'deleteService']);
    
    // FAQs
    Route::get('/faqs', [AdminController::class, 'getFaqs']);
    Route::post('/faqs', [AdminController::class, 'storeFaq']);
    Route::put('/faqs/{id}', [AdminController::class, 'updateFaq']);
    Route::delete('/faqs/{id}', [AdminController::class, 'deleteFaq']);
    
    // Gallery
    Route::get('/galleries', [AdminController::class, 'getGalleries']);
    Route::post('/galleries', [AdminController::class, 'storeGallery']);
    Route::put('/galleries/{id}', [AdminController::class, 'updateGallery']);
    Route::delete('/galleries/{id}', [AdminController::class, 'deleteGallery']);
    
    // Users
    Route::get('/users', [AdminController::class, 'getUsers']);
    Route::put('/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
});