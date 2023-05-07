<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import sound from '../assets/1.wav'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()

const soundStatus = ref(true)
const soundLevel = ref(userStore.soundLevel)
const soundPlayed = ref(false)

//Function that detects keypresses and does the appropriate things
function highlightKey(e: KeyboardEvent) {
  if (soundStatus.value && soundPlayed.value === false) {
    let audio = new Audio(sound)
    audio.volume = soundLevel.value / 100
    audio.play()
    soundPlayed.value = true
  }
}

//Function that detects when the user lets off a key and does the appropriate things
function removeKeypress(e: KeyboardEvent) {
  soundPlayed.value = false
}

//Whenever the user presses a key down, run the proper function
window.addEventListener('keydown', highlightKey)

//Whenever the user lets a key up, run the proper function
window.addEventListener('keyup', removeKeypress)

function handleSoundStatus() {
  soundStatus.value = !soundStatus.value
}

onMounted(() => {
  if (screen.width < 1024) {
    soundStatus.value = false
  }
})

onUnmounted(() => {
  userStore.soundLevel = soundLevel.value
})
</script>

<template>
  <div class="flex justify-center mb-4 -translate-x-[272px] m-auto">
    <button @click="handleSoundStatus">
      <span v-if="soundStatus">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
      </span>

      <span v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
      </span>
    </button>
    <div class="mx-10 flex flex-col justify-center">
      <input
        type="range"
        class="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
        id="customRange1"
        v-model="soundLevel"
        :disabled="!soundStatus"
      />
    </div>
  </div>
</template>
