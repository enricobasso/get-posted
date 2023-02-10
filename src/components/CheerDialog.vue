<template>
  <q-dialog
    v-if="userSession.isLoggedIn"
    v-model="cheerDialog"
  >
    <q-card class="my-card">
      <q-img :src="dialogContents[rankingPosition - 1].image" />

      <q-card-section>
        <q-btn
          round
          :color="dialogContents[rankingPosition - 1].color"
          :icon="dialogContents[rankingPosition - 1].icon"
          class="absolute"
          size="20px"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />
        <div class="row no-wrap items-center">
          <div class="col text-h6">
            {{ dialogContents[rankingPosition - 1].title }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="">
          {{ dialogContents[rankingPosition - 1].message }}
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          :color="dialogContents[rankingPosition - 1].color"
          :label="dialogContents[rankingPosition - 1].button"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserSessionStore } from 'src/stores/userSession'

const cheerDialog = ref(false)
const userSession = useUserSessionStore()
const { rankingPosition } = storeToRefs(userSession)

const dialogContents = ref([])
dialogContents.value = [
  {
    title: 'Hail the hero! 👑',
    message: 'We rejoice in tribute to the new regnant of GetPostedland!',
    button: 'Aye!',
    icon: 'emoji_events',
    color: 'yellow-8',
    image: '/images/undraw_playing_cards.png'
  },
  {
    title: 'The ZONE 🧠',
    message: 'You\'re kind of a master right now, there\'s only one left.',
    button: 'To the top!',
    icon: 'center_focus_strong',
    color: 'grey-6',
    image: '/images/undraw_Mindfulness.png'
  },
  {
    title: 'Getting strong 💪',
    message: 'Looks like someone is upping their game. Keep it going!',
    button: 'Repeat!',
    icon: 'arrow_outward',
    color: 'deep-orange-10',
    image: '/images/undraw_Working_out.png'
  }
]

watch(rankingPosition, (newRanking, oldRanking) => {
  if ((newRanking < oldRanking) && ([1, 2, 3].includes(newRanking))) {
    cheerDialog.value = true
  }
})
</script>
