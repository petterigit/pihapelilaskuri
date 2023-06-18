export interface Player {
  id: string
  name: string
  score: number
  misses: number
}

export type State = 'players' | 'game' | 'adding-players'

export interface Game {
  state: State
  hasStarted: boolean
  players: Record<string, Player>
}
