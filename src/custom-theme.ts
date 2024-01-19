import { type ColorHues, type ThemeConfig, type Theme } from '@chakra-ui/react'
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { type Dict } from '@chakra-ui/utils'

interface SemanticToken {
	default: string
	_dark: string
}

/**
 * The coolGray palette contains all the shades of gray we'll use in the app.
 * Example uses: body text, headings, changelog text, page background.
 */
const coolGray: ColorHues = {
	'50': '#F9FAFB',
	'100': '#F3F4F6',
	'200': '#E5E7EB',
	'300': '#D1D5DB',
	'400': '#9CA3AF',
	'500': '#6B7280',
	'600': '#4B5563',
	'700': '#374151',
	'800': '#1F2937',
	'900': '#111827',
}

/**
 * The Fuchsia palette is our primary accent.
 * Example uses: call-to-action button, primary action button.
 */
const fuchsia: ColorHues = {
	'50': '#FDF4FF',
	'100': '#FAE8FF',
	'200': '#F5D0FE',
	'300': '#F0ABFC',
	'400': '#E879F9',
	'500': '#D946EF',
	'600': '#C026D3',
	'700': '#A21CAF',
	'800': '#86198F',
	'900': '#701A75',
}

/**
 * The Sky palette is our secondary accent.
 * Example uses: secondary button, version badge.
 */
const sky: ColorHues = {
	'50': '#F0F9FF',
	'100': '#E0F2FE',
	'200': '#BAE6FD',
	'300': '#7DD3FC',
	'400': '#38BDF8',
	'500': '#0EA5E9',
	'600': '#0284C7',
	'700': '#0369A1',
	'800': '#075985',
	'900': '#0C4A6E',
}

// These are our normal text colors for light and dark modes.
// Do NOT use for text that goes on a colored background.
// Text on colored backgrounds should use a suitable hue from the background color scheme.

const primaryTextLightMode = coolGray['900']
const secondaryTextLightMode = coolGray['700']
const tertiaryTextLightMode = coolGray['600']

const primaryTextDarkMode = coolGray['50']
const secondaryTextDarkMode = coolGray['300']
const tertiaryTextDarkMode = coolGray['400']

const monochrome1: SemanticToken = {
	default: 'black',
	_dark: 'white',
}
const monochrome2: SemanticToken = {
	default: 'gray.900',
	_dark: 'gray.50',
}

const monochrome3: SemanticToken = {
	default: 'gray.800',
	_dark: 'gray.100',
}
const monochrome4: SemanticToken = {
	default: 'gray.700',
	_dark: 'gray.200',
}
const monochrome5: SemanticToken = {
	default: 'gray.600',
	_dark: 'gray.300',
}

function invertSemanticToken(token: SemanticToken): SemanticToken {
	const { default: defaultValue, _dark } = token
	return {
		default: _dark,
		_dark: defaultValue,
	}
}

const themeConfig: ThemeConfig = {
	useSystemColorMode: !!process.env.NEXT_PUBLIC_FEATURE_FLAG_COLOR_MODE,
}

type CustomTheme = Theme & {
	colors: { primary: ColorHues; secondary: ColorHues }
}

const customTheme = extendTheme(
	{
		colors: {
			primary: fuchsia,
			secondary: sky,
			gray: coolGray,
		},
		semanticTokens: {
			colors: {
				primaryText: {
					default: primaryTextLightMode,
					_dark: primaryTextDarkMode,
				},
				secondaryText: {
					default: secondaryTextLightMode,
					_dark: secondaryTextDarkMode,
				},
				tertiaryText: {
					default: tertiaryTextLightMode,
					_dark: tertiaryTextDarkMode,
				},
				monochrome1,
				monochrome2,
				monochrome3,
				monochrome4,
				monochrome5,
				monochromeInverted1: invertSemanticToken(monochrome1),
				monochromeInverted2: invertSemanticToken(monochrome2),
				monochromeInverted3: invertSemanticToken(monochrome3),
				monochromeInverted4: invertSemanticToken(monochrome4),
				monochromeInverted5: invertSemanticToken(monochrome5),
				background1: invertSemanticToken(monochrome1),
				background2: invertSemanticToken(monochrome2),
				background3: invertSemanticToken(monochrome3),
			},
		},
		fonts: {
			heading: 'var(--font-inter)',
			body: 'var(--font-inter)',
			mono: 'var(--font-roboto-mono)',
		},
		styles: {
			global: {
				'html, body, #__next': { height: '100%' },
			},
		},
		config: themeConfig,
		components: {
			Link: {
				baseStyle: (props: Dict) => {
					return { color: mode('primary.700', 'primary.400')(props) }
				},
			},
			Button: {
				variants: {
					cta: (props: Dict) => {
						return {
							fontWeight: 'black',
							fontSize: '2xl',
							letterSpacing: 'tight',
							p: 6,
							size: 'lg',
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
							borderRadius: '2xl',
							bg: mode('primary.900', 'primary.200')(props),
							color: mode('primary.50', 'primary.900')(props),
							_hover: {
								bg: mode('primary.700', 'primary.100')(props),
								cursor: 'pointer',
							},
							_active: {
								bg: mode('primary.900', 'primary.200')(props),
								boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25) !important',
							},
						}
					},
				},
			},
			Container: {
				variants: {
					fluid: {
						maxWidth: 'container.xl',
					},
				},
			},
		},
	},
	withDefaultColorScheme({ colorScheme: 'primary' }),
	withDefaultColorScheme({
		colorScheme: 'gray',
		components: ['Code', 'BlockQuote'],
	}),
) as CustomTheme

export default customTheme
