<template>
  <div class="q-pa-md">
    <div class="text-h3">
      Dashboard
    </div>
    <p class="text-subtitle1 q-mt-md">
      Welcome back, <span class="text-h6">{{ userSession.user?.name }}</span>!
    </p>
    <p>Here it is what's happened so far:</p>
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
