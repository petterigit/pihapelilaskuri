import { Component, For, Show } from 'solid-js'
import { getPlayers, isGameState, isPlayersState } from '../GameManager'
import { NewPlayer } from './NewPlayer'
import { GamePlayer } from './GamePlayer'

export const Players: Component = () => {
  return (
    <div class="flex flex-col divide-y">
      <Show when={isPlayersState()}>
        <For each={getPlayers()}>{(player) => <NewPlayer player={player} />}</For>
      </Show>
      <Show when={isGameState()}>
        <For each={getPlayers()}>{(player) => <GamePlayer player={player} />}</For>
      </Show>
    </div>
  )
}
