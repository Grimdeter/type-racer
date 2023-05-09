<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { ref } from 'vue'
import { updatePlayerScore, deletePlayerScore } from '@/services/firebase.service'

const props = defineProps(['row', 'indexOfRow'])
const emits = defineEmits(['scoreDeleted'])
const newUsername = ref<string>(props.row.Username)

function handleUpdateUsername() {
  console.log('updating')
  console.log(props.row.docID)
  updatePlayerScore(newUsername.value, props.row.docID).then(() => {
    props.row.Username = newUsername.value
  })
}
function returnOldUsername() {
  newUsername.value = props.row.Username
  console.log(props.row.Username)
}
function handleDeleteScore() {
  console.log('handle delete')
  deletePlayerScore(props.row.docID).then(() => {
    emits('scoreDeleted')
  })
}
</script>
<template>
  <tr class="border-b dark:border-neutral-500">
    <td class="whitespace-nowrap px-6 py-4 font-medium">
      {{ props.indexOfRow + 1 }}
    </td>
    <td class="whitespace-nowrap px-6 py-4 w-[550px]">
      <div class="flex align-middle">
        <input type="text" v-model.trim="newUsername" class="dark:bg-slate-900" />
        <transition
          enter-from-class="translate-x-[-150%] opacity-0"
          enter-active-class="transition duration-200"
          leave-to-class="translate-x-[-150%] opacity-0"
          leave-active-class="transition duration-200"
        >
          <div class="" v-if="props.row.Username !== newUsername && newUsername.length !== 0">
            <button class="ml-5 mr-10" @click="handleUpdateUsername">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </button>
            <button class="" @click="returnOldUsername">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </button>
          </div>
        </transition>
      </div>
    </td>
    <td class="whitespace-nowrap px-6 py-4">{{ props.row.wpm }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ props.row.accuracy }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ props.row.promptWord }}</td>
    <td class="whitespace-nowrap px-6 py-4">
      <button class="text-red-600" @click="handleDeleteScore">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </td>
  </tr>
</template>
