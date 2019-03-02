import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/home",
      name: "home",
      component: require("@/views/home").default,
      meta: {
        homeName: "home"
      }
    },
    {
      path: "/shici",
      name: "shici",
      component: require("@/views/shici").default,
      meta: {
        homeName: "home"
      }
    },
    {
      path: "/quntuan",
      name: "quntuan",
      component: require("@/views/quntuan").default,
      meta: {
        homeName: "home"
      }
    },
    {
      path: "/baodao",
      name: "baodao",
      component: require("@/views/baodao").default,
      meta: {
        homeName: "home"
      }
    },
    {
      path: "/caidan",
      name: "caidan",
      component: require("@/views/caidan").default,
      meta: {
        homeName: "home"
      }
    },
    {
      path: "/zhibu",
      name: "zhibu",
      component: require("@/views/zhibu").default,
      meta: {
        homeName: "home"
      }
    },
    {
      path: "/dangfeng",
      name: "dangfeng",
      component: require("@/views/dangfeng").default,
      meta: {
        homeName: "home"
      }
    },
    {
      path: "/dangri",
      name: "dangri",
      component: require("@/views/dangri").default,
      meta: {
        homeName: "home"
      }
    },
    {
      path: "/fengcai",
      name: "fengcai",
      component: require("@/views/fengcai").default,
      meta: {
        homeName: "home"
      }
    },
    {
      path: "/",
      name: "/",
      component: require("@/views/home").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});