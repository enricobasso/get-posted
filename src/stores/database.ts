import { defineStore } from 'pinia'

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
  website: string
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
  persist: false,
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

            console.log(this.data[0].user.email)
          })
          .catch(() => {
            /**
              * TODO errors
              */
            console.log('ERRORE')
          })
      }
      this.loading = false
    }
  }
})

/*
            .catch(() => {
              /**
     * TODO errors
     */
/* console.log('ERRORE')
            })
        }) */
