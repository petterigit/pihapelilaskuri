import { Component, Show, createSignal, useContext } from 'solid-js'
import { Players } from '../components/Players'
import { Button } from '../components/Button'
import { ModalContext } from '../components/ModalContext'
import { addPlayer, isPlayersState, randomizePlayerOrder, setGameState } from '../GameManager'
import { TextInput } from '../components/TextInput'

export const Main: Component = () => {
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
    <div class="max-w-3xl mx-auto relative border">
      <div class="absolute top-0 left-0 right-0 w-full px-4 h-16 border-b bg-bg flex justify-between items-center shadow">
        <h2 class="font-bold text-2xl py-4 text-center">
          {isPlayersState() ? 'Pelaajat' : 'Peli'}
        </h2>
        <Show when={isPlayersState()}>
          <Button text="Aloita" onClick={() => setGameState('game')} />
        </Show>
      </div>
      <div class="h-screen w-full overflow-auto py-18">
        <Players />
      </div>
      <div class="absolute bottom-0 left-0 right-0 w-full px-4 h-16 border-t bg-bg flex justify-between items-center shadow">
        <Show when={isPlayersState()}>
          <Button text="Sekoita pelaajat" onClick={() => randomizePlayerOrder()} />
          <Button text="Lisää pelaaja" onClick={() => handleNewPlayer()} />
        </Show>
      </div>
    </div>
  )
}
