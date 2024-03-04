// ***********************************************************
// This example support/index.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

Cypress.on('uncaught:exception', (error) => {
	// Ignore hydration errors
	// https://reactjs.org/docs/error-decoder.html?invariant=418
	if (error.message.includes('Minified React error #418')) {
		// eslint-disable-next-line no-console
		console.warn(
			'Hydration failed because the initial UI does not match what was rendered on the server.'
		);
		return false;
	}

	// Ignore hydration errors
	// https://reactjs.org/docs/error-decoder.html?invariant=423
	if (error.message.includes('Minified React error #423')) {
		// eslint-disable-next-line no-console
		console.warn(
			'There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.'
		);
		return false;
	}

	// We still want to ensure there are no other unexpected errors, so we let them fail the test.
});
