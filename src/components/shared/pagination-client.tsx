'use client'

import { useSearchParams } from 'next/navigation'

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui'

interface Props {
	currentPage: number
	totalPages: number
}

export function PaginationClient({ currentPage, totalPages }: Props) {
	const searchParams = useSearchParams()

	const createPageLink = (page: number) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('page', String(page))
		return `?${params.toString()}`
	}

	if (totalPages <= 1) return null

	return (
		<Pagination>
			<PaginationContent>
				{currentPage > 1 && (
					<PaginationItem className="rounded-md bg-neutral-700">
						<PaginationPrevious href={createPageLink(currentPage - 1)} />
					</PaginationItem>
				)}

				{Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
					let pageNumber: number

					if (totalPages <= 5) {
						pageNumber = index + 1
					} else if (currentPage <= 3) {
						pageNumber = index + 1
					} else if (currentPage >= totalPages - 2) {
						pageNumber = totalPages - 4 + index
					} else {
						pageNumber = currentPage - 2 + index
					}

					return (
						<PaginationItem key={pageNumber} className="rounded-md bg-neutral-700">
							<PaginationLink href={createPageLink(pageNumber)} isActive={currentPage === pageNumber}>
								{pageNumber}
							</PaginationLink>
						</PaginationItem>
					)
				})}

				{currentPage < totalPages && (
					<PaginationItem className="rounded-md bg-neutral-700">
						<PaginationNext href={createPageLink(currentPage + 1)} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	)
}
