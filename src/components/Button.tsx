import { Component, JSX, splitProps } from 'solid-js'

const classes = (variant: 'primary' | 'danger' | 'disabled') => `
  rounded
  shadow
  hover:shadow-lg
  transition
  py-3
  px-6
  font-bold
  bg-${variant} hover:bg-${variant}-dark
  text-bg
`

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: MouseEvent) => void
  danger?: boolean
  text?: string
}

export const Button: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ['onClick', 'text', 'class'])

  const getVariant = () => {
    let variant: 'primary' | 'danger' | 'disabled' = 'primary'
    if (props.disabled) {
      variant = 'disabled'
    } else if (props.danger) {
      variant = 'danger'
    }
    return variant
  }

  return (
    <button
      classList={{}}
      class={`${classes(getVariant())} ${local.class ? local.class : ''}`}
      onClick={(event) => props.onClick?.(event)}
      {...others}
    >
      {props.text}
      {props.children}
    </button>
  )
}
