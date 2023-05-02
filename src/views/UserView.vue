<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { computed, onMounted, ref } from 'vue'
import UserInfoTabelRow from '@/components/UserInfoTabelRow.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PlayerPlays from '@/components/PlayerPlays.vue'
import type { userInterface } from '@/models/models'

const userStore = useUserStore()
const userInfo = ref<userInterface>({
  bestWPM: 0,
  meanAccuracy: 0,
  meanWPM: 0,
  racesPlayed: 0,
  userID: '',
  username: '',
  worstWPM: 0
})

onMounted(() => {
  userStore.computeUserInfo().then((data) => (userInfo.value = data))
  console.log(userStore.auth.currentUser?.displayName)
})
</script>
<template>
  <div class="m-auto mt-28 md:w-1/3 w-full">
    <div class="border-2 border-slate-800 rounded p-10">
      <h1>Your account:</h1>
      <hr />
      <div v-if="!userInfo" class="grid place-items-center">
        <LoadingSpinner class="m-auto place-self-center" />
      </div>

      <div v-else>
        <div v-if="userStore.auth.currentUser" class="flex justify-between">
          <h1>Username</h1>
          <h1>{{ userStore.auth.currentUser.displayName }}</h1>
        </div>
        <UserInfoTabelRow :userInfo="userInfo" />
      </div>
    </div>
  </div>
  <h1>Your plays</h1>
  <PlayerPlays />
</template>
