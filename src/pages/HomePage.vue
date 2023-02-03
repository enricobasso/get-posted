<template>
  <q-form @submit="userSession.login(email, nextRoute)">
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
import { useRoute } from 'vue-router'
import { useDatabaseStore } from 'src/stores/database'
import { useUserSessionStore } from 'src/stores/userSession'

const email = ref('')
const database = useDatabaseStore()
const userSession = useUserSessionStore()
const route = useRoute()
const nextRoute = ref(route.query.nextRoute as string)

database.getData()
</script>
