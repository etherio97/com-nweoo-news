export default [
  {
    name: "Home",
    path: "/",
    component: () => import("../views/news/Articles.vue"),
  },
  {
    path: "/report",
    redirect: "/reports",
  },
  {
    name: "Reports",
    path: "/reports",
    component: () => import("../views/reports/SMSReports.vue"),
  },
  {
    path: "/report/:id",
    redirect: "/reports/:id",
  },
  {
    name: "CitizenReport",
    path: "/reports/:id",
    component: () => import("../views/reports/Report.vue"),
  },
  {
    name: "NewsArticles",
    path: "/articles",
    component: () => import("../views/news/Articles.vue"),
  },
  {
    name: "NewsMedia",
    path: "/media",
    component: () => import("../views/news/Videos.vue"),
  },
  {
    name: "VideoNews",
    path: "/news/videos",
    redirect: "/media",
  },
  {
    name: "Article",
    path: "/articles/:id",
    component: () => import("../views/news/Article.vue"),
  },
  {
    name: "Services",
    path: "/services",
    component: () => import("../views/Services.vue"),
  },
  {
    name: "AboutUs",
    path: "/about",
    component: () => import("../views/About.vue"),
  },
  {
    name: "TermsAndConditions",
    path: "/terms-of-services",
    component: () => import("../views/TermsOfService.vue"),
  },
  {
    name: "PrivacyPolicy",
    path: "/privacy-policy",
    component: () => import("../views/PrivacyPolicy.vue"),
  },
];
