<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\Cors;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Register CORS middleware globally
        $middleware->append(Cors::class);
        
        // DISABLE CSRF FOR API ROUTES - YEH IMPORTANT HAI
        $middleware->validateCsrfTokens(except: [
            'api/*',
            'contact',
            'quotes',
            'upload-image',
            'register',
            'login',
        ]);
        
        // Sanctum middleware for API authentication
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);
        
        // Alias middleware for route-specific use
        $middleware->alias([
            'auth.sanctum' => \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'admin' => \App\Http\Middleware\AdminMiddleware::class,  // YEH LINE ADD KARI
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Custom exception handling if needed
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Unauthenticated. Please login first.',
                    'status' => 401
                ], 401);
            }
        });
        
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                    'status' => 422
                ], 422);
            }
        });
    })->create();