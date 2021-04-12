<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = ['shop_id', 'name', 'sku', 'amount', 'advance_payment', 'notes','due_payment','websites','next_payment_date','next_payment','start_date','end_date'];

    public function shop(){
        return $this->belongsTo(Shop::class);
    }
}