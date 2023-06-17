import { Component, JSX, splitProps } from 'solid-js'

const classes = (danger?: boolean, border?: boolean) => `
  transition
  p-3
  font-bold
  ${
    danger
      ? 'text-danger hover:text-danger-dark !border-danger !hover:border-danger-dark'
      : 'text-primary hover:text-primary-dark !border-primary !hover:border-primary-dark'
  }
  ${border ? 'rounded border-3' : ''}
`

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: MouseEvent) => void
  danger?: boolean
  text?: JSX.Element
  border?: boolean
}

export const TextButton: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['onClick', 'text', 'class'])

  return (
    <button
      classList={{}}
      class={`${classes(props.danger, props.border)} ${local.class ? local.class : ''}`}
      onClick={(event) => props.onClick?.(event)}
      {...others}
    >
      {props.text}
    </button>
  )
}
