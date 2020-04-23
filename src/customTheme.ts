import { theme, ITheme, ColorHues } from '@chakra-ui/core/dist';

type CustomColors = ITheme['colors'] & { brand: ColorHues };

type ICustomTheme = Omit<ITheme, 'colors'> & { colors: CustomColors };

const customTheme: ICustomTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: { ...theme.colors.purple },
  },
};

export default customTheme;
