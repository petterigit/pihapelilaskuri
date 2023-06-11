import { Component, createSignal, For, useContext } from 'solid-js'
import { addPlayer, getPlayers } from '../GameManager'
import { Button } from './Button'
import { ModalContext } from './ModalContext'
import { TextInput } from './TextInput'

export const Players: Component = () => {
  const [, { createModal }] = useContext(ModalContext)
  const [name, setName] = createSignal<string>('')

  const createNewPlayer = () => {
    addPlayer(name())
    setName('')
  }

  const handleNewPlayer = () => {
    createModal({
      title: 'Lisää pelaaja',
      content: () => (
        <div>
          <label class="block">Pelaajan nimi:</label>
          <TextInput autoFocus value={name()} onChange={(event) => setName(event.target.value)} />
        </div>
      ),
      onOk: () => createNewPlayer(),
    })
  }

  return (
    <div>
      <div>
        <For each={getPlayers()}>{(player) => <div>{player.name}</div>}</For>
      </div>
      <div>
        <Button text="Lisää pelaaja" onClick={() => handleNewPlayer()} />
      </div>
    </div>
  )
}
