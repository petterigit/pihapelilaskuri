import { Component, Show, createSignal } from 'solid-js'
import { addPlayer } from '../GameManager'
import { Button } from './Button'
import { TextInput } from './TextInput'

interface Props {
  players: number
}

export const NewPlayerPlaceholder: Component<Props> = (props) => {
  const [editing, setEditing] = createSignal<boolean>(false)
  const placeholder = () => `Pelaaja ${props.players + 1}`

  const handleEdit = () => {
    setEditing((edit) => !edit)
  }

  const handleAddPlayer = (event: any) => {
    event = event as Event & {
      submitter: HTMLButtonElement
    } & {
      target: HTMLFormElement
    }
    if (!event) return
    event.preventDefault()
    const nameInput = event.target.elements.namedItem('player-input') as
      | HTMLInputElement
      | undefined
    if (!nameInput) return

    addPlayer(nameInput.value)
    setEditing(false)
  }

  const addPlaceholder = () => {
    addPlayer(placeholder())
    setEditing(false)
  }

  return (
    <>
      <Show when={editing()}>
        <form class="p-4 flex justify-between items-center" onSubmit={handleAddPlayer}>
          {editing() && (
            <div class="flex gap-2">
              <TextInput name="player-input" value={placeholder()} autoFocus />
              <button type="reset">
                <box-icon name="x-circle" onClick={handleEdit} />
              </button>
            </div>
          )}
          <Button type="submit">Lisää </Button>
        </form>
      </Show>
      <Show when={!editing()}>
        <div class="p-4 flex justify-between items-center">
          <div class="flex gap-2">
            <p class="color-coolgray font-bold text-xl break-words min-w-0">{placeholder()}</p>
            <button>
              <box-icon name="edit" onClick={handleEdit} />
            </button>
          </div>

          <Button text="Lisää" onClick={addPlaceholder} />
        </div>
      </Show>
    </>
  )
}
