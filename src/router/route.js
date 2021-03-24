export default [
  {
    name: "Home",
    path: "/",
    component: () => import("../views/Index.vue"),
  },
  {
    name: "SMSReporter",
    path: "/sms",
    component: () => import("../views/sms/Index.vue"),
  },
  {
    name: "ReportSMS",
    path: "/report",
    component: () => import("../views/sms/Report.vue"),
  },
  {
    name: "LogIn",
    path: "/login",
    component: () => import("../views/auth/LogIn.vue"),
  },
];
