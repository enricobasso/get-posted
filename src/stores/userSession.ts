import { defineStore } from 'pinia'
import { useDatabaseStore, User } from './database'

export const useUserSessionStore = defineStore('userSession', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false
  }),
  persist: false,
  getters: {
    rankingPosition (): number {
      const database = useDatabaseStore()
      return database.data.findIndex(userData => userData.user.id === this.user?.id) + 1
    }
  },
  actions: {
    login (email: string, nextRoute: string) {
      const database = useDatabaseStore()
      const newUser = database.$state.data.find(userData => userData.user.email === email)

      if (newUser) {
        this.user = newUser.user
        this.isLoggedIn = true

        if (!nextRoute) {
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
