<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTextStore } from '@/stores/text.store'
import { storeToRefs } from 'pinia'

const counterStarted = ref(false)
const secondsInterval = ref(0)
const text_store = useTextStore()

const { currWord } = storeToRefs(text_store)

const changeBorderInput = computed(() => {
  if (text_store.deliverMistake) {
    return 'peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
  }
  return 'peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
})

const changeBorderLabel = computed(() => {
  if (text_store.deliverMistake) {
    return "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
  }
  return "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
})

const blockInput = computed(() => {
  if (text_store.deliverMistake) {
    return 0
  } else {
    return 100
  }
})

const startCounter = () => {
  if (!counterStarted.value) {
    secondsInterval.value = setInterval(() => (text_store.seconds += 1), 1000)
    counterStarted.value = true
  }
}

watch(currWord, () => {
  if (text_store.text_target.length === currWord.value) {
    console.log('timer stopped')
    clearInterval(secondsInterval.value)
  }
})
</script>

<template>
  <div class="relative h-10 w-full min-w-[200px]">
    <textarea
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      style="overflow: hidden"
      class="resize-none"
      placeholder=""
      v-model="text_store.text_input"
      autofocus
      :class="changeBorderInput"
      :maxlength="blockInput"
      @input="startCounter"
    />
    <label :class="changeBorderLabel"> Type racer </label>
  </div>
  <h1>{{ text_store.watch_text_input }}</h1>
</template>
