it('should display corresponding information', () => {
  cy.eyesOpen()
  cy.visit('/')

  cy.title().should(
    'equal',
    'Octoclairvoyant: Compare GitHub changelogs across multiple releases'
  )

  cy.findByRole('heading', { level: 1, name: 'Octoclairvoyant' }).should(
    'exist'
  )

  cy.findByRole('heading', {
    level: 2,
    name: 'Compare GitHub changelogs across multiple releases',
  }).should('exist')

  cy.findByAltText(/A purple octopus reading a crystal ball/i)
    .should('have.attr', 'src')
    .should('include', 'mascot-logo')

  cy.findByRole('heading', {
    level: 3,
    name: 'Features',
  }).should('exist')

  cy.contains('footer', 'Created with')
  cy.contains('footer', 'by Mario')

  cy.findByRole('link', { name: /mario/i }).should(
    'have.attr',
    'href',
    'https://mario.dev/'
  )

  cy.findByRole('link', {
    name: /octoclairvoyant repository on github/i,
  }).should(
    'have.attr',
    'href',
    'https://github.com/octoclairvoyant/octoclairvoyant-webapp'
  )

  // we first query the link
  cy.findByRole('link', { name: /powered by vercel/i })
    // and check it has the proper href
    .should(
      'have.attr',
      'href',
      'https://vercel.com/?utm_source=octoclairvoyant-team&utm_campaign=oss'
    )
    // now, since `should` returns a Chainable, we can chain it with `within`, which allows us to query
    // for something inside the previous element
    .within(() => {
      // the image is gonna be searched within the link, so we can make sure the logo is part of the link!
      cy.findByRole('img', { name: /powered by vercel logo/i })
    })
  cy.eyesCheckWindow()
  cy.eyesClose()
})

it('should have a working link to comparator page', () => {
  cy.visit('/')

  cy.findByRole('button', { name: 'Try me now!' }).click()

  cy.url().should('equal', `${Cypress.config().baseUrl}/comparator`)
})
export {}
