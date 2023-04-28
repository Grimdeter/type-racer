<script setup lang="ts">
import type { leaderboardInstance } from '@/models/models'
// leaderboardData
const props = defineProps<{ leaderboardData: leaderboardInstance; rowNum: number }>()
</script>

<template>
  <tr class="border-b dark:border-neutral-500">
    <td class="whitespace-nowrap px-6 py-4 font-medium">{{ props.rowNum + 1 }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ props.leaderboardData.Username }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ props.leaderboardData.wpm }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ props.leaderboardData.accuracy }}</td>
    <td class="whitespace-nowrap px-6 py-4">{{ props.leaderboardData.promptWord }}</td>
  </tr>
</template>
