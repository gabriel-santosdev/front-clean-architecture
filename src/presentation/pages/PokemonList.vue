<!-- components/PokemonList.vue -->
<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
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
                            <v-card class="pokemon-card" @click="showDetails(pokemon.id)">
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
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PokemonSearch from "@/components/PokemonSearch.vue";

const pokemons = ref<{ id: number; name: string; image: string }[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const updatePokemonList = (results: { id: number; name: string; image: string }[]) => {
    pokemons.value = results;
    error.value = null;
};

const setError = (errorMessage: string) => {
    error.value = errorMessage;
};

const setLoading = (isLoading: boolean) => {
    loading.value = isLoading;
};
</script>

<style scoped>
.pokemon-card {
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.pokemon-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.text-primary {
    color: #ff6f61;
}
</style>