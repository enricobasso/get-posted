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
    getData () {
      this.loading = true
      if (this.data.length === 0) {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => response.json())
          .then((usersData: User[]) => {
            usersData.forEach(user => {
              user.avatar = 'https://api.multiavatar.com/' + user.name + '.png'
              this.data.push({ user, posts: [] })
            })

            fetch('https://jsonplaceholder.typicode.com/posts')
              .then((response) => response.json())
              .then(postsData => {
                postsData.forEach((post: Post) => {
                  /* if (this.data[post.userId - 1].posts === undefined) {
                    this.data[post.userId - 1].posts = []
                  } */
                  this.data[post.userId - 1].posts.push(post)
                })
              })
          })
          .catch(() => {
            /**
              * TODO errors
              */
            console.log('ERRORE')
          })
      }
      this.loading = false
    },
    addNewPost (title: string, body: string) {
      const userSession = useUserSessionStore()
      fetch('https://jsonplaceholder.typicode.com/posts', {
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
        .then((response) => response.json())
        .then((newPost: Post) => {
          // add post to local database
          this.data.find(userData => userData.user.id === userSession.user?.id)?.posts.push(newPost)
          this.data.sort((a, b) => b.posts.length - a.posts.length)
        })
        .catch(error => {
          // TODO
          console.log(error)
        })
    }
  }
})
