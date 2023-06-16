export interface Player {
  id: string
  name: string
  score: number
  misses: number
}

export type State = 'players' | 'game'

export interface Game {
  state: State
  players: Record<string, Player>
}
