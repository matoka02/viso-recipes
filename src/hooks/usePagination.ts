import { useMemo } from 'react';

import { PaginationProps } from '../types/Pagination.type';

/**
 * Custom hook to handle pagination logic.
 * @param {number} totalPages - The total number of pages available.
 * @param {number} currentPage - The currently selected page.
 * @param {function} onPageChange - Callback function to update the current page.
 * @returns {object} - An object containing:
 *  - `displayedPages`: An array of page numbers or ellipses ('...') to display in the pagination component.
 *  - `goToPreviousPage`: Function to navigate to the previous page, if available.
 *  - `goToNextPage`: Function to navigate to the next page, if available. 
 */

interface UsePaginationResult {
  displayedPages: (number | string)[];
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}


export const usePagination = ({ totalPages, currentPage, onPageChange }: PaginationProps): UsePaginationResult => {
  const getDisplayedPages = useMemo((): (number | string)[] => {
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
  }, [totalPages, currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return {
    displayedPages: getDisplayedPages,
    goToPreviousPage,
    goToNextPage,
  };
}