<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Expense;
use App\Models\Payee;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Transaction;

class ReportController extends Controller
{
    public function report()
    {
        $total_product = Product::where('shop_id', auth('user-api')->user()->shop_id)->count();
        $total_sale = Sale::where('shop_id', auth('user-api')->user()->shop_id)->sum('amount');
        $total_expenses = Expense::where('shop_id', auth('user-api')->user()->shop_id)->sum('amount');
        $total_client = Client::where('shop_id', auth('user-api')->user()->shop_id)->count();
        $total_payee = Payee::where('shop_id', auth('user-api')->user()->shop_id)->count();
        return response()->json([
            'success' => true,
            'data' => [
                'total_product' => $total_product,
                'total_sale' => $total_sale,
                'total_expenses' => $total_expenses,
                'total_client' => $total_client,
                'total_payee' => $total_payee,
            ]
        ]);
    }
    public function transaction()
    {
        $transactions = Transaction::with('transactionable')->where('shop_id', auth('user-api')->user()->shop_id)->latest()->take(5)->get();
        return response()->json([
            'success' => true,
            'transactions' => $transactions,
        ]);
    }
}
