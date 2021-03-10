export default [
  {
    name: "Dashboard",
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    name: "Deaths",
    path: "/deaths",
    component: () => import("../views/Deaths.vue"),
  },
  {
    name: "Music",
    path: "/music",
    component: () => import("../views/Music.vue"),
  },
];
