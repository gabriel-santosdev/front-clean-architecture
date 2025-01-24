<template>
    <v-card class="pokemon-details-card">
        <v-card-title class="text-h5 font-weight-bold text-primary">{{ pokemon.name }}</v-card-title>
        <v-divider class="my-4"></v-divider>

        <v-img :src="pokemon.image" :alt="pokemon.name" height="250" contain class="pokemon-image"></v-img>

        <v-card-text>
            <v-list dense>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="primary" icon="mdi-pokeball"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">Name:</v-list-item-title>
                        <v-list-item-subtitle>{{ pokemon.name }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <!-- <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="success">mdi-star</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">Type:</v-list-item-title>
                        <v-list-item-subtitle>{{ pokemon.type }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="warning">mdi-weight</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">Weight:</v-list-item-title>
                        <v-list-item-subtitle>{{ pokemon.weight }} kg</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item> -->
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Pokemon } from "@/domain/contracts/PokemonRepository";

export default defineComponent({
    props: {
        pokemon: {
            type: Object as PropType<Pokemon>,
            required: true,
        },
    },
});
</script>

<style scoped>
.pokemon-details-card {
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom, #f4f4f4, #ffffff);
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}

.pokemon-image {
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-list-item-title {
    font-size: 1.1rem;
}

.v-list-item-subtitle {
    color: #616161;
}
</style>