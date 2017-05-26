<?php

namespace App\Observers;

use App\User;

/**
 * User observer.
 */
class UserObserver
{
    /**
     * Creating User
     *
     * @param User $user
     */
    public function creating(User $user)
    {
        $user->api_token = str_random(60);
        $user->password = bcrypt($user->password);
    }

    /**
     * User created.
     *
     * @param User $user
     */
    public function created(User $user)
    {
        //
    }

    /**
     *
     *
     * @param User $user
     */
    public function updating(User $user)
    {
        //
    }

    /**
     * Saving User.
     *
     * @param User $user
     */
    public function saving(User $user)
    {
        //
    }

    /**
     * User Saved.
     *
     * @param User $user
     */
    public function saved(User $user)
    {
        //
    }
}