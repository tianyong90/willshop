<?php

namespace App\Repositories;

/**
 * BaseRepositoryTrait.
 */
trait BaseRepositoryTrait
{
    /**
     * Specify Model class name.
     *
     * @return string
     */
    public function model()
    {
        $class = explode('\\', get_class($this));

        if (!empty($class[2]) && class_exists($model = 'App\\'.str_replace('Repository', '', $class[2]))) {
            return $model;
        }
    }
}
