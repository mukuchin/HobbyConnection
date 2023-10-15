<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === "production") {
            \URL::forceScheme('https');
        }

        Inertia::share('reload', function () {

            // セッション変数'reload'があればtrueを返す
            if (session('reload')) {
                return true;
            } else {
                return false;
            }
        });
    }
}