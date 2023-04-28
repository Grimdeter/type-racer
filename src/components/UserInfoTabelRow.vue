<script setup lang="ts">
import type { userInterface } from '@/models/models'
import { computed } from 'vue'

const props = defineProps<{ userInfo: userInterface }>()

const showBestWPM = computed(() => {
  if (props.userInfo) {
    return props.userInfo.bestWPM
  }
  return
})
const showWorstWPM = computed(() => {
  if (props.userInfo) {
    return props.userInfo.worstWPM
  }
  return
})
const showMeanWPM = computed(() => {
  if (props.userInfo) {
    return props.userInfo.meanWPM
  }
  return
})
const showMeanAccuracy = computed(() => {
  if (props.userInfo) {
    return props.userInfo.meanAccuracy
  }
  return
})
const showRacesPlayed = computed(() => {
  if (props.userInfo) {
    return props.userInfo.racesPlayed
  }
  return
})
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1>Best WPM</h1>
      <h1>{{ showBestWPM }}</h1>
    </div>
    <div class="flex justify-between">
      <h1>Worst WPM</h1>
      <h1>{{ showWorstWPM }}</h1>
    </div>
    <div class="flex justify-between">
      <h1>Mean WPM</h1>
      <h1>{{ showMeanWPM }}</h1>
    </div>
    <div class="flex justify-between">
      <h1>Mean accuracy</h1>
      <h1>{{ showMeanAccuracy }}</h1>
    </div>
    <div class="flex justify-between">
      <h1>Races played</h1>
      <h1>{{ showRacesPlayed }}</h1>
    </div>
  </div>
</template>
