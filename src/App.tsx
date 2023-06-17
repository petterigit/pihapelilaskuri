import { Component, onMount } from 'solid-js'
import '@unocss/reset/tailwind.css'
import { ModalContainer, ModalProvider } from './components/ModalContext'
import { Main } from './views/Main'
import { getGameFromStorage } from './localstorage'
import { newGame, setGame } from './GameManager'

const App: Component = () => {
  onMount(() => {
    setGame(getGameFromStorage() ?? newGame())
  })

  return (
    <ModalProvider>
      <div class="w-screen h-screen text-text bg-bg overflow-hidden relative">
        <Main />
        <ModalContainer />
      </div>
    </ModalProvider>
  )
}

export default App
