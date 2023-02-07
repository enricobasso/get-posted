<template>
  <q-page padding>
    <ranking-list />
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
    {{ database.$state?.data[0]?.user?.email }}
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDatabaseStore } from 'src/stores/database'
import { useUserSessionStore } from 'src/stores/userSession'
import RankingList from 'src/components/RankingList.vue'

const email = ref('')
const database = useDatabaseStore()
const userSession = useUserSessionStore()
const route = useRoute()
const nextRoute = ref(route.query.nextRoute as string | '')

database.getData()
</script>
