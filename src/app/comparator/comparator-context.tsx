import { CircularProgress, Flex } from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

import { octokit } from '@/github-client'
import { type ReleaseVersion, type Repository } from '@/models'
import { mapStringToRepositoryQueryParams } from '@/utils'

interface ComparatorStateContextValue {
	repository?: Repository | null
	fromVersion?: ReleaseVersion | null
	toVersion?: ReleaseVersion | null
}

interface ComparatorUpdaterContextValue {
	setRepository: (newRepository?: Repository | null) => void
	setFromVersion: (newVersion?: ReleaseVersion | null) => void
	setToVersion: (newVersion?: ReleaseVersion | null) => void
}

interface FiltersQuerystring {
	repo?: string | null
	from?: string | null
	to?: string | null
}

const ComparatorStateContext = createContext<
	ComparatorStateContextValue | undefined
>(undefined)
const ComparatorUpdaterContext = createContext<
	ComparatorUpdaterContextValue | undefined
>(undefined)

type InitStatus = 'done' | 'loading' | 'mount'

const loadingElement = (
	<Flex align="center" justify="center" height="100%">
		<CircularProgress isIndeterminate size="8" color="primary.400" />
	</Flex>
)

const ComparatorProvider = ({ children }: { children: ReactNode }) => {
	const statusRef = useRef<InitStatus>('mount')
	const [isReady, setIsReady] = useState<boolean>(false)
	const [repository, setRepository] = useState<Repository | null>(null)
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const searchParamsObject = useMemo(() => {
		return searchParams ? Object.fromEntries(searchParams.entries()) : {}
	}, [searchParams])

	const { repo, from, to } = searchParamsObject

	const setQuerystringParams = useCallback(
		(newFilters: FiltersQuerystring) => {
			const mergedFilters: FiltersQuerystring = {
				...searchParamsObject,
				...newFilters,
			}
			const newQuery = Object.fromEntries(
				Object.entries(mergedFilters).filter(([, value]) => Boolean(value)),
			)
			const newSearchParams = new URLSearchParams(newQuery)

			router.replace(`${pathname}?${newSearchParams.toString()}`)
		},
		[pathname, router, searchParamsObject],
	)

	const setSelectedRepository = useCallback(
		(newRepository?: Repository | null) => {
			setRepository(newRepository ?? null)
			setQuerystringParams({
				repo: newRepository?.full_name,
				from: null, // Clear from and to when changing repo
				to: null,
			})
		},
		[setQuerystringParams],
	)

	const setSelectedFromVersion = useCallback(
		(newFrom?: string | null) => {
			setQuerystringParams({ from: newFrom })
		},
		[setQuerystringParams],
	)

	const setSelectedToVersion = useCallback(
		(newTo?: string | null) => {
			setQuerystringParams({ to: newTo })
		},
		[setQuerystringParams],
	)

	// TODO: move this to the /comparator React Server Component
	useEffect(() => {
		const getInitialRepository = async () => {
			if (repo) {
				statusRef.current = 'loading'

				const repositoryQueryParams = mapStringToRepositoryQueryParams(repo)

				if (repositoryQueryParams.repo && repositoryQueryParams.owner) {
					const response = await octokit.repos.get(repositoryQueryParams)

					setRepository(response.data)
				}
			}

			statusRef.current = 'done'
			setIsReady(true)
		}

		if (statusRef.current === 'mount') {
			void getInitialRepository()
		}
	}, [repo])

	const stateValue = useMemo<ComparatorStateContextValue>(
		() => ({
			repository,
			fromVersion: from,
			toVersion: to,
		}),
		[from, repository, to],
	)

	const updaterValue = useMemo<ComparatorUpdaterContextValue>(
		() => ({
			setRepository: setSelectedRepository,
			setFromVersion: setSelectedFromVersion,
			setToVersion: setSelectedToVersion,
		}),
		[setSelectedFromVersion, setSelectedRepository, setSelectedToVersion],
	)

	return (
		<ComparatorStateContext.Provider value={stateValue}>
			<ComparatorUpdaterContext.Provider value={updaterValue}>
				{isReady ? children : loadingElement}
			</ComparatorUpdaterContext.Provider>
		</ComparatorStateContext.Provider>
	)
}

function useComparatorState() {
	const context = useContext(ComparatorStateContext)

	if (context === undefined) {
		throw new Error(
			'useComparatorState must be used within a ComparatorProvider',
		)
	}

	return context
}

function useComparatorUpdater() {
	const context = useContext(ComparatorUpdaterContext)

	if (context === undefined) {
		throw new Error(
			'useComparatorUpdater must be used within a ComparatorProvider',
		)
	}

	return context
}

export { ComparatorProvider, useComparatorState, useComparatorUpdater }
