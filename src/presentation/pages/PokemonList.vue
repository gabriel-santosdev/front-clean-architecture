<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                <v-card class="pa-6">
                    <v-card-title class="text-h4 text-center font-weight-bold">
                        <v-icon class="mr-2" color="primary">mdi-pokeball</v-icon>
                        Pokémon List
                    </v-card-title>

                    <PokemonSearch @searchResults="updatePokemonList" @searchError="setError" @loading="setLoading" />

                    <v-progress-circular v-if="loading" indeterminate color="primary" size="50"
                        class="d-block mx-auto my-4"></v-progress-circular>

                    <v-alert v-if="error" type="error" class="mb-4 text-center">
                        {{ error }}
                    </v-alert>

                    <v-row v-if="!loading && pokemons.length">
                        <v-col v-for="pokemon in pokemons" :key="pokemon.id" cols="12" sm="6" md="4">
                            <v-card class="pokemon-card" @click="showDetails(pokemon)">
                                <v-img :src="pokemon.image" :alt="pokemon.name" height="150" contain
                                    class="rounded-lg"></v-img>
                                <v-card-title class="text-center text-capitalize text-primary">
                                    {{ pokemon.name }}
                                </v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-alert v-if="!loading && !pokemons.length" type="info" class="text-center">
                        Nenhum Pokémon encontrado.
                    </v-alert>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="showDialog" max-width="500px">
            <PokemonDetails v-if="selectedPokemon" :pokemon="selectedPokemon" />
        </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PokemonSearch from "@/components/PokemonSearch.vue";
import PokemonDetails from "@/components/PokemonDetails.vue";
import type { Pokemon } from "@/domain/contracts/PokemonRepository";

const pokemons = ref<Pokemon[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const selectedPokemon = ref<Pokemon | null>(null);
const showDialog = ref(false);

const updatePokemonList = (results: Pokemon[]) => {
    pokemons.value = results;
    error.value = null;
};

const setError = (errorMessage: string) => {
    error.value = errorMessage;
};

const setLoading = (isLoading: boolean) => {
    loading.value = isLoading;
};

const showDetails = (pokemon: Pokemon) => {
    selectedPokemon.value = pokemon;
    showDialog.value = true;
};
</script>