<script setup lang="ts">
import { useTextStore } from '@/stores/text.store'
import { computed, ref } from 'vue'

const text_store = useTextStore()
const styleChoice = ref(1)

const showTextVanishingStyle = computed(() => {
  let text_target = text_store.text_target.join(' ')
  let text_input_full = text_store.text_input_full.join(' ') + ' ' + text_store.text_input
  let currIndex = levDist(text_target, text_input_full.trim())

  // console.log(`text_input_full.length ${text_input_full.length}`)
  // console.log(`text_input_full ${text_input_full}`)
  // console.log(`text_target.length ${text_target.length}`)
  // console.log(`currIndex ${currIndex}`)
  // console.log(`________________________`)
  if (text_target.length - currIndex === 1 && text_input_full.length === 1) {
    return text_target.slice(0)
  }

  return text_target.slice(text_target.length - currIndex)
})

const showTextHighlightStyle = computed(() => {
  let text_input_full = text_store.text_input_full.join(' ') + ' ' + text_store.text_input
  if (text_store.oops_mistake) {
    return text_input_full.slice(0, text_input_full.length - 1)
  }

  return text_input_full
})

const showMistakeHighlightStyle = computed(() => {
  return text_store.text_input[text_store.text_input.length - 1]
})

function levDist(s: string, t: string) {
  // Step 1
  let n = s.length
  let m = t.length

  let d: number[][] = new Array(n).fill(false).map(() => new Array(n).fill(false))

  if (n == 0) return m
  if (m == 0) return n

  //Create an array of arrays in javascript (a descending loop is quicker)
  for (let i = n; i >= 0; i--) d[i] = []

  // Step 2
  for (let i = n; i >= 0; i--) d[i][0] = i
  for (let j = m; j >= 0; j--) d[0][j] = j

  // Step 3
  for (let i = 1; i <= n; i++) {
    let s_i = s.charAt(i - 1)

    // Step 4
    for (let j = 1; j <= m; j++) {
      //Check the jagged ld total so far
      if (i == j && d[i][j] > 4) return n

      let t_j = t.charAt(j - 1)
      let cost = s_i == t_j ? 0 : 1 // Step 5

      //Calculate the minimum
      let mi = d[i - 1][j] + 1
      let b = d[i][j - 1] + 1
      let c = d[i - 1][j - 1] + cost

      if (b < mi) mi = b
      if (c < mi) mi = c

      d[i][j] = mi // Step 6

      //Damerau transposition
      if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost)
      }
    }
  }
  // Step 7
  return d[n][m]
}

function handleChangeOfStyle(styleOfChoice: number) {
  styleChoice.value = styleOfChoice
}
</script>

<template>
  <div
    class="flex-start flex h-1.5 w-full overflow-hidden rounded-sm bg-blue-gray-50 font-sans text-xs font-medium"
  >
    <div
      class="flex h-full items-baseline justify-center overflow-hidden break-all bg-blue-500 text-white"
      :style="{ width: (text_store.currWord / text_store.text_target.length) * 100 + '%' }"
    ></div>
  </div>
  <div
    class="relative flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
  >
    <div class="p-6">
      <h4
        class="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"
        v-if="styleChoice === 0"
      >
        {{ showTextVanishingStyle }}
      </h4>
      <h4
        class="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"
        v-else
      >
        <span class="text-cyan-600">{{ showTextHighlightStyle }}</span>
        <span class="text-pink-600" v-show="text_store.oops_mistake">{{
          showMistakeHighlightStyle
        }}</span>
        <span class="opacity-50 text-gray-500">{{ showTextVanishingStyle }}</span>
      </h4>
    </div>
  </div>
  <div class="flex justify-end mt-5">
    <div class="">
      <button
        class="ml-auto group relative bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        @click="handleChangeOfStyle(0)"
      >
        Vanishing Style
        <!-- Tooltip text here -->
        <span
          class="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700"
          >Text vanishes as it is being typed</span
        >
      </button>
    </div>
    <div class="mx-3">
      <button
        class="ml-auto group relative bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        @click="handleChangeOfStyle(1)"
      >
        Highlight Style
        <!-- Tooltip text here -->
        <span
          class="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700"
          >Text highlights as it is being typed</span
        >
      </button>
    </div>
  </div>
</template>
