import { route } from 'quasar/wrappers'
import { useUserSessionStore } from 'src/stores/userSession'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { Notify } from 'quasar'

import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const userSession = useUserSessionStore()
    if (to.matched.some(record => record.meta.requiresAuth) && !userSession.isLoggedIn) {
      Notify.create({ type: 'negative', message: 'You need to be logged in in order to visit this page.' })
      next({ name: 'HomeView', query: { nextRoute: to.fullPath } })
    } else {
      next()
    }
  })

  return Router
})
