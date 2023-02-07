import { RouteRecordRaw } from 'vue-router'
import DashboardPage from 'src/pages/DashboardPage.vue'
import HomeLayout from 'src/layouts/HomeLayout.vue'
import HomePage from 'src/pages/HomePage.vue'
import DashboardLayout from 'src/layouts/DashboardLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: HomeLayout,
    children: [{ path: '', name: 'HomeView', component: HomePage }]
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [{ path: '', name: 'DashboardView', component: DashboardPage }],
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
