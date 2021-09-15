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

import { GITHUB_STORAGE_KEY } from '~/github-client'
import './commands'

// Set GitHub token for all tests
before(() => {
  const githubTestingAccessToken =
    Cypress.env('GITHUB_TESTING_ACCESS_TOKEN') || 'none'
  cy.setCookie(GITHUB_STORAGE_KEY, githubTestingAccessToken)
})
Cypress.Cookies.defaults({ preserve: GITHUB_STORAGE_KEY })
