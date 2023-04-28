<script setup lang="ts">
import { useTextStore } from '@/stores/text.store'
import { computed } from 'vue'
import { createToast } from 'mosha-vue-toastify'

const text_store = useTextStore()

const showText = computed(() => {
  let text_target = text_store.text_target.join(' ')
  let text_input_full = text_store.text_input_full.join(' ') + ' ' + text_store.text_input
  let currIndex = levDist(text_target, text_input_full)

  // console.log(text_input_full)
  // createToast(text_target.length - currIndex)
  if (text_target.length - currIndex === 1) {
    return text_target.slice(0)
  }
  return text_target.slice(text_target.length - currIndex)
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
      >
        {{ showText }}
      </h4>
    </div>
  </div>
</template>