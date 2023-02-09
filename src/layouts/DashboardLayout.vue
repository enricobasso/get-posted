<template>
  <q-layout
    view="hHh lpR lFr"
  >
    <toolbar-header />
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
import ToolbarHeader from 'src/components/ToolbarHeader.vue'
import RankingList from 'src/components/RankingList.vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.q-toolbar-title {
  cursor: pointer;
}
</style>
