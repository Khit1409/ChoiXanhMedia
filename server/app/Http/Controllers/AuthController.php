<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Cookie;
use DB;
use Exception;
use Hash;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'checkAuth']]);
    }

    //login
    public function login(Request $request)
    {
        /*Request từ body*/
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
        /*Kiểm tra email*/
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Email not found', 'resultCode' => 0], 401);
        }
        /*Kiểm tra mật khẩu*/
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Password missing', 'resultCode' => 0], 401);
        }
        /*Tạo token*/
        $token = JWTAuth::fromUser($user);
        if (!$token) {
            return response()->json(['message' => 'Unauthorized', 'resultCode' => -1], 401);
        }
        /*Lưu token lên cookies*/
        $cookie = Cookie::make(
            'token',
            $token,
            60 * 24,
            '/',
            null,
            true,
            true,
            false,
            'none'
        );
        Cookie::queue($cookie);
        /*response*/
        return response()->json(['message' => "Login successful!", 'resultCode' => 1], 200)->withCookie($cookie);
    }
    //register
    public function register(Request $request)
    {
        /*Check email và số điện thoại */
        $email = $request->email;
        $phone = $request->phone;
        if (User::where('email', $email)->orWhere('phone', $phone)->exists()) {
            return response()->json(['message' => 'Email or phone already exists', 'resultCode' => -1], 401);
        }
        /*Tạo bảng user mới*/
        try {
            User::create([
                'name' => $request->name,
                'email' => $email,
                'avatar' => $request->avatar,
                'phone' => $phone,
                'roles' => $request->roles,
                'gender' => $request->gender,
                'password' => Hash::make($request->password),
            ]);
            return response()->json(['message' => "Đăng ký thành công!", 'resultCode' => 1]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'resultCode' => 0], 500);
        }
    }
    //logout
    public function logout(Request $request)
    {
        Auth::logout();
        Cookie::queue(Cookie::forget('token'));
        return response()->json(['message' => 'Successfully logged out']);
    }
    //
    public function checkAuth()
    {
        $token = Cookie::get('token');
        if (!$token) {
            return response()->json(['message' => 'Token undifine!', 'resultCode' => 0], 401);
        }
        try {
            $user = JWTAuth::setToken($token)->authenticate();
            if (!$user) {
                return response()->json(['message' => 'Check authentication', 'resultCode' => 0], 401);
            }
            // $cactegory = DB::table('user_category')->where('role', $user->roles)->select('id', 'name', 'url')->get();
            return response()->json(['user' => $user, 'resultCode' => 1], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
