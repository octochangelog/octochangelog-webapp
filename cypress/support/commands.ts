// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
//
// For more info about typing custom commands,
// read more here:
// https://docs.cypress.io/guides/tooling/typescript-support#Types-for-custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// This manual reference shouldn't be necessary by
// including "@testing-library/cypress" within types property in cypress/tsconfig.json,
// but it's not working fine so this is a workaround while we try to fix it.
/// <reference types="@testing-library/cypress" />
import '@testing-library/cypress/add-commands'
import 'happo-cypress'
