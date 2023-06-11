import { Component, JSX, onMount, splitProps } from 'solid-js'

const classes = `
  appearance-none
  bg-bg
  rounded
  accent-primary
  caret-primary
  h-8
  px-2
  border
`

type Props = { autoFocus?: boolean } & JSX.InputHTMLAttributes<HTMLInputElement>

export const TextInput: Component<Props> = (props) => {
  let input: HTMLInputElement | undefined
  const [local, others] = splitProps(props, ['class', 'type', 'autoFocus'])

  const combinedClasses = () => (local.class ? `${classes} ${local.class}` : classes)

  onMount(() => {
    if (local.autoFocus) {
      input?.focus()
    }
  })

  return <input ref={input} class={combinedClasses()} type={local.type ?? 'text'} {...others} />
}
