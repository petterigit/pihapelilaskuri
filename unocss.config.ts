/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import Color from 'color'

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  theme: {
    colors: {
      primary: {
        dark: Color('#179299').darken(0.4).hex(),
        DEFAULT: Color('#179299').darken(0.1).hex(),
      },
      danger: {
        dark: Color('#d20f39').darken(0.3).hex(),
        DEFAULT: Color('#d20f39').hex(),
      },
      bg: {
        DEFAULT: Color('#eff1f5').hex(),
        surface: Color('#ccd0da').hex(),
        overlay: Color('#7c7f93').hex(),
      },
      text: {
        DEFAULT: Color('#4c4f69').darken(0.3).hex(),
      },
    },
  },
  preflights: [
    {
      getCSS: ({ theme }) => `
        * {
            border-color: ${(theme as any).colors.gray[400]} !important;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          marghin: 0;
        }

        input[type=number] {
          -moz-appearance: textfield;
        }
      `,
    },
  ],
})
