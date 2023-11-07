import type { Release } from '~/models'

import { renovateReleasesPage1 } from './page1'
import { renovateReleasesPage10 } from './page10'
import { renovateReleasesPage11 } from './page11'
import { renovateReleasesPage12 } from './page12'
import { renovateReleasesPage2 } from './page2'
import { renovateReleasesPage3 } from './page3'
import { renovateReleasesPage4 } from './page4'
import { renovateReleasesPage5 } from './page5'
import { renovateReleasesPage6 } from './page6'
import { renovateReleasesPage7 } from './page7'
import { renovateReleasesPage8 } from './page8'
import { renovateReleasesPage9 } from './page9'

/**
 * 1,200 releases: from "32.172.2" to "25.26.3"
 *
 * This generates 12 pages of 100 items.
 */
const renovateReleases: Array<Release> = [
	...renovateReleasesPage1,
	...renovateReleasesPage2,
	...renovateReleasesPage3,
	...renovateReleasesPage4,
	...renovateReleasesPage5,
	...renovateReleasesPage6,
	...renovateReleasesPage7,
	...renovateReleasesPage8,
	...renovateReleasesPage9,
	...renovateReleasesPage10,
	...renovateReleasesPage11,
	...renovateReleasesPage12,
]

export { renovateReleases }
