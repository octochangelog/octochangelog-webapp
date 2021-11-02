it('should display custom 404 page when not found', () => {
  cy.visit('/not-existing-page', { failOnStatusCode: false })

  cy.title().should('equal', '404 - Not Found | Octoclairvoyant')

  cy.findByRole('heading', {
    name: 'This page could not be found.',
  }).should('exist')

  cy.findByText('Octoclairvoyant cannot divine the page you wanted.').should(
    'exist'
  )

  cy.findByRole('button', { name: 'Go to comparator' }).click()
  cy.url().should('equal', `${Cypress.config().baseUrl}/comparator`)

  cy.go('back')

  cy.findByRole('link', { name: 'Or go to homepage' }).click()
  cy.url().should('equal', `${Cypress.config().baseUrl}/`)
})

export {}
