export default [
  {
    name: "Home",
    path: "/",
    component: () => import("../views/Reports.vue")
  },
  {
    name: "Reports",
    path: "/reports",
    component: () => import("../views/Reports.vue")
  },
  {
    name: "ReportPost",
    path: "/report",
    component: () => import("../views/Report.vue")
  },
  {
    name: "ReportPostID",
    path: "/report/:id",
    component: () => import("../views/Report.vue")
  },
  {
    name: "ReportOnline",
    path: "/new/reports",
    component: () => import("../views/OnlineReport.vue")
  },
  {
    name: "RegionSuggestion",
    path: "/suggest/regions",
    component: () => import("../views/suggest/Regions.vue")
  }
];
