<template>
  <div
    class="q-pa-md"
    style="max-width: 600px;"
  >
    <div class="text-h3">
      Leaderboard
    </div>
    <q-list
      v-if="!database.$state.loading"
      bordered
      separator
      class="q-mt-lg"
    >
      <TransitionGroup
        name="fade"
      >
        <q-item
          v-for="(userData, index) in database.data"
          :key="userData"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            {{ index + 1 }}
          </q-item-section>
          <q-item-section avatar>
            <q-avatar>
              <img
                :src="userData.user.avatar"
                alt="avatar"
              >
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ userData.user.username }}</q-item-label>
            <q-item-label caption>
              {{ userData.posts.length }} posts
            </q-item-label>
          </q-item-section>
          <q-item-section
            v-if="index in [0,1,2]"
            side
          >
            <q-icon
              name="workspace_premium"
              :color="getColor(index)"
            />
          </q-item-section>
        </q-item>
      </TransitionGroup>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useDatabaseStore } from 'src/stores/database'

const database = useDatabaseStore()

function getColor (index: number): string {
  if (index === 0) return 'yellow'
  if (index === 1) return 'grey'
  if (index === 2) return 'brown'

  return 'grey'
}
</script>

<style>
/*.container {
  position: relative;
  padding: 0;
}

.item {
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  border: 1px solid #666;
  box-sizing: border-box;
}
*/
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
