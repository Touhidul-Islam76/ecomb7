<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\CreateRequest;
use App\Models\User;
use Illuminate\Http\Request;

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
                'password' => $user->password,
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ]
        ]);
    }
}
