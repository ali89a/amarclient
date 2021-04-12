<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;
    protected $fillable = ['shop_id', 'category_id', 'sub_category_id', 'amount', 'notes'];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}
