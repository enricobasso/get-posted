<template>
  <div
    class="q-pb-md"
    style="max-width: 350px"
  >
    <q-list
      v-if="!database.$state.loading"
      bordered
      separator
    >
      <q-item
        v-for="(userData, index) in database.$state.data"
        :key="index"
        v-ripple
        clickable
      >
        <q-item-section>
          <q-item-label>{{ userData.user.name }}</q-item-label>
          <q-item-label caption>
            {{ userData.posts.length }} posts
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- TODO spinner style -->
    <q-spinner
      v-else
      color="primary"
      size="3em"
    />
  </div>
</template>

<script setup lang="ts">
import { useDatabaseStore } from 'src/stores/database'

const database = useDatabaseStore()
</script>
