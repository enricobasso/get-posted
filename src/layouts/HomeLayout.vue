<template>
  <q-layout view="hHh lpR fFf">
    <toolbar-header />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ToolbarHeader from 'src/components/ToolbarHeader.vue'
</script>
