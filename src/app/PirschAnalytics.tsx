import Script from 'next/script'

export function PirschAnalytics() {
	return (
		<Script
			defer
			src="https://api.pirsch.io/pa.js"
			id="pianjs"
			data-code="geVGERz2k178LNAM7SpCAvB9mPcQFeKB"
		/>
	)
}
