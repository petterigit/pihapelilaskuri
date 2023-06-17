import { Component } from 'solid-js'
import { Player } from '../types'
import { removePlayer } from '../GameManager'
import { TextButton } from './TextButton'

interface Props {
  player: Player
}

export const NewPlayer: Component<Props> = (props) => {
  return (
    <div class="p-4 flex justify-between items-center">
      <p class="font-bold text-xl">{props.player.name}</p>
      <TextButton danger text="Poista" onClick={() => removePlayer(props.player.id)} />
    </div>
  )
}
