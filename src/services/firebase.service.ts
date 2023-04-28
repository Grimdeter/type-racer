import { initializeApp } from 'firebase/app'
import {
  collection,
  query,
  getDocs,
  getFirestore,
  addDoc,
  type DocumentData
} from 'firebase/firestore'
import type { leaderboardInstance } from '@/models/models'
import { config } from '@/services/firebase.config'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = config

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()

const leaderboardCollection = collection(db, 'Leaderboard')
const usersCollection = collection(db, 'users')

export const getFullLeaderboard = async () => {
  const querySnap = await getDocs(query(leaderboardCollection))
  let arrForReturn: DocumentData[] = []
  querySnap.forEach((doc) => {
    // console.log('pushing')
    // console.log(doc.data())
    arrForReturn.push(doc.data())
  })
  return arrForReturn as unknown as leaderboardInstance[]
}

export const getUser = async () => {
  const querySnap = await getDocs(query(usersCollection))
  let arrForReturn: DocumentData[] = []
  querySnap.forEach((doc) => {
    // console.log('pushing')
    // console.log(doc.data())
    arrForReturn.push(doc.data())
  })

  return arrForReturn
}

export const addToLeaderboard = async (leaderboardToAdd: leaderboardInstance) => {
  const docRef = await addDoc(leaderboardCollection, leaderboardToAdd)
  return docRef.id
}

export const addNewUser = async (username: string, uid: string) => {
  const objectToAdd = { username: username, userID: uid, racesPlayed: 0 }
  const docRef = await addDoc(usersCollection, objectToAdd)
  return docRef.id
}
