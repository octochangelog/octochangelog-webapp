const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production'

const REPO_URL = 'https://github.com/octoclairvoyant/octoclairvoyant-webapp'

const SITE_TITLE = 'Octoclairvoyant'

const BRIEF_DESCRIPTION = 'Compare GitHub changelogs in a single view'

const FULL_DESCRIPTION =
	'Compare GitHub changelogs across multiple releases in a single view'

const HIGH_PRIORITY_GROUP_TITLES = ['breaking changes', 'features', 'bug fixes']

const LOW_PRIORITY_GROUP_TITLES = ['others', 'credits', 'thanks', 'artifacts']

export {
	IS_PRODUCTION_MODE,
	REPO_URL,
	SITE_TITLE,
	BRIEF_DESCRIPTION,
	FULL_DESCRIPTION,
	HIGH_PRIORITY_GROUP_TITLES,
	LOW_PRIORITY_GROUP_TITLES,
}
