<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'shop_id', 'client_id','product_id', 'sku', 'amount', 'advance_payment', 'notes','due_payment','websites','next_payment_date','next_payment','start_date','end_date'];

    public function shop(){
        return $this->belongsTo(Shop::class);
    }

    public static function generateUniqueCode() {
        $shop_id = auth('user-api')->user()->shop_id;
        $serial = (self::where('shop_id', $shop_id)->latest()->first()->id ?? 0) + 1;
        $code = "#".$shop_id.date('my').$serial;
        return $code;
    }

    public function invoiceLog(){
        return $this->hasMany(InvoiceLog::class);
    }

    public function product(){
        return $this->hasMany(Product::class, 'id', 'product_id');
    }

    public function client(){
        return $this->belongsTo(Client::class);
    }

    public function products(){
        return $this->belongsTo(SaleItem::class);
    }
}
