it('should display custom 404 page when not found', () => {
	cy.visit('/not-existing-page', { failOnStatusCode: false })

	cy.title().should('equal', 'Not Found | Octoclairvoyant')

	cy.findByRole('heading', {
		name: 'This page could not be found.',
	}).should('exist')

	cy.findByText('Octoclairvoyant cannot divine the page you wanted.').should(
		'exist'
	)

	cy.findByRole('main').within(() => {
		cy.findByRole('img')
			.should('have.attr', 'src')
			.and('contain', 'mascot-icon')
	})

	cy.findByRole('link', { name: /go to comparator/i }).should(
		'have.attr',
		'href',
		'/comparator'
	)

	cy.findByRole('link', { name: 'Or go to homepage' }).should(
		'have.attr',
		'href',
		'/'
	)
})
