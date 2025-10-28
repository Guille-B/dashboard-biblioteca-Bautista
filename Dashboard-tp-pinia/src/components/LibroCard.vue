<script setup lang="ts">
import { useBibliotecaStore } from '@/stores/biblioteca.ts';
import { onMounted } from 'vue';

const store = useBibliotecaStore()


onMounted(()=>{
    if (store.isLoading) {
        store.fetchInitialData()
    }
})



</script>
<template>



</template>