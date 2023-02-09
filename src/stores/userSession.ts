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
    },
    userStatistics () {
      const database = useDatabaseStore()
      const statistics = []
      statistics.push({ name: 'Rank', value: this.rankingPosition })
      const postsNumber = database.data.find(userData => userData.user.id === this.user?.id)?.posts.length
      statistics.push({ name: 'Posts', value: postsNumber })

      let defender = this.rankingPosition - 2
      let distanceDefender = 0
      if (defender > 0) {
        distanceDefender = database.data[defender].posts.length - database.data[this.rankingPosition - 1].posts.length
      }
      defender += 2
      statistics.push({ name: 'Distance to #' + defender, value: distanceDefender + ' posts' })

      let attacker = this.rankingPosition
      let distanceAttacker = 0

      if (attacker < database.data.length - 1) {
        distanceAttacker = database.data[this.rankingPosition - 1].posts.length - database.data[attacker].posts.length
      }
      attacker++
      statistics.push({ name: 'Distance to #' + attacker, value: distanceAttacker + ' posts' })

      return statistics
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
