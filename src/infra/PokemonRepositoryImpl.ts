import axios from "axios";
import type { Pokemon, PokemonRepository } from "@/domain/contracts/PokemonRepository";

export class PokemonRepositoryImpl implements PokemonRepository {
    private readonly apiUrl = import.meta.env.VITE_API_URL;
    private readonly imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

    async fetchPokemonList(): Promise<Pokemon[]> {
        const response = await axios.get(`${this.apiUrl}/pokemon?limit=10`);
        return response.data.results.map((item: { name: string }, index: number) => ({
            id: index + 1,
            name: item.name,
            image: `${this.imageBaseUrl}${index + 1}.png`,
        }));
    }

    async fetchPokemonDetails(id: number): Promise<Pokemon> {
        const response = await axios.get(`${this.apiUrl}/pokemon/${id}`);
        return {
            id,
            name: response.data.name,
            image: response.data.sprites.front_default,
        };
    }

    async searchPokemon(term: string): Promise<Pokemon[]> {
        const response = await axios.get(`${this.apiUrl}/pokemon?limit=1000`);
        const filteredResults = response.data.results.filter((item: { name: string }) =>
            item.name.toLowerCase().includes(term.toLowerCase())
        );
        return filteredResults.map((item: { name: string }, index: number) => ({
            id: index + 1,
            name: item.name,
            image: `${this.imageBaseUrl}${index + 1}.png`,
        }));
    }
}