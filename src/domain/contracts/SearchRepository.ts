import type { Pokemon } from "@/domain/contracts/PokemonRepository"
export interface SearchRepository {
    searchPokemon(term: string): Promise<Pokemon[]>;
}