export default [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    name: "Deaths",
    path: "/deaths",
    component: () => import("@/views/Deaths.vue"),
  },
  {
    name: "Music",
    path: "/music",
    component: () => import("@/views/Music.vue"),
  },
  {
    name: "Feeds",
    path: "/feeds",
    component: () => import("@/views/Feeds.vue"),
  },
  {
    name: "LogIn",
    path: "/login",
    component: () => import("@/views/auth/LogIn.vue"),
  },
];
