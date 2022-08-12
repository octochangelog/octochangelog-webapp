const { RemoteBrowserTarget } = require('happo.io')

const DESKTOP_VIEWPORT = '1024x768'
const MOBILE_VIEWPORT = '320x640'

module.exports = {
	apiKey: process.env.HAPPO_API_KEY,
	apiSecret: process.env.HAPPO_API_SECRET,
	targets: {
		'Chrome - Desktop': new RemoteBrowserTarget('chrome', {
			viewport: DESKTOP_VIEWPORT,
		}),
		'Firefox - Desktop': new RemoteBrowserTarget('firefox', {
			viewport: DESKTOP_VIEWPORT,
		}),
		'Chrome - Mobile': new RemoteBrowserTarget('chrome', {
			viewport: MOBILE_VIEWPORT,
		}),
		'Safari - Mobile': new RemoteBrowserTarget('safari', {
			viewport: MOBILE_VIEWPORT,
		}),
	},
}
