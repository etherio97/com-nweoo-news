export default [
  {
    name: "Home",
    path: "/",
    component: () => import("../views/news/Articles.vue")
  },
  {
    name: "Reports",
    path: "/reports",
    component: () => import("../views/reports/SMSReports.vue")
  },
  {
    name: "ReportPost",
    path: "/report",
    component: () => import("../views/reports/Report.vue")
  },
  {
    name: "ReportPostID",
    path: "/report/:id",
    component: () => import("../views/reports/Report.vue")
  },
  {
    name: "News",
    path: "/news",
    component: () => import("../views/news/Articles.vue")
  },
  {
    name: "VideoNews",
    path: "/news/videos",
    component: () => import("../views/news/Videos.vue")
  },
  {
    name: "Services",
    path: "/services",
    component: () => import("../views/Services.vue")
  },
  {
    name: "SMSNews",
    path: "/sms",
    component: () => import("../views/sms/faq.vue")
  }
];
