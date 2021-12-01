it('should display corresponding information', () => {
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

  cy.findByRole('img', { name: /powered by vercel logo/i })

  // TODO: Add test that checks if the Vercel img has the correct href, should be: https://vercel.com/?utm_source=octoclairvoyant-team&utm_campaign=oss
})

it('should have a working link to comparator page', () => {
  cy.visit('/')

  cy.findByRole('button', { name: 'Try me now!' }).click()

  cy.url().should('equal', `${Cypress.config().baseUrl}/comparator`)
})
export {}
