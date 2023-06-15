import { Component, createSignal, For, useContext } from 'solid-js'
import { addPlayer, getPlayers, randomizePlayerOrder } from '../GameManager'
import { Button } from './Button'
import { ModalContext } from './ModalContext'
import { NewPlayer } from './NewPlayer'
import { TextInput } from './TextInput'

export const Players: Component = () => {
  const [, { createModal }] = useContext(ModalContext)
  const [name, setName] = createSignal<string>('')

  const createNewPlayer = () => {
    if (!name()) return true

    addPlayer(name())
    setName('')
  }

  const handleNewPlayer = () => {
    createModal({
      title: 'Lisää pelaaja',
      content: () => (
        <div>
          <label class="block">Pelaajan nimi:</label>
          <TextInput autoFocus value={name()} onInput={(event) => setName(event.target.value)} />
        </div>
      ),
      onOk: () => createNewPlayer(),
    })
  }

  return (
    <div>
      <div>
        <For each={getPlayers()}>{(player) => <NewPlayer player={player} />}</For>
      </div>
      <div>
        <Button text="Lisää pelaaja" onClick={() => handleNewPlayer()} />
        <Button text="Sekoita pelaajat" onClick={() => randomizePlayerOrder()} />
      </div>
    </div>
  )
}
