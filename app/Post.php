<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Post
 *
 * @property-write mixed $title
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Post onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Post withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Post withoutTrashed()
 * @mixin \Eloquent
 * @property int $id
 * @property string $slug
 * @property string $content 内容
 * @property \Carbon\Carbon|null $published_at 发布时间
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereUpdatedAt($value)
 */
class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'published_at',
    ];

    protected $dates = ['created_at', 'updated_at', 'published_at'];

    /**
     * 根据title自动生成slug.
     *
     * @param $value
     */
    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;

        if (!$this->exists) {
            $this->attributes['slug'] = str_slug($value);
        }
    }
}
