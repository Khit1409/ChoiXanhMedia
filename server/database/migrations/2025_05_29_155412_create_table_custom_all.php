<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pageCategories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('pageType');
            $table->integer('level')->default(1);
            $table->string('url');
            $table->timestamps();
        });

        Schema::create('pageCategoryChild', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->constrained('pageCategories')->onDelete('cascade');
            $table->string('pageType');
            $table->integer('level')->default(2);
            $table->string('name');
            $table->string('url');
            $table->timestamps();
        });
        Schema::create('customHomePage', function (Blueprint $table) {
            $table->id();
            $table->boolean('allowShowProduct')->default(true);
            $table->boolean('allowShowBlog')->default(true);
            $table->boolean('allowShowMap')->default(true);
            $table->string('title');
            $table->string('description');
            $table->timestamps();
        });
        Schema::create('homePageKeyWords', function (Blueprint $table) {
            $table->id();
            $table->string('content');
            $table->foreignId('parent_id')->constrained('customHomePage')->onDelete('cascade');
        });
        Schema::create("customSeo", function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("pageName");
            $table->enum("pageType", ['product', 'contact', 'blog']);
            $table->string("filter_params");
            $table->foreignId('page_parent_id')->nullable()->constrained('pageCategories')->onDelete('cascade');
            $table->foreignId('page_child_id')->nullable()->constrained('pageCategoryChild');
            $table->string("description");
            $table->timestamps();
        });

        Schema::create("customSeoKeywords", function (Blueprint $table) {
            $table->id();
            $table->string('content');
            $table->foreignId('parent_id')->constrained('customSeo')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->string('phone')->unique();
            $table->enum('roles', ['user', 'admin'])->default('user');
            $table->enum('gender', ['male', 'female', 'unknown']);
            $table->timestamps();
        });

        Schema::create('productsCategories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('filter_url');
            $table->integer('totalQuantity')->nullable();
            $table->string('filter_keyword')->nullable();
            $table->foreignId('parent_id')->constrained('pageCategoryChild')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('filter_keyword')->nullable();
            $table->float('price');
            $table->float('sale');
            $table->integer('totalQuantity')->nullable();
            $table->integer('bought')->nullable();
            $table->string('description');
            $table->string('img');
            $table->foreignId('parent_id')->constrained('productsCategories')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('productInfo', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('parent_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('productThumbnails', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('src');
            $table->foreignId('parent_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('productInfoValue', function (Blueprint $table) {
            $table->id();
            $table->string('value');
            $table->foreignId('parent_id')->constrained('productInfo')->onDelete('cascade');
            $table->timestamps();
        });

        // trang tin tức
        Schema::create("blogsCategories", function (Blueprint $table) {
            $table->id("id");
            $table->string("name");
            $table->string("filter_url");
            $table->foreignId('parent_id')->constrained('pageCategoryChild')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create("blogs", function (Blueprint $table) {
            $table->id("id");
            $table->foreignId('parent_id')->constrained('blogsCategories')->onDelete('cascade');
            $table->string("name");
            $table->string("description");
            $table->string("content");
            $table->string("url");
            $table->string("img");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productInfoValue');
        Schema::dropIfExists('productThumbnails');
        Schema::dropIfExists('productInfo');
        Schema::dropIfExists('products');
        Schema::dropIfExists('productsCategories');
        Schema::dropIfExists('users');
        Schema::dropIfExists('customSeoKeywords');
        Schema::dropIfExists('customSeo');
        Schema::dropIfExists('pageCategoryChild');
        Schema::dropIfExists('pageCategories');
        Schema::dropIfExists("news");
    }
};
