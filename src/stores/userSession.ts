import { defineStore } from 'pinia'
import { useDatabaseStore, UserData } from './database'

export const useUserSessionStore = defineStore('userSession', {
  state: () => ({
    user: null as UserData | null,
    isLoggedIn: false
  }),
  persist: false,
  getters: {

  },
  actions: {
    login (email: string, nextRoute: string) {
      const database = useDatabaseStore()
      const newUser = database.$state.data.find(userData => userData.user.email === email)

      if (newUser) {
        this.user = newUser
        this.isLoggedIn = true

        if (nextRoute === '') {
          nextRoute = '/dashboard'
        }
        this.router.push({ path: nextRoute })
      } else {
        /**
         * TODO errore
         */
        console.log('Login error')
      }
    }
  }
})
