<template>
  <template v-if="mode === 'full'">
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
  <template v-else>
    <q-card
      v-for="(post, index) in userData.posts.slice(0, 3)"
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
    <div class="row justify-center q-mt-lg">
      <q-btn
        color="primary"
        label="See more"
        flat
        @click="router.push({name: 'ProfileView', params: { id: userData.user.id}})"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { UserData } from 'src/stores/database'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Props {
  userData: UserData,
  mode: string
}

defineProps<Props>()
</script>
