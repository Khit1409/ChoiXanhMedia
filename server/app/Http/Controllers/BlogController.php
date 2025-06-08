<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
class BlogController extends Controller
{
    //
    public function getBlog(Request $request)
    {
        $id = $request->query('id');
        $blog = match (true) {
            $id == 0 => DB::table('blogsCategories')->get()->map(function ($blogs) {
                    $blogData = DB::table('blogs')->where('parent_id', $blogs->id)->get();
                    $blogs->data = $blogData;
                    return $blogs;
                }),

            default => DB::table('blogsCategories')
                ->where('parent_id', $id)
                ->get()->map(function ($blogs) {
                        $blogData = DB::table('blogs')->where('parent_id', $blogs->id)->get();
                        $blogs->data = $blogData;
                        return $blogs;
                    }),
        };

        return response()->json(['blog' => $blog], 200);

    }
    //create blog

    public function createBlog(Request $request)
    {


        //code...
        $data = $request->input('CreateBlogRequest');

        $pageCategoryId = DB::table('pageCategories')->where('pageType', 'blog')->value('id');

        $blogsCategories = DB::table('blogsCategories')->insertGetId([
            'parent_id' => $data['parentId'] ? $data['parentId'] : $pageCategoryId, // dùng $data thay vì $request
            'name' => $data['category_name'],
            'filter_url' => $data['url'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('blogs')->insert([
            'name' => $data['blog_name'],
            'parent_id' => $blogsCategories,
            'description' => $data['description'],
            'img' => $data['img'],
            'url' => $data['url'],
            'content' => $data['content'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);


        return response()->json(['message' => 'Thành công', 'resultCode' => 1], 200);

    }
    public function getBlogDetail($id)
    {
        $blogs = DB::table('blogs')->where('id', $id)->get();

        return response()->json(['blog' => $blogs], 200);
    }
}