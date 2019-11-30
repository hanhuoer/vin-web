import Vue from "vue";
import Router from "vue-router";
import SiteLayout from '@/siteviews/Layout'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunkName: "login" */ "./views/login/Login.vue")
    },
    {
      path: "/oauth/github/redirect",
      name: "oauthGithubRedirect",
      component: () => import(/* webpackChunkName: "oauth" */ "./views/login/LoginOauthGithub.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/home/Home.vue")
    },
    {
      path: "/writer",
      name: "writer",
      component: () => import(/* webpackChunkName: "writer" */ "./views/writer/Writer.vue")
    },
/*    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/!* webpackChunkName: "about" *!/ "./views/About.vue")
    },*/



    {
      path: '/',
      component: SiteLayout,
      children: [{
        path: '',
        component: () => import(/* webpackChunkName: "vin-index" */ '@/siteviews/index/index'),
      }]
    },

    {
      path: '/page/:page',
      component: SiteLayout,
      children: [{
        path: '',
        component: () => import(/* webpackChunkName: "vin-index" */ '@/siteviews/index/index'),
      }]
    },

    {
      path: '/article/:id',
      component: SiteLayout,
      children: [{
        path: '',
        component: () => import(/* webpackChunkName: "vin-note" */ '@/siteviews/article/index'),
      }]
    },

    {
      path: '/notebook/:notebookName',
      component: SiteLayout,
      children: [{
        path: '',
        component: () => import(/* webpackChunkName: "vin-notebook" */ '@/siteviews/notebook/index'),
      }]
    },

    {
      path: '/archives',
      component: SiteLayout,
      children: [{
        path: '',
        component: () => import(/* webpackChunkName: "vin-archive" */ '@/siteviews/archives/index'),
      }]
    },

    {
      path: '/links',
      component: SiteLayout,
      children: [{
        path: '',
        component: () => import(/* webpackChunkName: "vin-link" */ '@/siteviews/links/index'),
      }]
    },

    {
      path: '/about',
      component: SiteLayout,
      children: [{
        path: '',
        component: () => import(/* webpackChunkName: "vin-about" */ '@/siteviews/about/index'),
      }]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
});
