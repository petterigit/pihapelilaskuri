import { addPlayer, getNumberOfPlayers, setGameState } from '../GameManager'
import { Button } from './Button'
import { TextInput } from './TextInput'

export const AddPlayerForm = () => {
  const placeholder = () => `Pelaaja ${getNumberOfPlayers() + 1}`

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
    nameInput.value = ''
  }

  return (
    <form
      class="p-4 flex gap-2 justify-between items-center"
      onSubmit={(e) => {
        handleAddPlayer(
          e as unknown as Event & {
            target: HTMLFormElement
          }
        )
      }}
    >
      <TextInput name="player-input" placeholder={placeholder()} autoFocus />
      <Button type="submit" class="i-tabler-circle-plus w-12 h-12" />
      <Button
        danger
        onClick={() => setGameState('players')}
        class="i-tabler-arrow-back-up w-12 h-12"
      />
    </form>
  )
}
