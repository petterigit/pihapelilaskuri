import { Component, For, Show, createMemo } from 'solid-js'
import { getPlayers, isGameState, isPlayersState } from '../GameManager'
import { NewPlayer } from './NewPlayer'
import { GamePlayer } from './GamePlayer'

export const Players: Component = () => {
  const highestScore = createMemo(() => {
    let maxScore = 0
    let playerId: string | undefined = undefined
    for (const player of getPlayers()) {
      if (player.score > maxScore) {
        maxScore = player.score
        playerId = player.id
      }
    }

    return playerId
  })

  return (
    <div class="flex flex-col divide-y">
      <Show when={isPlayersState()}>
        <For each={getPlayers()}>{(player) => <NewPlayer player={player} />}</For>
      </Show>
      <Show when={isGameState()}>
        <For each={getPlayers()}>
          {(player) => (
            <GamePlayer hasHighestScore={player.id === highestScore()} player={player} />
          )}
        </For>
      </Show>
    </div>
  )
}
