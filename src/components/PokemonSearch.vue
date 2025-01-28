<!-- components/PokemonSearch.vue -->
<template>
    <v-container>
        <v-text-field v-model="searchTerm" label="Search Pokémon" @input="onSearch" outlined />
    </v-container>
</template>

<script lang="ts" setup>
import { ref, defineEmits, emit } from "vue";
import { SearchPokemonUseCase } from "@/data/useCases/SearchPokemonUseCase";
import { PokemonRepositoryImpl } from "@/infra/PokemonRepositoryImpl";
import type { Pokemon } from "@/domain/contracts/PokemonRepository";


const emit = defineEmits(["searchResults", "searchError", "loading"]);

const searchTerm = ref("");

const repository = new PokemonRepositoryImpl();
const searchUseCase = new SearchPokemonUseCase(repository);

const onSearch = async () => {
    emit("loading", true);
    try {
        const results: Pokemon[] = await searchUseCase.execute(searchTerm.value);
        emit("searchResults", results);
    } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
        emit("searchError", "Erro ao buscar Pokémon.");
    } finally {
        emit("loading", false)
    }
};
</script>
