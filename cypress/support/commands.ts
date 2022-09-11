// ***********************************************
// For more info about typing custom commands,
// read more here:
// https://docs.cypress.io/guides/tooling/typescript-support#Types-for-custom-commands
// ***********************************************

// This manual reference shouldn't be necessary by
// including "@testing-library/cypress" within types property in cypress/tsconfig.json,
// but it's not working fine so this is a workaround while we try to fix it.
/// <reference types="@testing-library/cypress" />
import '@testing-library/cypress/add-commands'
import 'happo-cypress'

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to wait until API mocking with MSW is ready.
			 *
			 * Useful when testing early requests (like comparator-context), or
			 * before overriding an existing mocked request.
			 */
			waitForApiMocking(): Chainable
		}
	}
}

Cypress.Commands.add('waitForApiMocking', () => {
	return cy.window().should('have.property', 'isApiMockingReady', true)
})
