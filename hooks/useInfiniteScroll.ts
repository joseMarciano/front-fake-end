import { useEffect, useState } from "react"

export type Page = {
    hasNext: boolean,
    offset: number,
    limit: number,
    total: number,
    content: any[]
}

const DEFAULT_PAGE_VALUE = 20

export function useInfiniteScroll(search: (params: Omit<Page, 'total' | 'content' | 'hasNext'>) => Promise<Page>): Pick<Page, 'limit' | 'offset'> {
    const [keepSearching, setKeepSearching] = useState(true)
    const [offset, setOffset] = useState(DEFAULT_PAGE_VALUE)
    const [limit, setLimit] = useState(DEFAULT_PAGE_VALUE)
    const [isSearching, setIsSearching] = useState(false)

    const shouldExecuteSearch = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement
        return !isSearching && keepSearching && (scrollTop + clientHeight >= (scrollHeight / 2))
    }

    const handlePagenation = (): void => {
        if (shouldExecuteSearch()) {
            setIsSearching(true)
            search({ offset, limit })
                .then((response) => {
                    setKeepSearching(response.content.length <= response.total)
                    setOffset((response?.offset || 0) + (response?.limit || DEFAULT_PAGE_VALUE))
                    setLimit(response?.limit || DEFAULT_PAGE_VALUE)
                }).finally(() => setIsSearching(false))
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handlePagenation)
    })


    useEffect(() => {
        return () => {
            window.removeEventListener('scroll', handlePagenation)
        }
    })


    return {
        limit,
        offset
    }

}