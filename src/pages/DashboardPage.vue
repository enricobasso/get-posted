<template>
  <div class="q-pa-md q-mb-lg">
    <div class="text-h3">
      Dashboard
    </div>
    <p class="text-body2 q-mt-lg">
      Welcome back, <span class="text-weight-bold">{{ userSession.user?.username }}</span>!
    </p>
    <p class="text-body2">
      Here is what's happened so far:
    </p>
    <div class="row">
      <q-card
        v-for="(statistic, index) in userSession.userStatistics"
        :key="index"
        class="q-mr-md q-mb-md"
      >
        <q-card-section>
          <div class="text-overline">
            {{ statistic.name }}
          </div>
          <div class="text-h5">
            {{ statistic.value }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <p class="q-mt-md">
      What are you waiting for?
      <q-btn
        :to="{ name: 'NewPostView'}"
        color="primary"
        label="Add new post"
        class="q-ml-md"
      />
    </p>
  </div>
</template>

<script setup lang="ts">
import { useUserSessionStore } from 'src/stores/userSession'

const userSession = useUserSessionStore()
</script>

<style scoped>
.q-card {
  min-width: 6rem;
}
</style>
