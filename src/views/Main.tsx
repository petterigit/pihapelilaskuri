import { Component, createSignal, useContext } from 'solid-js'
import { Players } from '../components/Players'
import { Button } from '../components/Button'
import { ModalContext } from '../components/ModalContext'
import { addPlayer, randomizePlayerOrder } from '../GameManager'
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
    <div class="min-h-screen w-screen bg-bg text-text overflow-hidden">
      <div class="max-w-3xl px-2 mx-auto relative">
        <h2 class="font-bold text-2xl py-4 text-center">Pelaajat</h2>
        <div class="h-full overflow-auto">
          <Players />
          <div class="h-32" />
        </div>
      </div>
      <div class="fixed max-w-3xl mx-auto left-0 right-0 bottom-0 h-16 border-t bg-bg">
        <div class="h-full flex justify-around items-center">
          <Button text="Sekoita pelaajat" onClick={() => randomizePlayerOrder()} />
          <Button text="Lisää pelaaja" onClick={() => handleNewPlayer()} />
        </div>
      </div>
    </div>
  )
}
