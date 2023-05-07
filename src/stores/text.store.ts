import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { dictionaryAxios } from '@/services/axios.service'
import { words } from '@/assets/dictionaryWords'

export const useTextStore = defineStore('text', () => {
  const possibleWords = words

  const text_target = ref(<string[]>[])
  const text_input = ref('')
  const text_input_full = ref(<string[]>[])
  const currWord = ref(0)
  const oops_mistake = ref(false)
  const numberOfMistakes = ref(0)
  const seconds = ref(0)
  const promptWord = ref(possibleWords[Math.floor(Math.random() * possibleWords.length)])

  const getRandomDefinition = () => {
    promptWord.value = possibleWords[Math.floor(Math.random() * possibleWords.length)]
    dictionaryAxios
      .get(promptWord.value)
      .then((data) => {
        text_target.value = (data as unknown as string).split(' ')
        text_input_full.value = []
        numberOfMistakes.value = 0
        currWord.value = 0
        seconds.value = 0
        text_input.value = ''
      })
      .catch((e) => {
        console.log('word not found')
        getRandomDefinition()
      })
  }

  const deliverMistake = computed(() => {
    return oops_mistake.value
  })

  const watch_text_input = computed(() => {
    if (text_input.value[text_input.value.length - 1] === ' ') {
      text_input_full.value.push(text_input.value.trim())
      if (text_input_full.value[currWord.value] === text_target.value[currWord.value]) {
        text_input.value = ''
        currWord.value += 1
        return
      } else {
        numberOfMistakes.value += 1
        console.log('highlight red')
        oops_mistake.value = true
        text_input_full.value.pop()
        return
      }
    }

    if (
      text_input.value[text_input.value.length - 1] !==
      text_target.value[currWord.value][text_input.value.length - 1]
    ) {
      oops_mistake.value = true
      numberOfMistakes.value += 1
      console.log('highlight red')
    } else {
      if (
        currWord.value + 1 === text_target.value.length &&
        text_input.value.length === text_target.value[text_target.value.length - 1].length
      ) {
        currWord.value += 1
      }
      oops_mistake.value = false
    }
  })

  return {
    text_target,
    text_input,
    text_input_full,
    currWord,
    oops_mistake,
    deliverMistake,
    watch_text_input,
    seconds,
    numberOfMistakes,
    promptWord,
    getRandomDefinition
  }
})
