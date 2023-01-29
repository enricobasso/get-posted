export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface Leaderboard {
  userId: number,
  count: number
}
