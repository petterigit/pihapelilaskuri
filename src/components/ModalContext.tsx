import { Component, createContext, For, JSX, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Modal } from './Modal'

export interface Modal {
  content: (closeModal: () => void) => JSX.Element
  title?: string
  onOk?: () => boolean | void
  onCancel?: () => void
  hideOk?: boolean
  hideCancel?: boolean
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

  const handleOk = (index: number) => {
    const keepOpen = modals[index]?.onOk?.()
    if (keepOpen) return
    closeModal(index)
  }

  const handleCancel = (index: number) => {
    modals[index]?.onCancel?.()
    closeModal(index)
  }

  const closeModal = (index: number) => {
    removeModal(index)
  }

  return (
    <div class="relative">
      <For each={modals}>
        {(modal, index) => (
          <Modal
            modal={modal}
            index={index()}
            onOk={handleOk}
            onCancel={handleCancel}
            closeModal={() => closeModal(index())}
          />
        )}
      </For>
    </div>
  )
}
