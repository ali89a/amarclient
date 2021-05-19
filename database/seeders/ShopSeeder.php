<?php

namespace Database\Seeders;

use App\Models\Shop;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Shop::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('shops')->delete();

        $shops = array(
            array('id' => 1, 'name' => 'EGallery'),
            array('id' => 2,'name' => 'EShop'),
        );

        DB::table('shops')->insert($shops);
    }

}
