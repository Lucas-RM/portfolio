type PaginationProps = {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        className="rounded bg-primary px-4 py-2 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:bg-accent disabled:text-white disabled:opacity-40"
        disabled={currentPage === 0}
        onClick={onPrevious}
        type="button"
      >
        Anterior
      </button>
      <div className="rounded bg-blue-950/80 px-2 py-1">
        <p className="font-medium text-md">
          {currentPage + 1}/{totalPages}
        </p>
      </div>
      <button
        className="rounded bg-primary px-4 py-2 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:bg-accent disabled:text-white disabled:opacity-40"
        disabled={currentPage === totalPages - 1}
        onClick={onNext}
        type="button"
      >
        Próximo
      </button>
    </div>
  )
}
