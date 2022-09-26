import { beforeAll, afterEach, afterAll } from '@jest/globals'

import { server } from './mock-service-worker/server'

beforeAll(() => {
	server.listen()
})

afterEach(() => {
	server.resetHandlers()
})

afterAll(() => {
	server.close()
})
