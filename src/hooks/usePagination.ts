import { useMemo, useState } from 'react'

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage)
  }, [items.length, itemsPerPage])

  const paginatedItems = useMemo(() => {
    const start = currentPage * itemsPerPage
    const end = start + itemsPerPage
    return items.slice(start, end)
  }, [items, currentPage, itemsPerPage])

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }

  const resetPage = () => setCurrentPage(0)

  return {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    resetPage,
  }
}
