<template>
  <q-header
    elevated
    class="bg-primary text-white q-px-md"
    style="max-width: 2048px;"
  >
    <q-toolbar>
      <q-toolbar-title>
        <div
          style="cursor: pointer;"
          @click="routeHome"
        >
          <q-avatar
            icon="newspaper"
            size="60px"
          />
          GetPosted
        </div>
      </q-toolbar-title>
      <a style="color: white;font-style: none;" href="https://github.com/enricobasso/get-posted" class="q-mr-md" target="_blank" rel="noopener noreferrer">GitHub</a>
      <q-btn
        v-if="userSession.isLoggedIn"
        round
        flat
      >
        <q-avatar>
          <img
            :src="userSession.user?.avatar"
            alt="avatar"
          >
        </q-avatar>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item
              v-close-popup
              clickable
              @click="userSession.logout"
            >
              <q-item-section avatar>
                <q-icon
                  color="primary"
                  name="logout"
                />
              </q-item-section>
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useUserSessionStore } from 'src/stores/userSession'
import { useRouter } from 'vue-router'

const userSession = useUserSessionStore()
const router = useRouter()

function routeHome () {
  if (userSession.isLoggedIn) {
    router.push({ name: 'DashboardView' })
  } else {
    router.push({ name: 'HomeView' })
  }
}
</script>
