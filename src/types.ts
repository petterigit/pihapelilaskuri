export interface Player {
  id: string
  name: string
  score: number
  misses: number
}

export type State = 'players' | 'game'

export interface Game {
  state: State
  hasStarted: boolean
  players: Record<string, Player>
}
