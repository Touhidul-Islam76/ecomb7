import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Auth/Login.vue";
import Profile from "../views/Profile.vue";
import Home from "../views/Home.vue";
import MyAccount from "../views/dashboard/MyAccount.vue";


// defining the routes where components will be shown
const routes = [
  {
    path: "/",
    component: Home,
  },
    {
    path: "/login",
    component: Login,
  },
  {
    path: "/profile",
    component: Profile,
  },
    {
    path: "/dashboard/my-account",
    component: MyAccount,
  },
];


const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;