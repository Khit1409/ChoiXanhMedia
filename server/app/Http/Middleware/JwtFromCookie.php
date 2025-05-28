<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtFromCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        try {
            $token = $request->cookie('token');
            if (!$token) {
                return response()->json(['message' => 'Token không tồn tại'], 401);
            }

            JWTAuth::setToken($token);

            if (!$user = JWTAuth::authenticate()) {
                return response()->json(['message' => 'Token không hợp lệ hoặc hết hạn'], 401);
            }

            //Có thể gán user vào request nếu cần:
            $request->merge(['user' => $user]);

        } catch (Exception $e) {
            return response()->json(['message' => 'Token không hợp lệ hoặc hết hạn'], 401);
        }

        return $next($request);
    }
}
