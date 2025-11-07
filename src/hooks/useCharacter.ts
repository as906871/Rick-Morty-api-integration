import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../api/callingApi";
import type { Character } from "../types";

export const useCharacter = (id: number | null) =>
  useQuery<Character, Error>({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id as number),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
