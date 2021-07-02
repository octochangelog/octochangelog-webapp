import { extendTheme } from '@chakra-ui/react'

type ColorHues = {
  '50': string
  '100': string
  '200': string
  '300': string
  '400': string
  '500': string
  '600': string
  '700': string
  '800': string
  '900': string
}

const primaryColor: ColorHues = {
  50: '#ffe8ff',
  100: '#efc2f0',
  200: '#e09ce3',
  300: '#d375d7',
  400: '#c54fca',
  500: '#ac35b0',
  600: '#87288a',
  700: '#601c63',
  800: '#3b0f3d',
  900: '#180319',
}

const blueColor: ColorHues = {
  50: '#def8ff',
  100: '#b8e6f7',
  200: '#90d4ee',
  300: '#66c3e5',
  400: '#3fb2dd',
  500: '#2898c4',
  600: '#1a7699',
  700: '#0c556e',
  800: '#003445',
  900: '#00131b',
}

const customTheme = extendTheme({
  colors: {
    blue: blueColor,
    primary: primaryColor,
    secondary: blueColor,
  },
  fonts: {
    heading: '"Inter", sans-serif;',
    body: '"Inter", sans-serif;',
    mono: '"Roboto", monospace;',
  },
  styles: {
    global: {
      'html, body, #__next': { height: '100%' },
    },
  },
})

export default customTheme
