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

  cy.findByAltText(/octoclairvoyant reading a crystal ball/i)
    .should('have.attr', 'src')
    .should('include', 'mascot-logo')

  cy.findByAltText(/octoclairvoyant reading a crystal ball/i).should(
    'have.attr',
    'src',
    '/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fmascot-logo.8655d29c013a9c688dd05a79c6b04187.png&w=1200&q=100'
  )

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
