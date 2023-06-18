import { Component, JSX, splitProps } from 'solid-js'

const classes = (danger?: boolean) => `
  rounded
  shadow
  hover:shadow-lg
  transition
  py-3
  px-6
  font-bold
  ${danger ? 'bg-danger hover:bg-danger-dark' : 'bg-primary hover:bg-primary-dark'}
  text-bg
`

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: MouseEvent) => void
  danger?: boolean
  text?: string
}

export const Button: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['onClick', 'text', 'class'])

  return (
    <button
      classList={{}}
      class={`${classes(props.danger)} ${local.class ? local.class : ''}`}
      onClick={(event) => props.onClick?.(event)}
      {...others}
    >
      {props.text}
      {props.children}
    </button>
  )
}
