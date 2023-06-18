import { Component, Show } from 'solid-js'
import { addPlayer, isAddingPlayersState, setGameState } from '../GameManager'
import { Button } from './Button'
import { TextInput } from './TextInput'

interface Props {
  players: number
  large?: boolean
}

export const AddPlayers: Component<Props> = (props) => {
  const placeholder = () => `Pelaaja ${props.players + 1}`

  const handleAddPlayer = (
    event: Event & {
      target: HTMLFormElement
    }
  ) => {
    if (!event) return

    event.preventDefault()

    const nameInput = event.target.elements.namedItem('player-input') as
      | HTMLInputElement
      | undefined
    if (!nameInput) return

    const name = nameInput.value

    if (!name || name === '') {
      addPlayer(placeholder())
      return
    }

    addPlayer(name)
  }

  return (
    <>
      <Show when={!isAddingPlayersState()}>
        <Show when={props.large}>
          <button
            onClick={() => setGameState('adding-players')}
            class="flex pt-24 flex-col justify-center items-center w-full"
          >
            <svg class="h-48 w-48 i-tabler-user-plus"> </svg>
            <p>Lisää pelaajia</p>
          </button>
        </Show>
        <Show when={!props.large}>
          <button
            onClick={() => setGameState('adding-players')}
            class="flex flex-row items-center justify-center w-full"
          >
            <svg class="h-16 w-16 i-tabler-user-plus"> </svg>
            <p>Lisää pelaajia</p>
          </button>
        </Show>
      </Show>

      <Show when={isAddingPlayersState()}>
        <form
          class="p-4 flex flex-col gap-2 justify-between items-center"
          onSubmit={(e) => {
            handleAddPlayer(
              e as unknown as Event & {
                target: HTMLFormElement
              }
            )
          }}
        >
          <div class="flex gap-2">
            <TextInput name="player-input" placeholder={placeholder()} autoFocus />
            <Button
              danger
              onClick={() => setGameState('players')}
              class="i-tabler-arrow-back-up w-12 h-12"
            />
            <Button type="submit" class="i-tabler-circle-plus w-12 h-12" />
          </div>
        </form>
      </Show>
    </>
  )
}
