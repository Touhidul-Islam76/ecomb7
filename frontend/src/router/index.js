import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Auth/Login.vue";
import Profile from "../views/Profile.vue";



// defining the routes where components will be shown
const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/profile",
    component: Profile,
  },
];


const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;