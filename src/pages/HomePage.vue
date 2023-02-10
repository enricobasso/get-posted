<template>
  <q-page
    class="row"
    padding
  >
    <div class="col-12 col-md-6 col-grow">
      <ranking-list />
    </div>
    <div
      style="max-width: 600px;"
      class="col-12 col-md-6 q-pa-md "
    >
      <div class="text-h3">
        Log in
      </div>
      <q-form
        class="q-mt-lg"
        @submit="login()"
      >
        <div class="column">
          <q-input
            v-model="email"
            outlined
            label="Email"
            :rules="[
              val => !!val || '* Required',
            ]"
            lazy-rules
          />
          <div class="row justify-end">
            <q-btn
              type="submit"
              color="primary"
              label="Login"
            />
          </div>
        </div>
      </q-form>
      <p>Here some email for you to log in:</p>
      <ol>
        <li
          v-for="(userData, index) in database.data"
          :key="index"
        >
          {{ userData.user.username }}: {{ userData.user.email }}
        </li>
      </ol>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDatabaseStore } from 'src/stores/database'
import { useUserSessionStore } from 'src/stores/userSession'
import { useQuasar } from 'quasar'
import RankingList from 'src/components/RankingList.vue'

const email = ref('')
const database = useDatabaseStore()
const userSession = useUserSessionStore()
const route = useRoute()
const nextRoute = ref(route.query.nextRoute as string | '')
const $q = useQuasar()

database.getData()

function login () {
  const res = userSession.login(email.value, nextRoute.value)
  if (res === -1) {
    $q.notify({ type: 'negative', message: 'Incorrect email.' })
  }
}
</script>
