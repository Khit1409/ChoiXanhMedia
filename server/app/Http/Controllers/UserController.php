<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{

    //register
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'avatar' => 'required|string',
            'phone' => 'required|string|unique:users,phone',
            'roles' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        try {
            // Tạo user
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'avatar' => $validated['avatar'],
                'phone' => $validated['phone'],
                'roles' => $validated['roles'],
                'password' => Hash::make($validated['password']),
            ]);

            return response()->json([
                'message' => 'Đăng ký thành công',
                'resultCode' => 1,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi server: ' . $e->getMessage(),
                'resultCode' => 0,
            ], 500);
        }
    }

    //login
    public function login(Request $request)
    {
        $request->validate(
            [
                'email' => 'required|string',
                'password' => 'required|string',
            ]
        );

        $user = User::where("email", $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Không tìm thấy tài khoản nào', 'resultCode' => -1], 401);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Mật khẩu không đúng!', 'resultCode' => -1], 401);
        }

        $token = JWTAuth::fromUser($user);

        $cookie = cookie('token', $token, 60 * 24, null, null, true, true, false, 'Strict');
        return response()->json(['message' => 'Login successful', 'resultCode' => 1], 200)->cookie($cookie);
    }

    //check authenticate
    public function me(Request $request)
    {
        try {
            $token = $request->cookie('token');
            if (!$token) {
                return response()->json(['message' => 'Token hết hạng hoặc chưa đăng nhập', 'resultCode' => -1], 401);
            }
            $user = JWTAuth::setToken($token)->authenticate();

            return response()->json(['message' => 'Xác thực thành công!', 'resultCode' => 1, 'users' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
    }


    //logout
    public function logout()
    {
        // Xóa token ở client
        $cookie = cookie()->forget('token');
        return response()->json(['message' => 'Logged out', 'resultCode' => 1], 200)->cookie($cookie);
    }
}
