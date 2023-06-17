import { Component, Show, onCleanup, onMount } from 'solid-js'
import type { Modal as ModalType } from './ModalContext'
import { Button } from './Button'

interface Props {
  modal: ModalType
  index: number
  onOk: (index: number) => boolean | void
  onCancel: (index: number) => boolean | void
  closeModal: () => void
}

export const Modal: Component<Props> = (props) => {
  const handleKeys = (event: KeyboardEvent) => {
    const handlers: Record<string, (i: number) => void> = {
      Enter: props.onOk,
      Escape: props.onCancel,
    }
    const handler = handlers[event.key]
    if (handler) {
      handler(props.index)
      event.stopPropagation()
    }
  }

  onMount(() => addEventListener('keypress', handleKeys))
  onCleanup(() => removeEventListener('keypress', handleKeys))

  return (
    <div
      class="fixed inset-0 h-screen flex items-center justify-center bg-black/50"
      onClick={() => props.onCancel(props.index)}
    >
      <div class="p-8 max-w-3xl w-full bg-bg" onClick={(event) => event.stopPropagation()}>
        <div class="min-h-48">
          <h3 class="font-bold text-xl mb-8">{props.modal.title}</h3>
          {props.modal.content(props.closeModal)}
        </div>
        <div class="flex justify-center gap-16">
          <Show when={!props.modal.hideCancel}>
            <Button
              danger
              text="Peruuta"
              class="w-32"
              onClick={() => props.onCancel(props.index)}
            />
          </Show>
          <Show when={!props.modal.hideOk}>
            <Button text="Ok" class="w-32" onClick={() => props.onOk(props.index)} />
          </Show>
        </div>
      </div>
    </div>
  )
}
