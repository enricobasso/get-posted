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
          :class="(userSession.isLoggedIn && index === (userSession.rankingPosition -1)) ? 'bg-blue-grey-1': ''"
        >
          <q-item-section
            class="q-ml-md"
            avatar
          >
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
            class="q-mr-md"
          >
            <q-icon
              name="workspace_premium"
              :color="getColor(index)"
              size="36px"
            />
          </q-item-section>
        </q-item>
      </TransitionGroup>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useDatabaseStore } from 'src/stores/database'
import { useUserSessionStore } from 'src/stores/userSession'

const database = useDatabaseStore()
const userSession = useUserSessionStore()

function getColor (index: number): string {
  if (index === 0) return 'yellow-8'
  if (index === 1) return 'grey-6'
  if (index === 2) return 'deep-orange-10'

  return 'grey'
}
</script>

<style>
.current-user {
  background-color: black;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
