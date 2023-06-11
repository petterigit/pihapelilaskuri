import { Component } from 'solid-js'
import '@unocss/reset/tailwind.css'
import { ModalContainer, ModalProvider } from './components/ModalContext'
import { Main } from './views/Main'

const App: Component = () => {
  return (
    <ModalProvider>
      <ModalContainer />
      <Main />
    </ModalProvider>
  )
}

export default App
