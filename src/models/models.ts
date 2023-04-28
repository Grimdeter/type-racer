export interface leaderboardInstance {
  Username: string
  accuracy: number
  promptWord: string
  wpm: number
  userID: string
}

export interface userInterface {
  bestWPM: number
  meanAccuracy: number
  meanWPM: number
  racesPlayed: number
  userID: string | undefined
  username: string | undefined | null
  worstWPM: number
}
