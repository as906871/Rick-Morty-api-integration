import axios from "axios";
import type { PaginatedCharacters, Character } from "../types";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 10000,
});

export const fetchCharacters = async (page = 1): Promise<PaginatedCharacters> => {
  const res = await api.get("/character", { params: { page } });
  return res.data as PaginatedCharacters;
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
  const res = await api.get(`/character/${id}`);
  return res.data as Character;
};
