import { Component, Show, createSignal, useContext } from 'solid-js'
import { Players } from '../components/Players'
import { Button } from '../components/Button'
import { ModalContext } from '../components/ModalContext'
import {
  addPlayer,
  endGame,
  gameHasStarted,
  getNumberOfPlayers,
  isAddingPlayersState,
  isGameState,
  isPlayersState,
  randomizePlayerOrder,
  setGameState,
  startGame,
} from '../GameManager'
import { TextButton } from '../components/TextButton'
import { PlayerListActions } from '../components/PlayerListActions'
import { AddPlayerForm } from '../components/AddPlayerForm'
import { AddPlayersLargeButton } from '../components/AddPlayersLargeButton'

const barClasses = `
  absolute
  left-0
  right-0
  w-full
  px-4
  h-16
  bg-bg
  flex
  justify-between
  items-center
  shadow
  z-10
  bg-bg-surface
`

export const Main: Component = () => {
  const [, { createModal }] = useContext(ModalContext)
  const [name, setName] = createSignal<string>('')

  const createNewPlayer = () => {
    if (!name()) return true

    addPlayer(name())
    setName('')
  }

  /* https://www.youtube.com/watch?v=Ep_blZhvI2A
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
  */

  const handleGameOptions = () => {
    createModal({
      title: 'Toiminnot',
      hideOk: true,
      content: (closeModal) => (
        <div class="flex flex-col justify-center items-center gap-8 pb-16">
          <Show when={isPlayersState()}>
            <Button disabled={getNumberOfPlayers() === 0} onClick={() => randomizePlayerOrder()}>
              Sekoita pelaajat
            </Button>
          </Show>
          <Show when={isGameState()}>
            <Button
              text="Muokkaa pelaajia"
              onClick={() => {
                setGameState('players')
                closeModal()
              }}
            />
          </Show>

          <TextButton
            danger
            border
            text="Nollaa peli"
            onClick={() => {
              closeModal()
              createModal({
                title: 'Haluatko varmasti nollata pelin?',
                okText: 'Nollaa',
                content: () => <div />,
                onOk: () => {
                  endGame()
                  closeModal()
                },
              })
            }}
          />
        </div>
      ),
      onOk: () => createNewPlayer(),
    })
  }

  return (
    <div class="max-w-3xl h-full mx-auto relative border-x">
      <div class={`${barClasses} top-0 border-b`}>
        <h2 class="font-bold text-2xl py-4 text-center">
          {isPlayersState() ? `Pelaajat (${getNumberOfPlayers()})` : 'Peli'}
        </h2>
        <Show when={isPlayersState()}>
          <div class="flex flex-row gap-2 items-center">
            <Button
              disabled={getNumberOfPlayers() === 0}
              text={gameHasStarted() ? 'Jatka peliä' : 'Aloita'}
              onClick={() => (gameHasStarted() ? setGameState('game') : startGame())}
            />
          </div>
        </Show>
        <Show when={isGameState()}>
          <TextButton text={<div class="i-tabler-dots text-3xl" />} onClick={handleGameOptions} />
        </Show>
      </div>
      <div class="flex flex-col h-screen w-full pt-18">
        <Show when={isPlayersState() && getNumberOfPlayers() === 0 && !isAddingPlayersState()}>
          <AddPlayersLargeButton />
        </Show>
        <Show when={isAddingPlayersState()}>
          <AddPlayerForm />
        </Show>
        <div class="grow overflow-auto">
          <Players />
        </div>
      </div>

      <Show when={isPlayersState()}>
        <div class={`${barClasses} bottom-0 border-b`}>
          <PlayerListActions />
        </div>
      </Show>
    </div>
  )
}
