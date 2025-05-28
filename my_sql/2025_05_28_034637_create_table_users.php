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
        // bảng tài khoản
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('avatar', 255);
            $table->string('email', 255)->unique();
            $table->string('phone', 11);
            $table->dateTime('birthday', 6)->nullable();
            $table->string('hashed_password', 255);
            $table->enum('roles', ['user', 'seller']);
            $table->timestamps();
        });
        // bảng danh mục người dùng tùy vào role
        Schema::create('user_categorys', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url');
            $table->timestamps();
        });
        Schema::create('seller_categorys', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('user_categorys');
        Schema::dropIfExists('seller_categorys');
    }
};
