<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //get product
    public function getProduct(Request $request)
    {
        $id = $request->query("id");
        try {
            //code...
            if ($id == 0) {
                $product = DB::table('productsCategories')->get()->map(
                    function ($item) {
                        $products = DB::table('products')->where('parent_id', $item->id)->get();
                        $item->data = $products;
                        return $item;
                    }
                );
                return response()->json(['message' => "Thành công", 'product' => $product], 200);
            } else {
                $product = DB::table('productsCategories')->where('parent_id', $request->id)->get()->map(
                    function ($item) {
                        $products = DB::table('products')->where('parent_id', $item->id)->get();
                        $item->data = $products;
                        return $item;
                    }
                );
                return response()->json(['message' => "Thành công", 'product' => $product], 200);
            }
        } catch (\Exception $e) {
            //throw $th;
            return response()->json(['message' => $e->getMessage()], 500);

        }
    }
    public function createProduct(Request $request)
    {
        $request->validate([
            'category_name' => 'string',
            'price' => 'required|integer',
            'description' => 'required|string',
            'category_filter_url' => 'required|string',
            'sale' => 'required|integer',
            'img' => 'required|string',
            'filter_keyword' => 'required|string',
            'parentId' => 'required|integer',

            'thumbnails' => 'required|array',
            'thumbnails.*.name' => 'required|string',
            'thumbnails.*.src' => 'required|string',

            'productInfo' => 'required|array',
            'productInfo.*.name' => 'required|string',
            'productInfo.*.productInfoValue' => 'required|array',
            'productInfo.*.productInfoValue.*.value' => 'required|string',
        ]);


        DB::beginTransaction();
        try {
            // 1. Tạo productCategories
            $productCategories = DB::table('productsCategories')->where('filter_url', $request->category_filter_url)->first();
            $productCategoryId = $productCategories ? $productCategories->id : DB::table('productsCategories')->insertGetId([
                'name' => $request->category_name,
                'filter_keyword' => $request->filter_keyword,
                'parent_id' => $request->parentId,
                'filter_url' => $request->category_filter_url,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            // 2. Tạo products
            $productId = DB::table('products')->insertGetId([
                'name' => $request->productName,
                'price' => $request->price,
                'filter_keyword' => $request->filter_keyword,
                'img' => $request->img,
                'sale' => $request->sale,
                'description' => $request->description,
                'parent_id' => $productCategoryId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // 3. Tạo thumbnails
            foreach ($request->thumbnails as $thumb) {
                DB::table('productThumbnails')->insert([
                    'name' => $thumb['name'],
                    'src' => $thumb['src'],
                    'parent_id' => $productId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // 4. Tạo productInfo & productInfoValue
            foreach ($request->productInfo as $index => $info) {
                $infoId = DB::table('productInfo')->insertGetId([
                    'name' => $info['name'],
                    'parent_id' => $productId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // ánh xạ 1-1 từ productInfo sang productInfoValue
                if (isset($request->productInfo[$index]['productInfoValue'])) {
                    foreach ($info['productInfoValue'] as $valueItem) {
                        DB::table('productInfoValue')->insert([
                            'value' => $valueItem['value'],
                            'parent_id' => $infoId,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }

            DB::commit();
            return response()->json(['message' => "Thêm sản phẩm thành công", 'resultCode' => 1], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }


    //delete
    public function deleteProduct(Request $request)
    {
        $id = $request->query("id");

        DB::table("products")->where("id", $id)->delete();
        return response()->json(["message" => "Delete Successfull", 'resultCode' => 1], 200);
    }
    //update sản phẩm
    public function updateProduct(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',

            'price' => 'nullable|integer',
            'name' => 'nullable|string',
            'filter_keyword' => 'nullable|string',
            'description' => 'nullable|string',
            'sale' => 'nullable|integer',
            'img' => 'nullable|string',

            'thumbnails' => 'nullable|array',
            'thumbnails.*.name' => 'required_with:thumbnails|string',
            'thumbnails.*.src' => 'required_with:thumbnails|string',

            'productInfo' => 'nullable|array',
            'productInfo.*.name' => 'required_with:productInfo|string',
            'productInfo.*.productInfoValue' => 'required_with:productInfo|array',
            'productInfo.*.productInfoValue.*.value' => 'required_with:productInfo|string',
        ]);

        DB::beginTransaction();

        try {
            // 1. Cập nhật sản phẩm chính nếu field tồn tại
            $updateData = [];
            $fields = ['name', 'price', 'filter_keyword', 'img', 'sale', 'description'];

            foreach ($fields as $field) {
                if ($request->filled($field)) {
                    $updateData[$field] = $request->$field;
                }
            }

            if (!empty($updateData)) {
                $updateData['updated_at'] = now();
                DB::table('products')->where('id', $request->id)->update($updateData);
            }

            // 2. Nếu có thumbnails thì xóa cũ và thêm mới
            if ($request->has('thumbnails')) {
                DB::table('productThumbnails')->where('parent_id', $request->id)->delete();

                $thumbnails = [];
                foreach ($request->thumbnails as $thumb) {
                    $thumbnails[] = [
                        'parent_id' => $request->id,
                        'name' => $thumb['name'],
                        'src' => $thumb['src'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                DB::table('productThumbnails')->insert($thumbnails);
            }

            // 3. Nếu có productInfo thì xóa cũ và thêm mới
            if ($request->has('productInfo')) {
                $oldInfoIds = DB::table('productInfo')->where('parent_id', $request->id)->pluck('id')->toArray();
                DB::table('productInfoValue')->whereIn('parent_id', $oldInfoIds)->delete();
                DB::table('productInfo')->where('parent_id', $request->id)->delete();

                foreach ($request->productInfo as $info) {
                    $infoId = DB::table('productInfo')->insertGetId([
                        'parent_id' => $request->id,
                        'name' => $info['name'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    $infoValues = [];
                    foreach ($info['productInfoValue'] as $valueItem) {
                        $infoValues[] = [
                            'parent_id' => $infoId,
                            'value' => $valueItem['value'],
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }

                    DB::table('productInfoValue')->insert($infoValues);
                }
            }

            DB::commit();
            return response()->json(['message' => "Cập nhật sản phẩm thành công", 'resultCode' => 1], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    // get product detail

    public function getProductDetail($id)
    {
        $product = DB::table('products')->where('id', $id)->get()->map(
            function ($pro) {
                $productInfo = DB::table('productInfo')->where('parent_id', $pro->id)->get()->map(
                    function ($info) {
                        $productInfoValue = DB::table('productInfoValue')->where('parent_id', $info->id)->get();
                        $info->value = $productInfoValue;
                        return $info;
                    }
                );
                $productThumbnail = DB::table('productThumbnails')->where('parent_id', $pro->id)->get();

                $pro->info = $productInfo;
                $pro->thumbnails = $productThumbnail;
                return $pro;
            }
        );

        return response()->json(['message' => 'Thành công', 'product' => $product], 200);
    }
}
