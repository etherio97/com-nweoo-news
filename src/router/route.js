export default [
  {
    name: "Dashboard",
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
];
