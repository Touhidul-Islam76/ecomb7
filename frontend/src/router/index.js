import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Auth/Login.vue";
import Profile from "../views/Profile.vue";
import Home from "../views/Home.vue";
import MyAccount from "../views/dashboard/MyAccount.vue";
import { useAuth } from "../stores/auth.js";
import Wishlist from "../views/dashboard/Wishlist.vue";
import Carts from "../views/dashboard/Carts.vue";
import AdminLogin from "../views/Admin/AdminLogin.vue";
import AdminDashboard from "../views/Admin/AdminDashboard.vue";
import Orders from "../views/Admin/Orders.vue";
import Users from "../views/Admin/Users.vue";
import Categories from "../views/Admin/Categories.vue";
import Products from "../views/Admin/Products.vue";
import Settings from "../views/Admin/Settings.vue";

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
  {
    path:"/admin/login",
    component: AdminLogin,
  },{
    path: "/admin/dashboard-acc",
    component: AdminDashboard,
    meta: { requireAuth: true },
  },
  {
    path: "/admin/orders",
    component: Orders,
    meta: { requireAuth: true },
  },
  {
    path:"/admin/users",
    component: Users,
    meta: { requireAuth: true },
  },
  {
    path:"/admin/categories",
    component: Categories,
    meta: { requireAuth: true },
  },
  {
    path:"/admin/products",
    component: Products,
    meta: { requireAuth: true },
  },{
    path:"/admin/settings",
    component: Settings,
    meta: { requireAuth: true },
  }
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
