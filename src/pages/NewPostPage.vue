<template>
  <div
    class="q-pa-md q-mb-xl"
    style="max-width: 600px;"
  >
    <div class="text-h3">
      New post
    </div>
    <q-form
      ref="newPostForm"
      class="q-mt-lg"
      @submit="savePost"
    >
      <div class="">
        <q-input
          v-model="title"
          outlined
          label="Title"
          :rules="[
            val => !!val || '* Required',
          ]"
          lazy-rules
        />
        <q-input
          v-model="body"
          outlined
          type="textarea"
          label="Text"
          :rules="[
            val => !!val || '* Required',
          ]"
          lazy-rules
        />
        <div class="row justify-end">
          <q-btn
            color="primary"
            label="cancel"
            outline
            class="q-mr-md"
            @click="cancelPost"
          />
          <q-btn
            type="submit"
            color="primary"
            label="Save"
            icon="save"
          />
        </div>
      </div>
    </q-form>
  </div>

  <q-dialog
    v-model="addressDialog"
    persistent
  >
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          icon="warning"
          color="warning"
          text-color="white"
        />
        <span class="q-ml-sm q-mt-md">There are changes that aren't saved yet. Do you still want to exit this page?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          label="NO"
          color="primary"
        />
        <q-btn
          v-close-popup
          flat
          label="YES"
          color="primary"
          @click="router.push({ name: 'DashboardView' })"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <cheer-dialog />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useDatabaseStore } from 'src/stores/database'
import CheerDialog from 'src/components/CheerDialog.vue'

const database = useDatabaseStore()
const router = useRouter()
const title = ref('')
const body = ref('')
const addressDialog = ref(false)
const newPostForm = ref(null)
const $q = useQuasar()

function cancelPost () {
  if (title.value !== '' || body.value !== '') {
    addressDialog.value = true
  } else {
    router.push({ name: 'DashboardView' })
  }
}

function savePost () {
  database.addNewPost(title.value, body.value)
  title.value = ''
  body.value = ''
  newPostForm.value.resetValidation()
  $q.notify({ type: 'positive', message: 'Post saved successfully!' })
}

</script>
