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
  {{ users }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const users = ref([])

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then(response => {
    users.value = response
    console.log(response)
  })

/**
   * TODO types
   */
function login () {
  console.log('login')
  if (users.value.find(user => user.email === email.value)) {
    console.log('trovato')
    router.push({ name: 'DashboardView' })
  }
  console.log('fine')
}
</script>
