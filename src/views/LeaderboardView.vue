<script setup lang="ts">
import { computed, ref } from 'vue'
import { getFullLeaderboard } from '@/services/firebase.service'
import type { leaderboardInstance } from '@/models/models'
import TableRow from '@/components/TableRow.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const leaderboard = ref(<leaderboardInstance[]>[])

getFullLeaderboard().then((data) => {
  console.log(data)
  data.sort((a: leaderboardInstance, b: leaderboardInstance) => b.wpm - a.wpm)
  leaderboard.value = data
})

const reorderLeaderboard = (reorderBasedOn: string) => {
  if (reorderBasedOn === 'wpm') {
    leaderboard.value.sort((a: leaderboardInstance, b: leaderboardInstance) => b.wpm - a.wpm)
  } else {
    leaderboard.value.sort(
      (a: leaderboardInstance, b: leaderboardInstance) => b.accuracy - a.accuracy
    )
  }
}
</script>

<template>
  <div v-if="leaderboard.length === 0" class="grid place-items-center h-screen">
    <LoadingSpinner class="m-auto place-self-center" />
  </div>
  <div v-else class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full text-left text-sm font-light">
            <thead class="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" class="px-6 py-4">#</th>
                <th scope="col" class="px-6 py-4">Username</th>
                <th
                  scope="col"
                  class="px-6 py-4 hover:cursor-pointer"
                  @click="reorderLeaderboard('wpm')"
                >
                  WPM
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 hover:cursor-pointer"
                  @click="reorderLeaderboard('accuracy')"
                >
                  Accuracy
                </th>
                <th scope="col" class="px-6 py-4">Prompt word</th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                v-for="row in leaderboard"
                :key="leaderboard.indexOf(row)"
                :leaderboard-data="row"
                :rowNum="leaderboard.indexOf(row)"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
