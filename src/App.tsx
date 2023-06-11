import type { Component } from 'solid-js'
import '@unocss/reset/tailwind.css'

const App: Component = () => {
  return (
    <div class="h-screen w-screen bg-bg text-text">
      <div class="max-w-3xl px-2 mx-auto h-full border">hello</div>
    </div>
  )
}

export default App
