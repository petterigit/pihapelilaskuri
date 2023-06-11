import { defineConfig, presetUno } from 'unocss'
import Color from 'color'

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      primary: {
        dark: Color('#40a02b').darken(0.3).hex(),
        DEFAULT: Color('#40a02b').hex(),
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
        DEFAULT: Color('#4c4f69').hex(),
      },
    },
  },
})
