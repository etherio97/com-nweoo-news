export default [
  {
    name: "Home",
    path: "/",
    component: () => import("../views/Index.vue"),
  },
  {
    name: "Report",
    path: "/report",
    component: () => import("../views/Report.vue"),
  },
  {
    name: "ReportID",
    path: "/report/:id",
    component: () => import("../views/Report.vue"),
  },
];
