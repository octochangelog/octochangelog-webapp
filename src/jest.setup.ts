import { beforeAll, afterEach, afterAll } from '@jest/globals'

import { server } from '~/mocks/server'

beforeAll(() => {
	server.listen()
})

afterEach(() => {
	server.resetHandlers()
})

afterAll(() => {
	server.close()
})
