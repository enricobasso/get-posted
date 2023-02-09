<template>
  <q-page
    class="row"
    padding
  >
    <div class="col-sm-12 col-md-6 col-grow">
      <ranking-list />
    </div>
    <div class="col-sm-12 col-md-6">
      <div
        class="q-pa-md"
      >
        <div class="text-h3">
          Log in
        </div>
        <q-form
          class="q-mt-lg"
          @submit="userSession.login(email, nextRoute)"
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
        {{ database.$state?.data[0]?.user?.email }}
      </div>
    </div>
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
