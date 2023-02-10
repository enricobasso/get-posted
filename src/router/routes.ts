import { RouteRecordRaw } from 'vue-router'
import DashboardPage from 'src/pages/DashboardPage.vue'
import HomeLayout from 'src/layouts/HomeLayout.vue'
import HomePage from 'src/pages/HomePage.vue'
import DashboardLayout from 'src/layouts/DashboardLayout.vue'
import NewPostPage from 'src/pages/NewPostPage.vue'
import ProfilePage from 'src/pages/ProfilePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      { path: '', name: 'HomeView', component: HomePage },
      {
        path: '/user/:id',
        component: ProfilePage,
        name: 'ProfileView',
        meta: { requiresAuth: true }
      }]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { path: '', name: 'DashboardView', component: DashboardPage },
      { path: '/new-post', name: 'NewPostView', component: NewPostPage }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
