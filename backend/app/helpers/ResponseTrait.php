<?php

namespace App\helpers;

use Illuminate\Http\JsonResponse;

trait ResponseTrait
{
    public function success($data = null, $msg = [], $code = 200):JsonResponse{
        return response()->json([
            'data' => $data,
            'massage' => $msg,
            'code' => $code
        ]);
    }
    public function error($msg = [], $code = 422):JsonResponse{
        return response()->json([
            'data' => null,
            'massage' => $msg,
            'code' => $code
        ]);
    }
}
