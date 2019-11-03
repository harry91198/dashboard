import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
// import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'Ether',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/bitcoin',
          name: 'bitcoin',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Bitcoin.vue')
        },
        {
          path: '/query',
          name: 'query',
          component: () => import(/* webpackChunkName: "demo" */ './views/Query.vue')
        },
        // {
        //   path: '/custom',
        //   name: 'custom',
        //   component: () => import(/* webpackChunkName: "demo" */ './views/Custom.vue')
        // },
        {
          path: '/custom/:id?',
          name: 'custom',
          component: () => import(/* webpackChunkName: "demo" */ './views/Custom.vue')
      },
        {
          path: '/faucet',
          name: 'faucet',
          component: () => import(/* webpackChunkName: "demo" */ './views/Faucet.vue')
        },
        {
          path: '/stats',
          name: 'stats',
          component: () => import(/* webpackChunkName: "demo" */ './views/Stats.vue')
      },
      {
        path: '/staker/:address',
        name: 'staker',
        component: () => import(/* webpackChunkName: "demo" */ './views/Staker.vue')
      }
      ]
    }
  ]
})
