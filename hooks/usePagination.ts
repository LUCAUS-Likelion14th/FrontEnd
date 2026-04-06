import { useState } from "react";

export default function usePagination<T>(data: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const currentData = data.slice(start, end);

  return {
    page,
    setPage,
    totalPages,
    currentData,
  };
}
