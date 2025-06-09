<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;

class PageController extends Controller
{

    public function getLogoCustom()
    {
        $logo = DB::table("customLogo")->get();

        return response()->json(['logo' => $logo], 200);
    }
    public function postLogoCustom(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string',
            'src' => 'nullable|string',
            'width' => 'nullable|string',
            'height' => 'nullable|string',
            'padding' => 'nullable|string',
            'margin' => 'nullable|string',
            'border_radius' => 'nullable|string',
        ]);

        $updateData = [];
        $fields = ['name', 'src', 'width', 'height', 'padding', 'margin', 'border_radius'];

        foreach ($fields as $field) {
            if ($request->has($field)) {
                $updateData[$field] = $request->$field;
            }
        }

        if (!empty($updateData)) {
            $updateData['updated_at'] = now();
            DB::table('customLogo')->update($updateData);
        }

        return response()->json(['resultCode' => 1], 200);
    }

    public function getCustom(Request $request)
    {
        $id = $request->query("id");
        $type = $request->query("type");
        try {
            //code...
            if ($type == "parent") {
                $seo = DB::table("customSeo")->where("page_parent_id", $id)->get()->map(function ($s) {
                    $keyword = DB::table("customSeoKeywords")->where("parent_id", $s->id)->get();
                    $s->meta_keyword = $keyword;
                    return $s;
                });
                return response()->json(['seo' => $seo], 200);
            } else if ($type == "child") {
                $seo = DB::table("customSeo")->where("page_child_id", $id)->get()->map(function ($s) {
                    $keyword = DB::table("customSeoKeywords")->where("parent_id", $s->id)->get();
                    $s->meta_keyword = $keyword;
                    return $s;
                });
                return response()->json(['seo' => $seo], 200);
            } else {
                throw new \Exception('Không tìm thấy type');
            }
        } catch (\Exception $e) {
            //throw $th;
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function getHomeCustom()
    {
        try {
            $seo = DB::table('customHomePage')
                ->orderByDesc('id')
                ->limit(1)
                ->get()
                ->map(function ($s) {
                    $s->meta_keyword = DB::table('homePageKeywords')
                        ->where('parent_id', $s->id)
                        ->get();
                    return $s;
                });

            return response()->json(['custom' => $seo], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }


    // category laays danh muc cho navabr
    public function getCategory()
    {
        $categories = DB::table('pageCategories')->get()->map(function ($category) {
            // lấy danh mục con
            $child = DB::table('pageCategoryChild')->where('parent_id', $category->id)->get();
            $category->child = $child;
            // $category->seo = $seos;
            return $category;
        });
        return response()->json(['custom' => $categories], 200);
    }
    public function updateHomePage(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'allowShowProduct' => 'nullable|boolean',
            'allowShowMap' => 'nullable|boolean',
            'allowShowBlog' => 'nullable|boolean',
            'keyword' => 'nullable|array',
            'keyword.*' => 'required_with:keyword|string',
        ]);

        DB::beginTransaction();

        try {
            // Lấy dòng hiện tại trong bảng customHomePage
            $custom = DB::table('customHomePage')->first();

            // Nếu chưa có, tạo mới với các field có trong request
            if (!$custom) {
                $insertData = [
                    'title' => $request->title ?? '',
                    'description' => $request->description ?? '',
                    'allowShowProduct' => $request->allowShowProduct ?? false,
                    'allowShowBlog' => $request->allowShowBlog ?? false,
                    'allowShowMap' => $request->allowShowMap ?? false,
                    'created_at' => now(),
                    'updated_at' => now()
                ];

                $customId = DB::table('customHomePage')->insertGetId($insertData);
            } else {
                $customId = $custom->id;

                $updateData = [];
                $fields = ['title', 'description', 'allowShowProduct', 'allowShowBlog', 'allowShowMap'];
                foreach ($fields as $field) {
                    if ($request->has($field)) {
                        $updateData[$field] = $request->$field;
                    }
                }

                if (!empty($updateData)) {
                    $updateData['updated_at'] = now();
                    DB::table('customHomePage')->where('id', $customId)->update($updateData);
                }
            }

            // Nếu có keywords mới, thì xóa cũ và thêm mới
            if ($request->has('keyword')) {
                DB::table('homePageKeywords')->where('parent_id', $customId)->delete();

                foreach ($request->keyword as $key) {
                    DB::table('homePageKeywords')->insert([
                        'parent_id' => $customId,
                        'content' => $key,
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                }
            }

            DB::commit();
            return response()->json(['message' => 'Cập nhật trang chủ thành công'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    public function createPage(Request $request)
    {
        $request->validate([
            'pageName' => 'required|string',
            'title' => 'required|string',
            'pageType' => 'required|string',
            'description' => 'required|string',
            'page_url' => 'required|string',
            'page_parent_id' => 'nullable|integer',
            'meta_keyword' => 'required|array',
            'meta_keyword.*' => 'required|string'
        ]);

        try {
            if ($request->page_parent_id != null) {
                // Danh mục con
                $page = DB::table('pageCategoryChild')->insertGetId([
                    'parent_id' => $request->page_parent_id,
                    'pageType' => $request->pageType,
                    'level' => 2,
                    'name' => $request->pageName,
                    'url' => $request->page_url,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                $customSeo = DB::table('customSeo')->insertGetId([
                    'title' => $request->title,
                    'page_child_id' => $page,
                    'description' => $request->description,
                    'pageName' => $request->pageName,
                    'pageType' => $request->pageType,
                    'filter_params' => $request->page_url,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

            } else {
                // Danh mục chính
                $page = DB::table('pageCategories')->insertGetId([
                    'level' => 1,
                    'name' => $request->pageName,
                    'pageType' => $request->pageType,
                    'url' => $request->page_url,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                $customSeo = DB::table('customSeo')->insertGetId([
                    'title' => $request->title,
                    'description' => $request->description,
                    'pageName' => $request->pageName,
                    'page_parent_id' => $page,
                    'pageType' => $request->pageType,
                    'filter_params' => $request->page_url,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }

            // Insert meta keywords
            foreach ($request->meta_keyword as $keyword) {
                DB::table('customSeoKeywords')->insert([
                    'parent_id' => $customSeo,
                    'content' => $keyword,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            return response()->json(['message' => 'Tạo trang thành công', 'resultCode' => 1], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Lỗi khi tạo trang',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    //update trang cha

    public function updateParentPage(Request $request, $id)
    {
        DB::table('pageCategories')->where('id', $id)->update([
            'name' => $request->pageName,
            'url' => $request->url,
            'level' => 1,
            'updated_at' => now(),
        ]);
        DB::table('customSeo')->where('pageName', $request->oldPageName)->update([
            'title' => $request->title,
            'description' => $request->description,
            'pageName' => $request->pageName,
            'pageType' => $request->pageType,
            'filter_params' => $request->url,
            'updated_at' => now(),
        ]);
        // Tìm lại id SEO để cập nhật keyword
        $seo = DB::table('customSeo')->where('pageName', $request->oldPageName)->value('id');
        foreach ($request->content as $keyword) {
            DB::table('customSeoKeywords')->where('parent_id', $seo)->update([
                'content' => $keyword,
                'updated_at' => now(),
            ]);
        }

        return response()->json(['message' => 'Cập nhật thành công', 'resultCode' => 1]);
    }
    //remote page
    public function deletePage(Request $request)
    {
        DB::table('pageCategories')->where('id', $request->query('id'))->delete();
        return response()->json(['message' => 'Thành công', 'resultCode' => 1]);
    }
    public function deleteChildPage(Request $request)
    {
        DB::table('pageCategoryChild')->where('id', $request->query('id'))->delete();
        return response()->json(['message' => 'Thành công', 'resultCode' => 1]);
    }
}
