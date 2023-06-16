import { Component, JSX, splitProps } from 'solid-js'

const classes = (danger?: boolean) => `
  transition
  p-2
  font-bold
  ${danger ? 'text-danger hover:text-danger-dark' : 'text-primary hover:text-primary-dark'}
`

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: MouseEvent) => void
  danger?: boolean
  text?: JSX.Element
}

export const TextButton: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['onClick', 'text', 'class'])

  return (
    <button
      classList={{}}
      class={`${classes(props.danger)} ${local.class ? local.class : ''}`}
      onClick={(event) => props.onClick?.(event)}
      {...others}
    >
      {props.text}
    </button>
  )
}
