/**
 * This test is considered the happy and critical path of the app.
 *
 * We are not stubbing the GitHub API for it, so it works as an E2E,
 * testing our webapp works fine against the actual server.
 *
 * Cypress recommends to have one test around the happy path of a feature
 * connected to the real server:
 * https://docs.cypress.io/guides/guides/network-requests#Use-Server-Responses
 */
it('should show changelog results when filling the form', () => {
	cy.visit('/comparator')

	cy.findByRole('textbox', { name: /enter repository name/i }).type(
		'dom testing library'
	)
	cy.wait(4000) // eslint-disable-line cypress/no-unnecessary-waiting

	cy.findByRole('listbox', { name: /enter repository name/i })
		.findByText('testing-library/dom-testing-library')
		.click()

	cy.findByRole('combobox', { name: /select from release/i }).select('v6.16.0')

	cy.findByRole('combobox', { name: /select to release/i }).select('v8.1.0')

	cy.findByRole('link', { name: 'dom-testing-library' }).should(
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

	cy.findAllByText('v7.0.0', { ignore: 'option' }).should('have.length', 2)

	cy.findByRole('heading', { level: 5, name: /drop node 8/i })

	cy.findByText(
		/node 10 or greater is required\. node 8 is \(\) \(\), closes/i
	).should('have.length', 1)

	cy.findByRole('link', { name: /out of lts/i }).should(
		'have.attr',
		'href',
		'https://nodejs.org/en/about/releases/'
	)

	cy.findByRole('link', { name: /#459/i }).should(
		'have.attr',
		'href',
		'https://github.com/testing-library/dom-testing-library/issues/459'
	)

	cy.findByRole('link', { name: /c3ab843/i }).should(
		'have.attr',
		'href',
		'https://github.com/testing-library/dom-testing-library/commit/c3ab843c292484428f045671ea22cbb30eb70559'
	)

	cy.findByRole('link', { name: /#430/i }).should(
		'have.attr',
		'href',
		'https://github.com/testing-library/dom-testing-library/issues/430'
	)

	// Check if the code block renders with the diff display
	cy.findByText(/- "test": "react-scripts test --env=dom"/i)
	cy.findByText(
		/\+ "test": "react-scripts test --env=jest-environment-jsdom-sixteen"/i
	)

	cy.findByRole('heading', { level: 2, name: /features/i })
	cy.findByRole('heading', { level: 2, name: /bug fixes/i })
	cy.findByRole('heading', { level: 2, name: /reverts/i })
	cy.findByRole('heading', { level: 2, name: /recommendations/i })
	cy.findByRole('heading', { level: 2, name: /chore/i })
	cy.get('body').happoScreenshot({
		component: 'Comparator page: basic changelog from filled form',
	})
})

it('should show changelog results when preloading from URL', () => {
	cy.intercept(
		'GET',
		'https://api.github.com/repos/testing-library/dom-testing-library',
		{ fixture: 'repositories/dom-testing-library.json' }
	).as('getRepo')

	cy.intercept(
		'GET',
		'https://api.github.com/repos/testing-library/dom-testing-library/releases?per_page=100**',
		(req) => {
			const page = Number(req.query.page) || 1
			const headers: { link: string } | undefined = (() => {
				const isLastPageReached = page >= 3
				if (!isLastPageReached) {
					const nextPage = page + 1
					return {
						link: `<https://api.github.com/repos/testing-library/dom-testing-library/releases?per_page=100&page=${nextPage}>; rel="next"`,
					}
				}
				return undefined
			})()

			req.alias = `getReleasesPage${page}`
			req.reply({
				fixture: `releases/dom-testing-library/page${page}.json`,
				headers,
			})
		}
	)

	cy.visit(
		'/comparator?repo=testing-library%2Fdom-testing-library&from=v6.16.0&to=v8.1.0'
	)

	cy.wait('@getRepo')
	cy.wait('@getReleasesPage3')

	// Confirm repository name is displayed
	cy.findByRole('link', { name: 'dom-testing-library' }).should(
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

	cy.findAllByText('v7.0.0', { ignore: 'option' }).should('have.length', 2)
	cy.findByRole('heading', { level: 5, name: /drop node 8/i })
	cy.findByText(
		/node 10 or greater is required\. node 8 is \(\) \(\), closes/i
	).should('have.length', 1)
	cy.findByRole('link', { name: /out of lts/i }).should(
		'have.attr',
		'href',
		'https://nodejs.org/en/about/releases/'
	)
	cy.findByRole('link', { name: /#459/i }).should(
		'have.attr',
		'href',
		'https://github.com/testing-library/dom-testing-library/issues/459'
	)
	cy.findByRole('link', { name: /c3ab843/i }).should(
		'have.attr',
		'href',
		'https://github.com/testing-library/dom-testing-library/commit/c3ab843c292484428f045671ea22cbb30eb70559'
	)
	cy.findByRole('link', { name: /#430/i }).should(
		'have.attr',
		'href',
		'https://github.com/testing-library/dom-testing-library/issues/430'
	)

	// Check if the code block renders with the diff display
	cy.findByText(/- "test": "react-scripts test --env=dom"/i)
	cy.findByText(
		/\+ "test": "react-scripts test --env=jest-environment-jsdom-sixteen"/i
	)

	cy.findByText(/waitForElement was still in use/) // text from v7.0.1 release
	cy.findByRole('heading', { level: 2, name: /features/i })
	cy.findByRole('heading', { level: 2, name: /bug fixes/i })
	cy.findByRole('heading', { level: 2, name: /reverts/i })
	cy.findByRole('heading', { level: 2, name: /recommendations/i })
	cy.findByRole('heading', { level: 2, name: /chore/i })
})

it('should show changelog results when preloading from URL with "latest"', () => {
	// TODO: stub this one
	cy.visit(
		'/comparator?repo=testing-library%2Fdom-testing-library&from=v8.11.0&to=latest'
	)

	cy.findByRole('link', { name: 'dom-testing-library' }).should(
		'have.attr',
		'href',
		'https://github.com/testing-library/dom-testing-library'
	)
	cy.findByRole('heading', { name: 'Changes from v8.11.0 to latest' })

	cy.findByRole('heading', { level: 2, name: /features/i })
	cy.findByRole('heading', { level: 2, name: /bug fixes/i })

	cy.findByText(/Don't queue microtasks after condition is met/)

	cy.get('body').happoScreenshot({
		component:
			'Comparator page: basic changelog from preloaded URL with "latest"',
	})
})

// TODO: add test for renovate needing to fetch more than 10 pages of releases (test for issue #741)
