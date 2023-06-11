import { Component, useContext } from 'solid-js'
import { Button } from '../components/Button'
import { ModalContext } from '../components/ModalContext'

export const Main: Component = () => {
  const [, { createModal }] = useContext(ModalContext)

  const addPlayer = () => {
    createModal({
      content: <div>hello!</div>,
    })
  }

  return (
    <div class="h-screen w-screen bg-bg text-text">
      <div class="max-w-3xl px-2 mx-auto h-full border">
        <Button text="Lisää pelaaja" onClick={() => addPlayer()} /> <Button danger text="Danger" />
      </div>
    </div>
  )
}
