import { Show } from 'solid-js'
import {
  getNumberOfPlayers,
  randomizePlayerOrder,
  isAddingPlayersState,
  setGameState,
} from '../GameManager'
import { Button } from './Button'

export const PlayerListActions = () => {
  return (
    <div>
      <Button disabled={getNumberOfPlayers() === 0} onClick={() => randomizePlayerOrder()}>
        Sekoita
      </Button>
      <Show when={!isAddingPlayersState() && getNumberOfPlayers() !== 0}>
        <Button onClick={() => setGameState('adding-players')}>Lisää pelaajia</Button>
      </Show>
    </div>
  )
}
