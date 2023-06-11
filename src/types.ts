export interface Player {
  id: string
  name: string
  score: number
  misses: number
}

export interface Game {
  players: Record<string, Player>
}
