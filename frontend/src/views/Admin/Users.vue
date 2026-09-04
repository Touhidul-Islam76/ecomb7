<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Users List</h3>
        <button @click="showForm" type="button" class="btn btn-secondary">{{ editId ? 'Edit' : 'Create' }} User</button>
    </div>

    <form v-if="isFormVisible" @submit.prevent="submitForm">
        <div class="mb-2">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input type="text" placeholder="Enter name" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" v-model="form.name">

        </div>
        <div class="mb-2">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" placeholder="Enter email" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" v-model="form.email">

        </div>
        <div class="mb-2">
            <label for="exampleInputEmail1" class="form-label">role</label>


            <select class="form-select" aria-label="Default select example" v-model="form.role">
                <option value="" v-if="!editId" disabled selected>Select Role</option>
                <option v-for="role in userRoles" :key="role.id" :value="role.name">{{ role.name }}</option>
            </select>

        </div>
        <div class="mb-2">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" placeholder="Enter password" class="form-control" id="exampleInputPassword1"
                v-model="form.password">
        </div>

        <div class="mb-3 d-flex justify-content-end align-items-center gap-2">
            <button type="submit" class="btn btn-primary">{{ editId ? 'Update' : 'Create' }} User</button>
            <button type="button" class="btn btn-danger" @click="closeForm">Close form</button>
        </div>

    </form>

    <div class="card mb-4" id="users-list">
        <div class="card-body " max-height="400px" style="max-height: 350px; overflow-y: auto;">
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>SI</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th class="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="users.length > 0" v-for="(user, index) in users" :key="user.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.name || 'N/A' }}</td>
                            <td>{{ user.email }}</td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-primary me-2" @click="editUser(user)">Edit</button>

                                <!-- if method added so that the current user cannot delete their own account -->
                                <button class="btn btn-sm btn-danger" v-if="auth.user.id !== user.id" @click="deleteUser(user)">Delete</button>
                            </td>
                        </tr>

                        <tr v-else>
                            <td colspan="4" class="text-center">No users found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import Toastify from 'toastify-js';
import { onMounted, ref } from 'vue';
import http from '../../library/http';
import { useAuth } from '../../stores/auth';

const users = ref([]);
const auth = useAuth();
const userRoles = ref([]);
const editId = ref('');
const isFormVisible = ref(false);
const form = ref({
    name: '',
    email: '',
    role: '',
    password: ''
});

// to visible the form
const showForm = () => {
    isFormVisible.value = true;
}

// to close the form and reset the form data
const closeForm = () => {
    editId.value = '';
    isFormVisible.value = false;
    form.value = {
        name: '',
        email: '',
        role: '',
        password: ''
    }
}

// edit the user data
const editUser = (user) => {
    isFormVisible.value = true;
    editId.value = user.id;
    form.value = {
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password
    }
}

const submitForm = async () => {
    if (editId.value) {
        const newUser = {
            name: form.value.name,
            email: form.value.email,
            role: form.value.role,
            password: form.value.password
        }

        try {
            const updateUser = await http.put(`/users/${editId.value}`, newUser);

            if (updateUser) {
                Toastify({
                    text: updateUser.data.massage[0] || 'User update successful',
                    duration: 3000
                }).showToast();

                // reset the form
                form.value = {
                    name: '',
                    email: '',
                    role: '',
                    password: ''
                }
                // close the form
                isFormVisible.value = false;
                editId.value = '';
                // console.log('updated user:-', updateUser.data);

                // const response = await http.get('/users');
                // users.value = response.data.data;
                const updatedUser = updateUser?.data?.data?.user ?? null;

                if (updatedUser) {
                    const index = users.value.findIndex(user => user.id === updatedUser.id);
                    if (index !== -1) {
                        users.value[index] = updatedUser;
                    }
                }
            }


        } catch (err) {

        }
    } else {
        try {

            const newUser = {
                name: form.value.name,
                email: form.value.email,
                role: form.value.role,
                password: form.value.password
            }

            const createUser = await http.post('/users', {
                name: form.value.name,
                email: form.value.email,
                role: form.value.role,
                password: form.value.password
            });
            if (createUser) {
                Toastify({
                    text: createUser.data.massage[0] || 'User create successful',
                    duration: 3000
                }).showToast();

                // reset the form
                form.value = {
                    name: '',
                    email: '',
                    role: '',
                    password: ''
                }
                // close the form
                isFormVisible.value = false;
                console.log('new user:-', createUser.data);

                // users.value.push(createUser.data.data.user);

                const response = await http.get('/users');
                users.value = response.data.data;




            }
        } catch (error) {
            Toastify({
                text: 'Failed to create user',
                duration: 3000
            }).showToast();
        }

    }
}


const deleteUser = async (user) => {
    try {
        if (!confirm("Are you sure you want to delete this use?")) {
            return;
        } else {
            const response = await http.delete(`/users/${user.id}`);
            if (response) {
                Toastify({
                    text: response.data.massage[0] || 'User delete successful',
                    duration: 3000
                }).showToast();

                // remove the user from the users array
                users.value = users.value.filter(u => u.id !== user.id);
            }
        }

    } catch (error) {
        Toastify({
            text: error.response.data.message || 'Failed to delete user',
            duration: 3000
        }).showToast();
    }
}

onMounted(async () => {
    try {
        const response = await http.get('/users');
        const allRoles = await http.get('/roles');
        // console.log('user data:- ', response.data.data);
        // console.log('user roles:- ', allRoles.data.data);
        userRoles.value = allRoles.data.data;
        users.value = response.data.data;
    } catch (error) {
        Toastify({

            text: error.response.data.message || 'Failed to fetch users',

            duration: 3000

        }).showToast();
    }
});
</script>

<style scoped></style>