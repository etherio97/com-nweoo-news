export default [
  {
    name: "Home",
    path: "/",
    component: () => import("../views/Reports.vue"),
  }, {
    name: "SMSReports",
    path: "/reports",
    component: () => import("../views/Reports.vue"),
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
