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
    name: "ReportOnline",
    path: "/new/reports",
    component: () => import("../views/reports/OnlineReport.vue")
  },
  {
    name: "RegionSuggestion",
    path: "/suggest/regions",
    component: () => import("../views/suggest/Regions.vue")
  },
  {
    name: "News",
    path: "/news",
    component: () => import("../views/news/Articles.vue")
  },
  {
    name: "SendSMS",
    path: "/sms/send",
    component: () => import("../views/sms/send.vue")
  },
  {
    name: "SMSInbox",
    path: "/sms/inbox",
    component: () => import("../views/sms/inbox.vue")
  }
];
