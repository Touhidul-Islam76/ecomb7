<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\CreateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function store(CreateRequest $request)
    {
        // Implementation for storing user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);
        if ($request->has('role')) {
            $user->assignRole($request->role);
        }

        return $this->success([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleNames()->first(),
                'password' => $request->password,
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ]
        ]);
    }

    public function me( Request $request ){
        $user = Auth::user();

        if(!$user){
            return $this->error(['User not found'], 404);
        }else{

            return $this->success([
                'user' => $this->formatUser($user)
            ]);
        }


    }

    public function index(){}
}
