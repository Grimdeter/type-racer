import { ref, computed } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { addNewUser, getUser } from '@/services/firebase.service'
import { getFullLeaderboard } from '@/services/firebase.service'
import type { leaderboardInstance, userInterface } from '@/models/models'

export const useUserStore = defineStore('user', () => {
  const auth = ref(getAuth())
  const username = ref('')
  const router = useRouter()
  const isLoggedIn = ref(false)
  const userInfo = ref()

  setPersistence(auth.value, browserLocalPersistence)

  function createUser(email: string, password: string, username: string) {
    console.log(auth.value)
    createUserWithEmailAndPassword(auth.value, email, password).then((response) => {
      console.log(response)
      console.log(auth.value.currentUser)
      updateProfile(response.user, { displayName: username })
      console.log('sing up succesful')
    })
  }

  async function signInUser(email: string, password: string) {
    console.log(auth.value)
    await signInWithEmailAndPassword(auth.value, email, password)
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth.value, provider)
  }

  // async function getUsername() {
  //   if (auth.value.currentUser) {
  //     getUser().then((data) => {
  //       console.log(data.filter((user) => user.userID == auth.value.currentUser?.uid))

  //       username.value = data.filter(
  //         (user) => user.userID == auth.value.currentUser?.uid
  //       )[0].username
  //     })
  //   }
  // }

  async function getUserInfo() {
    if (auth.value.currentUser) {
      getUser().then((data) => {
        console.log(data.filter((user) => user.userID == auth.value.currentUser?.uid))

        userInfo.value = data.filter((user) => user.userID == auth.value.currentUser?.uid)
      })
    }
  }

  async function computeUserInfo() {
    const leaderboardData = await getFullLeaderboard()
    console.log('got to counting')
    const userData = leaderboardData.filter(
      (value: leaderboardInstance) => value.userID === auth.value.currentUser?.uid
    )
    console.log(userData)
    const objectToReturn: userInterface = {
      userID: auth.value.currentUser?.uid,
      username: auth.value.currentUser?.displayName,
      bestWPM: 0,
      meanAccuracy: 0,
      meanWPM: 0,
      racesPlayed: userData.length,
      worstWPM: 0
    }
    console.log(objectToReturn)

    let sumWPM = 0
    let sumAcc = 0
    let wpm = userData.map((a) => a.wpm)
    if (userData.length !== 0) {
      objectToReturn.worstWPM = Math.min(...wpm)
      objectToReturn.bestWPM = Math.max(...wpm)
    }
    for (let i = 0; i < userData.length; i++) {
      const element = userData[i]
      sumAcc += element.accuracy
      sumWPM += element.wpm
      objectToReturn.meanWPM = Number((sumWPM / (i + 1)).toPrecision(3))
      objectToReturn.meanAccuracy = Number((sumAcc / (i + 1)).toPrecision(3))
    }

    console.log(objectToReturn)
    return objectToReturn
  }

  async function handleAuthStateChange() {
    onAuthStateChanged(auth.value, (user) => {
      if (user) {
        isLoggedIn.value = true
      } else {
        isLoggedIn.value = false
      }
    })
  }

  return {
    auth,
    isLoggedIn,
    userInfo,
    username,
    createUser,
    handleAuthStateChange,
    computeUserInfo,
    getUserInfo,
    signInWithGoogle,
    signInUser
  }
})
