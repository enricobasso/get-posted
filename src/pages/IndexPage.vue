<template>
  <q-page class="row items-center justify-evenly">
    {{ leaderboardArray }}
  </q-page>
</template>

<script setup lang="ts">
import { Post, Leaderboard } from 'components/models'
import { ref } from 'vue'

const leaderboardArray = ref<Leaderboard[]>([])

fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then(posts => {
    for (let i = 0; i < posts.length; i++) {
      if (leaderboardArray.value[posts[i].userId] === undefined) {
        leaderboardArray.value[posts[i].userId] = { userId: posts[i].userId, count: 1 }
      } else {
        leaderboardArray.value[posts[i].userId].count++
      }
    }
    console.log(leaderboardArray.value)
  })

</script>
