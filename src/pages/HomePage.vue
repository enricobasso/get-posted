<template>
  <q-form @submit="login">
    <div class="row">
      <q-input
        v-model="email"
        outlined
        label="Email"
        :rules="[
          val => !!val || '* Required',
        ]"
        lazy-rules
      />
      <q-btn
        type="submit"
        color="primary"
        label="Login"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDatabaseStore } from 'src/stores/database'

const router = useRouter()
const email = ref('')
const database = useDatabaseStore()

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then(response => {
    database.$state.data = response
    console.log(response)

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then(response => {
        response.forEach(post => {
          if (database.$state.data[post.userId - 1].posts === undefined) {
            database.$state.data[post.userId - 1].posts = []
          }
          database.$state.data[post.userId - 1].posts.push(post)
        })
      }).catch(() => {
        /**
     * TODO errors
     */
        console.log('ERRORE')
      })
  })
  .catch(() => {
    /**
     * TODO errors
     */
    console.log('ERRORE')
  })

/**
   * TODO types
   */
function login () {
  if (database.$state.data.find(user => user.email === email.value)) {
    router.push({ name: 'DashboardView' })
  }
}
</script>
