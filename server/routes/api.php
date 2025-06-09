<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------|
|                            API Routes                                    |
|--------------------------------------------------------------------------|
| Các api dùng để tạo tài khoản , đăng nhập đăng xuất                      |
| và tạo cookie lưu các token của các phiên đăng nhập                      |
|--------------------------------------------------------------------------|
*/

//routes login / register / refresh / logout
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::get('check', 'checkAuth');
});


// custom and category page
Route::controller(PageController::class)->group(function () {
    Route::get('get-category-page', 'getCategory');
    Route::get('custom-page', 'getCustom');
    Route::get('custom-home', 'getHomeCustom');
    Route::post('new-page', 'createPage');
    Route::post('custom-home-page', 'updateHomePage');
    Route::put('update-parent-page/{id}', 'updateParentPage');
    Route::post('delete-page', 'deletePage');
    Route::post('delete-child-page', 'deleteChildPage');
    Route::get('get-custom-logo', 'getLogoCustom');
    Route::post('post-custom-logo', 'postLogoCustom');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('product', 'getProduct');
    Route::get('product-detail/{id}', 'getProductDetail');
    Route::post('product/create-product', 'createProduct');
});

Route::controller(BlogController::class)->group(function () {
    Route::get('blog', 'getBlog');
    Route::post('new-blog', 'createBlog');
    Route::get('blog-detail/{id}', 'getBlogDetail');
});