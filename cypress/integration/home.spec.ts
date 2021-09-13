it('should should display corresponding information', () => {
  cy.visit('/')

  cy.title().should(
    'equal',
    'Homepage | Octoclairvoyant: Compare GitHub changelogs across multiple releases'
  )
})

it('should display h1 heading with correct text', () => {
  cy.visit('/')

  cy.findByRole('heading', { level: 1, name: 'Octoclairvoyant' }).should(
    'exist'
  )

  cy.findByRole('heading', {
    level: 2,
    name: 'Compare GitHub changelogs across multiple releases',
  }).should('exist')

  // TODO: check 'src' property of the found img tag is correct
  // NOTE: Testing playground suggests: cy.findByRole('img', { name: /octoclairvoyant reading a crystal ball/i })
  cy.findByAltText(/octoclairvoyant reading a crystal ball/i).should('exist')

  cy.findByRole('heading', {
    level: 3,
    name: 'Features',
  }).should('exist')

  cy.contains('footer', 'Created with')
  cy.contains('footer', 'by Mario')
})

it('should have a working link to comparator page', () => {
  cy.visit('/')

  cy.findByRole('button', { name: 'Try me now!' }).click()

  cy.url().should('equal', 'http://localhost:3000/comparator')
})

export {}
