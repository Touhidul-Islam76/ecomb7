import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Auth/Login.vue";
import Profile from "../views/Profile.vue";
import Home from "../views/Home.vue";
import MyAccount from "../views/dashboard/MyAccount.vue";
import { useAuth } from "../stores/auth.js";
import Wishlist from "../views/dashboard/Wishlist.vue";
import Carts from "../views/dashboard/Carts.vue";

// defining the routes where components will be shown
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/wishlist",
    component: Wishlist,
    // this meta:{ requireAuth:true } is for that page which is secured and accesable only for the logged in users
    meta: { requireAuth: true },
  },
  {
    path: "/carts",
    component: Carts,
    // this meta:{ requireAuth:true } is for that page which is secured and accesable only for the logged in users
    meta: { requireAuth: true },
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/dashboard/my-account",
    component: MyAccount,
    // this meta:{ requireAuth:true } is for that page which is secured and accesable only for the logged in users
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// here we are redirecting the user who is not logged in to the login page and not giving permission to "/dashboard/my-account" page
router.beforeEach((to) => {
  const auth = useAuth();
  if (to.meta.requireAuth && !auth.isAuthenticated) return { name: "login" };
});

export default router;
