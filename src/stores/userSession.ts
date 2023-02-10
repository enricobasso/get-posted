import { defineStore } from 'pinia'
import { useDatabaseStore, User } from './database'

export const useUserSessionStore = defineStore('userSession', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false
  }),
  getters: {
    rankingPosition (): number {
      const database = useDatabaseStore()
      return database.data.findIndex(userData => userData.user.id === this.user?.id) + 1
    },
    userStatistics () {
      // logging off this.rankingPosition returns 0, we should catch it in another way
      if (this.rankingPosition > 0) {
        const database = useDatabaseStore()
        const statistics = []
        // rank
        statistics.push({ name: 'Rank', value: this.rankingPosition })

        // posts count
        const postsCount = database.data.find(userData => userData.user.id === this.user?.id)?.posts.length
        statistics.push({ name: 'Posts', value: postsCount })

        // distant from predecessor
        let defender = 0
        if (this.rankingPosition > 1) {
          defender = this.rankingPosition - 2
        }
        let distanceDefender = 0
        if (defender > 0) {
          distanceDefender = database.data[defender].posts.length - database.data[this.rankingPosition - 1].posts.length
        }
        defender++
        let posts = distanceDefender !== 1 ? 'posts' : 'post'
        statistics.push({ name: 'Distance to #' + defender, value: distanceDefender + ' ' + posts })

        // distance from successor
        let attacker = this.rankingPosition
        let distanceAttacker = 0

        if (attacker < database.data.length - 1) {
          distanceAttacker = database.data[this.rankingPosition - 1].posts.length - database.data[attacker].posts.length
        }
        attacker++
        posts = distanceAttacker !== 1 ? 'posts' : 'post'
        statistics.push({ name: 'Distance to #' + attacker, value: distanceAttacker + ' ' + posts })

        return statistics
      }

      return []
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
          nextRoute = '/'
        }
        this.router.push({ path: nextRoute })
      } else {
        /**
         * TODO errore
         */
        console.log('Login error')
      }
    },
    logout () {
      this.user = null
      this.isLoggedIn = false
      this.router.push({ name: 'HomeView' })
    }
  }
})
