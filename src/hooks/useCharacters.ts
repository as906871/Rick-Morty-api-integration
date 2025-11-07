import { useQuery, UseQueryResult } from "@tanstack/react-query";
import type { PaginatedCharacters } from "../types";
import { fetchCharacters } from "../api/callingApi";

export const useCharacters = (page: number): UseQueryResult<PaginatedCharacters, Error> => {
  return useQuery<PaginatedCharacters, Error>({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 2,
  });
};
