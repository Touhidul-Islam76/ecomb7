<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\CreateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

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
        ], ['User created successfully']);
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

    public function index(){
        $user = User::latest()->get();
        if(!$user){
            return $this->error(['User not found'], 404);
        }else{
            return $this->success($user, ['Users retrieved successfully']);
        }
    }

    public function allRoles(){
        $roles = Role::get();
        if(!$roles){
            return $this->error(['Roles not found'], 404);
        }else{
            return $this->success($roles, ['Roles retrieved successfully']);
        }
    }

    public function update(Request $req, User $user){
        $user->update([
            'name' => $req->name ?? $user->name,
            'email' => $req->email ?? $user->email,
            'password' => $req->password ?? $user->password,
        ]);

        if($req->role){
            $user->syncRoles($req->role);
        }

        return $this->success([
            'user' => $this->formatUser($user)
        ], ['User updated successfully']);
    }

    public function destroy(User $user){
        $user->delete();
        return $this->success(null, ['User deleted successfully']);
    }
}
