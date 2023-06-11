import { Component, createContext, For, JSX, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Button } from './Button'

export interface Modal {
  content: () => JSX.Element
  title?: string
  onOk?: () => void
  onCancel?: () => void
}

type ModalContextType = [
  Modal[],
  { createModal: (modal: Modal) => void; removeModal: (index: number) => void }
]

export const ModalContext = createContext<ModalContextType>([
  [],
  { createModal: () => null, removeModal: () => null },
])

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
      removeModal(index: number) {
        setState((prev) => prev.filter((_, i) => i !== index))
      },
    },
  ]

  return <ModalContext.Provider value={context}>{props.children}</ModalContext.Provider>
}

export const ModalContainer: Component = () => {
  const [modals, { removeModal }] = useContext(ModalContext)

  const closeModal = (index: number) => {
    removeModal(index)
  }

  return (
    <div class="relative">
      <For each={modals}>
        {(modal, index) => (
          <div
            class="absolute inset-0 h-screen flex items-center justify-center bg-black/50"
            onClick={() => {
              modal.onCancel?.()
              closeModal(index())
            }}
          >
            <div class="p-8 max-w-3xl w-full bg-bg" onClick={(event) => event.stopPropagation()}>
              <div class="min-h-48">
                <h3 class="font-bold text-xl mb-8">{modal.title}</h3>
                {modal.content()}
              </div>
              <div class="flex justify-center gap-16">
                <Button
                  danger
                  text="Peruuta"
                  class="w-32"
                  onClick={() => {
                    modal.onCancel?.()
                    closeModal(index())
                  }}
                />
                <Button
                  text="Ok"
                  class="w-32"
                  onClick={() => {
                    modal.onOk?.()
                    closeModal(index())
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}
