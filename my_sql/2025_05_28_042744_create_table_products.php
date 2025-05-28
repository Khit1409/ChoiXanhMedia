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
        // 1. Bảng sản phẩm chính
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_avt', 255);
            $table->float('price', 10, 2);
            $table->float('sale', 10, 2)->default(0);
            $table->timestamps();
        });

        // 2. Bảng thông tin chi tiết sản phẩm
        Schema::create('products_info', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('descriptions', 255);
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
        });

        // 3. Bảng tên thuộc tính (màu sắc, kích thước,...)
        Schema::create('products_attributes', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->timestamps();
        });

        // 4. Bảng giá trị thuộc tính (đỏ, xanh, 42,...)
        Schema::create('attributes_values', function (Blueprint $table) {
            $table->id();
            $table->string('values', 255);
            $table->foreignId('attributes_id')->constrained('products_attributes')->onDelete('cascade');
            $table->timestamps();
        });

        // 5. Bảng ảnh chi tiết sản phẩm
        Schema::create('products_thumbnails', function (Blueprint $table) {
            $table->id();
            $table->string('src', 255);
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop theo thứ tự ngược lại
        Schema::dropIfExists('products_thumbnails');
        Schema::dropIfExists('attributes_values');
        Schema::dropIfExists('products_attributes');
        Schema::dropIfExists('products_info');
        Schema::dropIfExists('products');
    }
};
