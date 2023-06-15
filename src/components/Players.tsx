import { Component, For } from 'solid-js'
import { getPlayers } from '../GameManager'
import { NewPlayer } from './NewPlayer'

export const Players: Component = () => {
  return (
    <div class="flex flex-col gap-y-2">
      <For each={getPlayers()}>{(player) => <NewPlayer player={player} />}</For>
    </div>
  )
}
