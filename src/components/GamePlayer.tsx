import { Component } from 'solid-js'
import { Player } from '../types'
import { TextButton } from './TextButton'

interface Props {
  player: Player
}

export const GamePlayer: Component<Props> = (props) => {
  return (
    <div class="flex justify-stretch px-4 py-2">
      <div class="flex-grow">
        <p class="font-bold text-xl">{props.player.name}</p>
        <span class="mr-8">
          Pisteet: <span class="font-bold">{props.player.score}</span>
        </span>
        <span>
          Ohi: <span class="font-bold">{props.player.misses}</span>
        </span>
      </div>
      <div class="flex items-center">
        <TextButton text="Muokkaa" />
      </div>
    </div>
  )
}
