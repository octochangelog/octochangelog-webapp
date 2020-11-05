import { theme, ITheme, ColorHues } from '@chakra-ui/core/dist'

type CustomColors = ITheme['colors'] & {
  primary: ColorHues
  secondary: ColorHues
}

type ICustomTheme = Omit<ITheme, 'colors'> & { colors: CustomColors }

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

const customTheme: ICustomTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    blue: blueColor,
    primary: primaryColor,
    secondary: blueColor,
  },
  fonts: {
    ...theme.fonts,
    heading: 'Open Sans, sans-serif;',
  },
}

export default customTheme
