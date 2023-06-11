import { Component, createContext, For, JSX, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

export interface Modal {
  content: JSX.Element
}

type ModalContextType = [Modal[], { createModal: (modal: Modal) => void }]

export const ModalContext = createContext<ModalContextType>([[], { createModal: () => null }])

interface ProviderProps {
  children: JSX.Element
}

export const ModalProvider: Component<ProviderProps> = (props) => {
  const [state, setState] = createStore<Modal[]>([])
  const context: ModalContextType = [
    state,
    {
      createModal(modal: Modal) {
        setState((prev) => [...prev, modal])
      },
    },
  ]

  return <ModalContext.Provider value={context}>{props.children}</ModalContext.Provider>
}

export const ModalContainer: Component = () => {
  const [modals] = useContext(ModalContext)
  return (
    <div class="relative">
      <For each={modals}>
        {(modal) => (
          <div class="absolute inset-0 h-screen flex items-center justify-center bg-black/50">
            <div class="p-4 max-w-3xl w-full min-h-48 bg-bg">{modal.content}</div>
          </div>
        )}
      </For>
    </div>
  )
}
