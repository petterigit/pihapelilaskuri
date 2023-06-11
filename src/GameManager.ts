import { createStore, produce } from 'solid-js/store'
import { Game, Player } from './types'
import { nanoid } from 'nanoid'

const newGame = (): Game => ({
  players: {},
})

export const [game, setGame] = createStore<Game>(newGame())

export const addPlayer = (name: string) => {
  const newPlayer: Player = {
    id: nanoid(),
    name: name,
    score: 0,
    misses: 0,
  }

  setGame(
    produce((current) => {
      current.players[newPlayer.id] = newPlayer
      return current
    })
  )
}

export const removePlayer = (id: string) => {
  setGame(
    produce((current) => {
      delete current.players[id]
      return current
    })
  )
}
