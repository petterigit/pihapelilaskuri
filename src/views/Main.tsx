import { Component } from 'solid-js'
import { Players } from '../components/Players'

export const Main: Component = () => {
  return (
    <div class="h-screen w-screen bg-bg text-text">
      <div class="max-w-3xl px-2 mx-auto h-full border">
        <Players />
      </div>
    </div>
  )
}
