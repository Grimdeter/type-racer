<script setup lang="ts">
import { useTextStore } from '@/stores/text.store'
import type { leaderboardInstance } from '@/models/models'
import { addToLeaderboard } from '@/services/firebase.service'
import { useUserStore } from '@/stores/user.store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const text_store = useTextStore()
const router = useRouter()
const username = ref('')

const submitScore = () => {
  const wpm = Number(((60 * text_store.text_target.length) / text_store.seconds).toPrecision(2))
  const accuracy = Number(
    (
      100 -
      (text_store.numberOfMistakes / text_store.text_target.join(' ').length) * 100
    ).toPrecision(2)
  )

  let userID = ''
  if (userStore.auth.currentUser?.uid) {
    userID = userStore.auth.currentUser?.uid
  }

  const objectToAdd: leaderboardInstance = {
    Username: 'Anon',
    wpm: wpm,
    accuracy: accuracy,
    promptWord: text_store.promptWord,
    userID: userID
  }
  if (username.value !== '') {
    objectToAdd.Username = username.value
  }

  const usernameLog = userStore.auth.currentUser?.displayName
  if (usernameLog) {
    objectToAdd.Username = usernameLog
  }

  console.log(objectToAdd)
  const submitProm = addToLeaderboard(objectToAdd)
  submitProm.then(() => {
    router.push('/leaderboard')
    text_store.getRandomDefinition()
  })
}
</script>
<template>
  <div>
    <div class="border-2 border-slate-800 rounded p-10">
      <h1>Your results:</h1>
      <hr />
      <div v-if="!userStore.auth.currentUser" class="flex justify-between">
        <h1>Username</h1>
        <input
          type="text"
          name="username"
          id=""
          v-model.trim="username"
          placeholder="Anon"
          class="px-4"
        />
      </div>
      <div class="flex justify-between">
        <h1>Words per minute</h1>
        <h1>
          {{ Number(((60 * text_store.text_target.length) / text_store.seconds).toPrecision(2)) }}
        </h1>
      </div>
      <div class="flex justify-between">
        <h1>Accuracy</h1>
        <h1>
          {{
            (
              100 -
              (text_store.numberOfMistakes / text_store.text_target.join(' ').length) * 100
            ).toFixed()
          }}
          %
        </h1>
      </div>
      <div class="flex justify-between">
        <h1>Prompt word</h1>
        <h1>
          {{ text_store.promptWord }}
        </h1>
      </div>
    </div>
    <button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      @click="submitScore"
    >
      Submit to leaderboard
    </button>
  </div>
</template>
