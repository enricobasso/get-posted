<template>
  <q-page
    class="column q-pa-md"
    padding
  >
    <div class="row">
      <q-btn
        flat
        icon="arrow_left"
        color="primary"
        @click="router.push({name: 'DashboardView'})"
      >
        Dashboard
      </q-btn>
    </div>
    <div
      class="row justify-center"
    >
      <div class="q-mt-lg column items-center">
        <q-avatar
          size="100px"
          class="q-mb-lg"
        >
          <img
            :src="userData.user.avatar"
            alt="avatar"
          >
        </q-avatar>
        <div class="text-h4">
          {{ userData?.user.username }}
        </div>
        <div
          class="row q-mt-md card-details"
        >
          <div>Email:</div>
          <div>{{ userData?.user.email }}</div>
        </div>
        <div
          class="row card-details"
        >
          <div>Website:</div>
          <div>{{ userData?.user.website }}</div>
        </div>
        <div
          class="q-mt-lg q-mb-md"
          style="max-width: 600px;"
        >
          <div class="text-h4">
            Posts
          </div>
          <posts-list
            :user-data="userData"
            mode="full"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useDatabaseStore } from 'src/stores/database'
import PostsList from 'src/components/PostsList.vue'

const route = useRoute()
const router = useRouter()
const database = useDatabaseStore()
const userData = database.data.find(userData => userData.user.id === Number(route.params.id))

</script>

<style scoped>
.card-details {
  width: 300px;justify-content: space-between;
}
</style>
