<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import { useTextStore } from './stores/text.store'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.store'

const textStore = useTextStore()
const userStore = useUserStore()

onMounted(() => {
  userStore.handleAuthStateChange()
  textStore.getRandomDefinition()
})
</script>

<template>
  <div class="lg:px-12 dark:text-white dark:bg-slate-900">
    <Header />
    <RouterView />
  </div>
</template>
