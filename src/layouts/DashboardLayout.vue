<template>
  <q-layout view="hHh lpR lFr">
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Get Posted
        </q-toolbar-title>

        <q-btn
          icon="person"
          flat
          rounded
        >
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

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-page
        class="row"
        padding
      >
        <div class="col-md-8 col-grow">
          <router-view />
        </div>
        <div class="col-md-4">
          <ranking-list />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import RankingList from 'src/components/RankingList.vue'
import { useUserSessionStore } from 'src/stores/userSession'

const userSession = useUserSessionStore()

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
