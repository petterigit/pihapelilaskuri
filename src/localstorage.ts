import { newGame, newPlayer } from './GameManager'
import { Game, Player } from './types'

const storageKey = 'game'

export const putGameToStorage = (game: Game) => {
  const json = JSON.stringify(game)
  localStorage.setItem(storageKey, json)
}

export const getGameFromStorage = (): Game | undefined => {
  const storedGame = localStorage.getItem(storageKey)
  if (!storedGame) return undefined

  const parsedGame = JSON.parse(storedGame)

  const game: Game = { ...newGame(), ...parsedGame }
  game.players = Object.entries(game.players).reduce(
    (players: Record<string, Player>, [id, player]) => {
      players[id] = { ...newPlayer(), ...player }
      return players
    },
    {}
  )

  return game
}
