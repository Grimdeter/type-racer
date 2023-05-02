<script setup lang="ts">
import { computed, ref } from 'vue'
import { getFullLeaderboard } from '@/services/firebase.service'
import type { leaderboardInstance } from '@/models/models'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useUserStore } from '@/stores/user.store'
import PlayerPlaysRow from './PlayerPlaysRow.vue'

const leaderboard = ref(<leaderboardInstance[]>[])
const userStore = useUserStore()

getFullLeaderboard().then((data) => {
  console.log(data)
  data.sort((a: leaderboardInstance, b: leaderboardInstance) => b.wpm - a.wpm)
  leaderboard.value = data.filter(
    (value: leaderboardInstance) => value.userID === userStore.auth.currentUser?.uid
  )
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

function handleDeleteScore() {
  getFullLeaderboard().then((data) => {
    // console.log(data)
    data.sort((a: leaderboardInstance, b: leaderboardInstance) => b.wpm - a.wpm)
    leaderboard.value = data.filter(
      (value: leaderboardInstance) => value.userID === userStore.auth.currentUser?.uid
    )

    console.log(leaderboard.value)
  })
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
          <table class="min-w-full text-left text-sm font-light table-fixed">
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
              <PlayerPlaysRow
                v-for="row in leaderboard"
                :key="row.docID"
                :index-of-row="leaderboard.indexOf(row)"
                :row="row"
                @scoreDeleted="handleDeleteScore"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
