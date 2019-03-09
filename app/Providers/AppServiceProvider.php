<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerObservers();
    }

    /**
     * Register model observers.
     */
    private function registerObservers()
    {
        \App\User::observe(\App\Observers\UserObserver::class);
        \App\Order::observe(\App\Observers\OrderObserver::class);
    }
}
