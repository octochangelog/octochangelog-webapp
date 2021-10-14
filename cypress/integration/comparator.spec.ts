it('should show expected results when using standard query string', () => {
  cy.visit(
    '/?repo=testing-library%2Fdom-testing-library&from=v6.16.0&to=v8.1.0'
  )

  // Confirm repository name is displayed
  // TOOD: Check correct href: https://github.com/testing-library/dom-testing-library

  cy.findByRole('link', { name: /dom testing library/i }).should(
    'have.attr',
    'href',
    'https://github.com/testing-library/dom-testing-library'
  )

  // Confirm from and to version range is displayed

  cy.findByRole('heading', {
    name: /changes from v6\.16\.0 to v8\.1\.0/i,
  })

  cy.findByRole('heading', {
    level: 2,
    name: /breaking changes/i,
  })

  cy.contains('span', 'v7.0.0')

  cy.findByRole('heading', { level: 5, name: /drop node 8/i })

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

// TODO: Write new test that fills out the form so that it ends up with the standard comparator query, to confirm our form is functional.

// Keep the export {} braces here!

export {}
