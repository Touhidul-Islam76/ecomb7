<?php

namespace App\Traits;

use App\Models\User;

trait FormatUserTrait
{
    protected function formatUser(User $user)
    {
        $roles = $user->getRoleNames()->values()->toArray();

        $permissions = $user->getAllPermissions()
            ->pluck('name')
            ->values()
            ->toArray();

        $role = count($roles) > 0 ? $roles[0] : null;

        $permission = count($permissions) > 0
            ? $permissions[0]
            : null;

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $roles,
            'permissions' => $permissions,
            'role' => $role,
            'permission' => $permission,
        ];
    }
}
