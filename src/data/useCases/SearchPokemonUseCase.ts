import type { SearchRepository } from "@/domain/contracts/SearchRepository";
import type { Pokemon } from "@/domain/contracts/PokemonRepository";

export class SearchPokemonUseCase {
    constructor(private repository: SearchRepository) { }

    async execute(term: string): Promise<Pokemon[]> {
        if (!term.trim()) {
            return [];
        }
        return await this.repository.searchPokemon(term);
    }
}