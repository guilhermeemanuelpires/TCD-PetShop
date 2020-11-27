import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('petshop-token');

        if (token) {
          next();
        } else {
          next('/login');
        }
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/pet',
          name: 'pets',
          component: () => import(/* webpackChunkName: "demo" */ './views/Pet.vue')
        },
        {
          path: '/endereco',
          name: 'Endereço',
          component: () => import(/* webpackChunkName: "demo" */ './views/Endereco.vue')
        },
        {
          path: '/agenda',
          name: 'Agenda',
          component: () => import(/* webpackChunkName: "demo" */ './views/Agenda.vue')
        }
        ,
        {
          path: '/services',
          name: 'Services',
          component: () => import(/* webpackChunkName: "demo" */ './views/Services.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
