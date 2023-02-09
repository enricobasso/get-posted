<template>
  <div>
    <q-list
      v-if="!database.$state.loading"
      bordered
      separator
    >
      <TransitionGroup
        name="fade"
      >
        <q-item
          v-for="userData in database.data"
          :key="userData"
          v-ripple
          clickable
        >
          <q-item-section>
            <q-item-label>{{ userData.user.name }}</q-item-label>
            <q-item-label caption>
              {{ userData.posts.length }} posts
            </q-item-label>
          </q-item-section>
        </q-item>
      </TransitionGroup>
    </q-list>
    <button @click="database.shuffle">
      shuffle
    </button>
  </div>
</template>

<script setup lang="ts">
import { useDatabaseStore } from 'src/stores/database'

const database = useDatabaseStore()
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
