import { RouteRecordRaw } from 'vue-router'

import MainLayout from 'src/layouts/MainLayout.vue'
import IndexPage from 'src/pages/IndexPage.vue'

import HomeLayout from 'src/layouts/HomeLayout.vue'
import HomePage from 'src/pages/HomePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeLayout,
    children: [{ path: '', name: 'HomeView', component: HomePage }]
  },
  {
    path: '/dashboard',
    component: MainLayout,
    children: [{ path: '', name: 'DashboardView', component: IndexPage }],
    meta: { requiresAuth: true }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
