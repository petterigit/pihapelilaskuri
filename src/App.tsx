import { Component } from 'solid-js'
import '@unocss/reset/tailwind.css'
import { ModalContainer, ModalProvider } from './components/ModalContext'
import { Main } from './views/Main'

const App: Component = () => {
  return (
    <ModalProvider>
      <div class="w-screen h-screen text-text bg-bg overflow-hidden">
        <Main />
        <ModalContainer />
      </div>
    </ModalProvider>
  )
}

export default App
