export default [
  {
    path: "*",
    meta: {
      public: true
    },
    redirect: {
      path: "/404"
    }
  },
  {
    path: "/404",
    meta: {
      public: true
    },
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/NotFound.vue`)
  },
  {
    path: "/403",
    meta: {
      public: true
    },
    name: "AccessDenied",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Deny.vue`)
  },
  {
    path: "/500",
    meta: {
      public: true
    },
    name: "ServerError",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Error.vue`)
  },
  {
    path: "/login",
    meta: {
      public: true
    },
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Login.vue`)
  },
  {
    path: "/",
    meta: {},
    name: "Root",
    redirect: {
      name: "Login"
    }
  },
  {
    path: "/schedule",
    meta: { breadcrumb: true },
    name: "Schedule",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Schedule.vue`)
  },
  {
    path: "/rwas",
    meta: { breadcrumb: true },
    name: "rwas",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Rwas.vue`)
  }
];
