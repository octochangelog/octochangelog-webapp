// Docs: https://docs.happo.io/docs/configuration
import { RemoteBrowserTarget } from 'happo.io'

const DESKTOP_VIEWPORT = '1024x768'
const MOBILE_VIEWPORT = '320x640'

const happoConfig = {
	apiKey: process.env.HAPPO_API_KEY,
	apiSecret: process.env.HAPPO_API_SECRET,
	targets: {
		'Chrome - Desktop': new RemoteBrowserTarget('chrome', {
			viewport: DESKTOP_VIEWPORT,
			useFullPageFallbackForTallScreenshots: false,
		}),
		'Firefox - Desktop': new RemoteBrowserTarget('firefox', {
			viewport: DESKTOP_VIEWPORT,
			useFullPageFallbackForTallScreenshots: false,
		}),
		'Chrome - Mobile': new RemoteBrowserTarget('chrome', {
			viewport: MOBILE_VIEWPORT,
			useFullPageFallbackForTallScreenshots: false,
		}),
		'Safari - Mobile': new RemoteBrowserTarget('safari', {
			viewport: MOBILE_VIEWPORT,
			useFullPageFallbackForTallScreenshots: false,
		}),
	},
}

export default happoConfig
