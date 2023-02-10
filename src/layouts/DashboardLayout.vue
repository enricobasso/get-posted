<template>
  <q-layout
    view="hHh lpR lFr"
  >
    <toolbar-header />

    <q-page-container>
      <q-page
        class="row"
        padding
        style="max-width: 2048px;"
      >
        <div class="col-12 col-md-8 col-grow">
          <router-view />
        </div>
        <div class="col-12 col-md-4">
          <ranking-list />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import ToolbarHeader from 'src/components/ToolbarHeader.vue'
import RankingList from 'src/components/RankingList.vue'

</script>

<style scoped>
.q-toolbar-title {
  cursor: pointer;
}
</style>
