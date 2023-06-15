import { createStore, produce } from 'solid-js/store'
import { Game, Player } from './types'
import { nanoid } from 'nanoid'
import { putGameToStorage } from './localstorage'

export const newGame = (): Game => ({
  players: {},
})

export const newPlayer = (): Player => ({
  id: nanoid(),
  name: '',
  score: 0,
  misses: 0,
})

export const [game, setGame] = createStore<Game>(newGame())

export const getPlayers = () => Object.values(game.players)

export const addPlayer = (name: string) => {
  const player = newPlayer()
  player.name = name

  setGame(
    produce((current) => {
      current.players[player.id] = player
      return current
    })
  )
  putGameToStorage(game)
}

export const removePlayer = (id: string) => {
  setGame(
    produce((current) => {
      delete current.players[id]
      return current
    })
  )
  putGameToStorage(game)
}

export const randomizePlayerOrder = () => {
  setGame(
    produce((current) => {
      const playerList = Object.values(current.players)

      // Durstenfeld shuffle
      for (let i = playerList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[playerList[i], playerList[j]] = [playerList[j], playerList[i]]
      }

      const orderedPlayers = playerList.reduce((players: Game['players'], player) => {
        players[player.id] = player
        return players
      }, {})
      current.players = orderedPlayers

      return current.players
    })
  )
}
