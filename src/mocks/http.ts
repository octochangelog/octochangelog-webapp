/**
 * @fileoverview Workaround for msw with Next.js App router, based on:
 * https://github.com/mswjs/msw/issues/1644#issuecomment-1750722052
 */

import { createMiddleware } from '@mswjs/http-middleware'
import cors from 'cors'
import express from 'express'

import { handlers } from './handlers'

const app = express()
const port = 9090

app.use(
	cors({
		origin: '/./',
		optionsSuccessStatus: 200,
		credentials: true,
	}),
)
app.use(express.json())
app.use(createMiddleware(...handlers))
app.get('/', (_, res) => {
	res.status(200).send('All good')
})
app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Mock server is running on port "${port}"`)
})
