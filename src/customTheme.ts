import { theme, ITheme, ColorHues } from '@chakra-ui/core/dist';

type CustomColors = ITheme['colors'] & {
  primary: ColorHues;
  secondary: ColorHues;
};

type ICustomTheme = Omit<ITheme, 'colors'> & { colors: CustomColors };

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
};

const secondaryColor: ColorHues = {
  50: '#fdf8df',
  100: '#f5eaba',
  200: '#ecdb91',
  300: '#e5cd67',
  400: '#ddbf3d',
  500: '#c4a524',
  600: '#98811a',
  700: '#6d5c11',
  800: '#413706',
  900: '#191200',
};

const customTheme: ICustomTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: primaryColor,
    secondary: secondaryColor,
  },
  fonts: {
    ...theme.fonts,
    heading: 'Open Sans, sans-serif;',
  },
};

export default customTheme;
