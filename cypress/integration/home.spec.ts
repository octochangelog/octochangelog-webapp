it('should show correct page title', () => {
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
})

it('should display h2 heading with correct text', () => {
  cy.visit('/')

  cy.findByRole('heading', {
    level: 2,
    name: 'Compare GitHub changelogs across multiple releases',
  }).should('exist')
})

it('should display h3 heading with correct text', () => {
  cy.visit('/')

  cy.findByRole('heading', {
    level: 3,
    name: 'Features',
  }).should('exist')
})

// TODO: Write test that checks for image being present (alt text is already checked via some other linter).

it('should have a working link to comparator page', () => {
  cy.visit('/')

  cy.findByRole('button', { name: 'Try me now!' }).click()

  cy.url().should('equal', 'http://localhost:3000/comparator')
})

// Ask Belco how to get the footer with .findByRole, I can't get it working with footer or with contentinfo.

it('should display footer text', () => {
  cy.visit('/')

  cy.contains('footer', 'Created with')
  cy.contains('footer', 'by Mario')
})

// NOTE: Keep the export {} function below, do not remove it!

export {}
