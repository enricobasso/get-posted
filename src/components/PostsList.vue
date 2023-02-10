<template>
  <q-card
    v-for="(post, index) in userData.posts"
    :key="index"
    flat
    bordered
    class="q-mt-md"
  >
    <q-card-section>
      <div class="text-h6">
        {{ post.title }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ post.body }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { UserData } from 'src/stores/database'

interface Props {
  userData: UserData
}
defineProps<Props>()
</script>
