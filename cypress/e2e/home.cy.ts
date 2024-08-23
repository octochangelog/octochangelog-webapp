it('should display corresponding information', () => {
	cy.visit('/');
	cy.title().should('equal', 'Octochangelog');
	cy.metaDescriptionShouldEqual(
		'Compare GitHub changelogs across multiple releases in a single view'
	);

	cy.findByRole('heading', { level: 1, name: 'Octochangelog' }).should('exist');

	cy.findByRole('heading', {
		level: 2,
		name: 'Compare GitHub changelogs in a single view.',
	}).should('exist');

	cy.findByRole('main').within(() => {
		cy.findByRole('presentation')
			.should('have.attr', 'src')
			.and('contain', 'mascot-icon');
	});

	cy.findByRole('heading', {
		level: 3,
		name: 'Compare releases easily',
	}).should('exist');
	cy.findByRole('heading', {
		level: 3,
		name: 'Share changelogs',
	}).should('exist');
	cy.findByRole('heading', {
		level: 3,
		name: "Don't miss breaking changes",
	}).should('exist');
	cy.findByRole('heading', {
		level: 3,
		name: 'No manual sorting',
	}).should('exist');
	cy.findByRole('heading', {
		level: 3,
		name: 'Changes per version',
	}).should('exist');

	cy.contains('footer', 'Created with');
	cy.contains('footer', 'by Mario');

	cy.findByRole('link', { name: /mario/i }).should(
		'have.attr',
		'href',
		'https://mario.dev/'
	);

	cy.findByRole('link', {
		name: /octochangelog repository on github/i,
	}).should(
		'have.attr',
		'href',
		'https://github.com/octochangelog/octochangelog-webapp'
	);

	// we first query the link
	cy.findByRole('link', { name: /powered by vercel/i })
		// and check it has the proper href
		.should(
			'have.attr',
			'href',
			'https://vercel.com/?utm_source=octochangelog-team&utm_campaign=oss'
		)
		// now, since `should` returns a Chainable, we can chain it with `within`, which allows us to query
		// for something inside the previous element
		.within(() => {
			// the image is gonna be searched within the link, so we can make sure the logo is part of the link!
			cy.findByRole('presentation', { name: '' }).should('have.attr', 'src');
		});

	cy.get('body').happoScreenshot({ component: 'Home page' });
});

it('should have a working link to comparator page', () => {
	cy.visit('/');

	cy.findByRole('link', { name: 'Try me now!' }).click();

	cy.url().should('equal', `${Cypress.config().baseUrl || ''}/compare`);
});
