import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const getDisplayedPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 7) {
        pages.push(...Array.from({ length: 7 }, (_, i) => i + 1));
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage > 7 && currentPage <= totalPages - 6) {
        pages.push(1);
        pages.push('...');
        pages.push(...Array.from({ length: 5 }, (_, i) => currentPage - 2 + i));
        pages.push('...');
        pages.push(totalPages);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(...Array.from({ length: 7 }, (_, i) => totalPages - 7 + i + 1));
      }
    }

    return pages;
  };

  const displayedPages = getDisplayedPages();

  return (
    <BootstrapPagination className="justify-content-center my-3">
      <BootstrapPagination.Prev
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      />

      {displayedPages.map((page, index) =>
        typeof page === 'number' ? (
          <BootstrapPagination.Item
            key={index}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </BootstrapPagination.Item>
        ) : (
          <BootstrapPagination.Ellipsis key={index} disabled />
        )
      )}

      <BootstrapPagination.Next
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
    </BootstrapPagination>
  );
};