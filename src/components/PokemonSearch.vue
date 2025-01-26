<template>
    <v-text-field v-model="searchQuery" label="Search Pokémon" @input="handleSearch" class="mb-4" outlined />
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits(['search']);

const handleSearch = () => {
    emit('search', searchQuery.value);
};
</script>