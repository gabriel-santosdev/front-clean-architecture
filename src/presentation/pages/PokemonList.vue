<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="pa-6">
                    <v-card-title class="text-h4 text-center font-weight-bold">
                        <v-icon class="mr-2" color="primary">mdi-pokeball</v-icon>
                        Pokémon List
                    </v-card-title>

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
                                <v-card-title class="text-center text-capitalize text-primary">{{ pokemon.name
                                    }}</v-card-title>
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
            <v-card v-if="selectedPokemon">
                <PokemonDetails :pokemon="selectedPokemon" />
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PokemonUseCase } from "@/data/useCases/PokemonUseCase";
import { PokemonRepositoryImpl } from "@/infra/PokemonRepositoryImpl";
import PokemonDetails from "@/components/PokemonDetails.vue";

const pokemons = ref<{ id: number; name: string; image: string }[]>([]);
const selectedPokemon = ref<{ id: number; name: string; image: string } | null>(null);
const showDialog = ref(false);
const loading = ref(true);
const error = ref<string | null>(null);

const pokemonUseCase = new PokemonUseCase(new PokemonRepositoryImpl());

const loadPokemonList = async () => {
    try {
        pokemons.value = await pokemonUseCase.getPokemonList();
    } catch (err) {
        error.value = "Erro ao carregar a lista de Pokémon.";
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const showDetails = async (id: number) => {
    try {
        selectedPokemon.value = await pokemonUseCase.getPokemonDetails(id);
        showDialog.value = true;
    } catch (err) {
        error.value = "Erro ao carregar detalhes do Pokémon.";
        console.error(err);
    }
};

onMounted(loadPokemonList);
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