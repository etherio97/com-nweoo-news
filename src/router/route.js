export default [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    name: "FallenStars",
    path: "/fallen-stars",
    component: () => import("@/views/Deaths.vue"),
  },
  {
    name: "CDMs",
    path: "/cdms",
    component: () => import("@/views/cdms/index.vue"),
  },
  {
    name: "LogIn",
    path: "/login",
    component: () => import("@/views/auth/LogIn.vue"),
  },
];
