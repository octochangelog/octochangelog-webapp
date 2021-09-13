// TODO: implement e2e for comparator here

// Write new test that fills out the form so that it ends up with the standard comparator query, to confirm our form is functional.

// Ask Belco how to get cy.findByText(/Changes from v6.16.0 to v8.1.0/i).should('exist') to wait for the result.
// We should mock/fixture the result somehow, as we're expecting the same results each time... and it's really easy to hit the API limits unauthenticated.
// For now these tests do work properly, but they're not using any Testing Library queries.

it('should show expected results when using standard query string', () => {
  cy.visit(
    '/?repo=testing-library%2Fdom-testing-library&from=v6.16.0&to=v8.1.0'
  )

  // Confirm from and to version range are displayed

  cy.contains('Changes from v6.16.0 to v8.1.0')

  // Confirm versions are mentioned somewhere

  cy.contains('v6.16.0')
  cy.contains('v8.1.0')

  cy.contains('h2', 'breaking changes')

  cy.contains('span', 'v7.0.0')

  cy.contains('h5', 'Drop Node 8')
  cy.contains('p', 'Node 10 or greater is required.')
  cy.contains('a', 'out of LTS')
  cy.contains('a', '#459')
  cy.contains('a', 'c3ab843')
  cy.contains('a', '#430')

  cy.contains('pre', 'devDependencies')

  cy.contains('h2', 'features')

  cy.contains('h2', 'bug fixes')

  cy.contains('h2', 'reverts')

  cy.contains('h2', 'recommendations')

  cy.contains('h2', 'chore')
})

// Keep the export {} braces here!

export {}
