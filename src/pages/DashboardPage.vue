<template>
  <q-page
    class="row justify-evenly"
    padding
  >
    <div>
      <p>Welcome back {{ userSession.$state.user?.name }}</p>
      <p>
        {{ database.$state.data.find(userData => userData.user.id === userSession.$state.user?.id)?.posts.length }} posts
      </p>
      Write a new post!
    </div>
    <ranking-list />
  </q-page>
</template>

<script setup lang="ts">
import { useUserSessionStore } from 'src/stores/userSession'
import { useDatabaseStore } from 'src/stores/database'
import RankingList from 'src/components/RankingList.vue'

const userSession = useUserSessionStore()
const database = useDatabaseStore()
</script>
