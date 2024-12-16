import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

import { PaginationProps } from '../types/Pagination.type';
import { usePagination } from '../hooks/usePagination';


export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const { displayedPages, goToPreviousPage, goToNextPage } = usePagination({
    totalPages,
    currentPage,
    onPageChange,
  });

  return (
    <BootstrapPagination className="justify-content-center my-3">
      <BootstrapPagination.Prev
        onClick={() => goToPreviousPage()}
        disabled={currentPage === 1 || totalPages === 0}
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
        onClick={() => goToNextPage()}
        disabled={currentPage === totalPages || totalPages === 0}
      />
    </BootstrapPagination>
  );
};