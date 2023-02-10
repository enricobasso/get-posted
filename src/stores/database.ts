import { defineStore } from 'pinia'
import { useUserSessionStore } from './userSession'

export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}
export interface User {
  id: number,
  address: {
    city: string,
    geo: { lat: string, lng: string},
    street: string,
    suit: string,
    zipcode: string
  },
  company: {
    bs: string,
    catchPhrase:string,
    name: string
  },
  email: string,
  name: string,
  phone: string,
  username: string,
  website: string,
  avatar: string | null
}

export interface UserData {
 user: User,
 posts: Post[]
}

export const useDatabaseStore = defineStore('database', {
  state: () => ({
    data: [] as UserData[],
    loading: false as boolean
  }),
  getters: {

  },
  actions: {
    async getData () {
      this.loading = true
      if (this.data.length === 0) {
        try {
          let response = await fetch('https://jsonplaceholder.typicode.com/users')
          const usersData: User[] = await response.json()
          usersData.forEach(user => {
            user.avatar = 'https://api.multiavatar.com/' + user.name + '.png'
            this.data.push({ user, posts: [] })
          })

          response = await fetch('https://jsonplaceholder.typicode.com/posts')
          const postsData = await response.json()

          postsData.forEach((post: Post) => {
            this.data[post.userId - 1].posts.push(post)
          })

          this.data.forEach(userData => {
            userData.posts = userData.posts.slice(userData.user.id - 1)
          })
        } catch (error) {
          console.log(error)
        }
      }
      this.loading = false
    },
    async addNewPost (title: string, body: string) {
      const userSession = useUserSessionStore()
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            title,
            body,
            userId: userSession.user?.id
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })

        const newPost: Post = await response.json()
        this.data.find(userData => userData.user.id === userSession.user?.id)?.posts.push(newPost)
        this.data.sort((a, b) => b.posts.length - a.posts.length)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
