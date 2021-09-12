it('has working link to comparator page', () => {
  cy.visit('/')

  cy.contains('Try me now!').click()

  cy.url().should('equal', 'http://localhost:3000/comparator')
})

export {}
