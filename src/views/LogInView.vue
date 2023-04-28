<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errMsg = ref('')

const userStore = useUserStore()
const router = useRouter()

// console.log(userStore.createUser)

const singInUser = async () => {
  const response = userStore.signInUser(email.value, password.value)
  response
    .then((response) => {
      userStore.isLoggedIn = true
      console.log(response)
      console.log('sign in succesful')
      router.push('/')
    })
    .catch((err) => {
      errMsg.value = err.code
      // console.log(err.message)
      // console.log(errMsg.value)
    })
}

const singInWithGoogle = async () => {
  const response = userStore.signInWithGoogle()
  response
    .then((response) => {
      userStore.isLoggedIn = true
      console.log(response)
      console.log('sign in succesful')
      router.push('/')
    })
    .catch((err) => {
      errMsg.value = err.code
      // console.log(err.message)
      // console.log(errMsg.value)
    })
}

const showErrMsg = computed(() => {
  return errMsg.value
})
</script>
<template>
  <div class="w-1/3 mx-auto my-28">
    <div
      class="mx-auto bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="space-y-6" action="#">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in</h3>
        <div>
          <label for="email" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >Your email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required="true"
            v-model="email"
          />
        </div>
        <div>
          <label
            for="password"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >Your password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required="true"
            v-model="password"
          />
        </div>
        <div>{{ showErrMsg }}</div>
        <!-- <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                class="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
            <div class="text-sm ml-3">
              <label for="remember" class="font-medium text-gray-900 dark:text-gray-300"
                >Remember me</label
              >
            </div>
          </div>
          <a href="#" class="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500"
            >Lost Password?</a
          >
        </div> -->
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="singInUser"
        >
          Login to your account
        </button>
        <div
          class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
        >
          <p class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
        </div>
        <button
          type="button"
          class="py-2 px-4 max-w-md flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white text-sm w-full transition ease-in duration-200 text-center font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          @click="singInWithGoogle"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            class="mr-2"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"
            ></path>
          </svg>
          Sign in with Google
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?
          <RouterLink to="/signup" class="text-blue-700 hover:underline dark:text-blue-500"
            >Create account</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
