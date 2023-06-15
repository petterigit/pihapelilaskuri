import { Component } from 'solid-js'
import { Player } from '../types'
import { Button } from './Button'
import { removePlayer } from '../GameManager'

interface Props {
  player: Player
}

export const NewPlayer: Component<Props> = (props) => {
  return (
    <div class="rounded border p-4 flex justify-between">
      <p class="font-bold text-xl">{props.player.name}</p>
      <Button danger text="Poista" onClick={() => removePlayer(props.player.id)} />
    </div>
  )
}
