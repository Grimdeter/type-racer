<script setup lang="ts">
import TextInput from '@/components/TextInput.vue'
import TargetText from '@/components/TargetText.vue'
import { useTextStore } from '@/stores/text.store'
import ShowResults from '@/components/ShowResults.vue'
import Keyboard from '@/components/Keyboard.vue'
import SoundControl from '@/components/SoundControl.vue'

const text_store = useTextStore()
const screenHeight = screen.height - 249
</script>

<template>
  <div :style="{ height: `${screenHeight}px` }">
    <div class="w-11/12 md:w-1/3 mx-auto flex justify-center mt-16">
      <div class="w-full" v-show="text_store.currWord !== text_store.text_target.length">
        <TextInput />
        <TargetText />
      </div>
      <div
        v-if="
          text_store.currWord === text_store.text_target.length &&
          text_store.text_target.length !== 0
        "
        class="w-full"
      >
        <ShowResults />
      </div>
    </div>
    <div
      class="mx-auto lg:flex flex-col align-middle justify-center my-11 hidden"
      v-if="text_store.currWord !== text_store.text_target.length"
    >
      <SoundControl />
      <Keyboard />
    </div>
  </div>
</template>
