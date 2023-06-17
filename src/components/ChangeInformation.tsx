import { Component, Show } from 'solid-js'

interface Props {
  original: number
  new: number
}

export const ChangeInformation: Component<Props> = (props) => {
  return (
    <div class="flex flex-col items-center mt-2">
      <p>
        Muutos: <b>{props.new - props.original}</b>
      </p>
      <Show when={props.new - props.original} fallback={<div class="h-6" />}>
        <div class="flex items-center gap-2 h-6">
          <p>{props.original}</p>
          <div class="inline-block text-3xl i-tabler-arrow-big-right-lines-filled" />
          <p class="text-lg font-bold">{props.new}</p>
        </div>
      </Show>
    </div>
  )
}
