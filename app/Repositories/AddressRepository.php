<?php

namespace App\Repositories;

use Prettus\Repository\Contracts\CacheableInterface;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Traits\CacheableRepository;

class AddressRepository extends BaseRepository implements CacheableInterface
{
    use BaseRepositoryTrait, CacheableRepository;
}
