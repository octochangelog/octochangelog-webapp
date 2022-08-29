async function initMocks() {
	const isServerEnv = typeof window === 'undefined'

	if (isServerEnv) {
		const { server } = await import('./server')
		server.listen()
	} else {
		const { worker } = await import('./browser')
		void worker.start()
	}
}

void initMocks()

export {}
