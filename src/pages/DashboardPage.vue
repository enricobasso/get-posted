<template>
  <div>
    <p>Welcome back {{ userSession.user?.name }}</p>
    <p>
      {{ database.$state.data.find(userData => userData.user.id === userSession.user?.id)?.posts.length }} posts
    </p>
    <router-link :to="{ name: 'NewPostView'}">
      Write a new Post!
    </router-link>
  </div>
  Position: {{ userSession.rankingPosition }}
</template>

<script setup lang="ts">
import { useUserSessionStore } from 'src/stores/userSession'
import { useDatabaseStore } from 'src/stores/database'
import { RouterLink } from 'vue-router'

const userSession = useUserSessionStore()
const database = useDatabaseStore()
</script>
