<!-- components/LibroList.vue -->
<script setup lang="ts">
import { useBibliotecaStore } from '@/stores/biblioteca';
import { onMounted, computed, ref } from 'vue';
import LibroCard from '../components/LibroCard.vue';

const store = useBibliotecaStore();
const filtro = ref("titulo")

const ordenarPorTitulo = () => {
  filtro.value = 'titulo'
}


const ordenarPorAutor = () => {
  filtro.value = 'autor'
}


const ordenarPorPaginas = () => {
  filtro.value = 'paginas'
}

const orden = computed(() => {
  switch (filtro.value) {
    case 'titulo': return store.sortedByTitle
    case 'autor': return store.sortedByAutor
    case 'paginas': return store.sortedByPageNumber
    default: return store.sortedByTitle
  }
})

onMounted(() => {
  if (store.isLoading) {
    store.fetchInitialData();
  }
});
</script>

<template>
  <div class="p-4 flew-row">
     <div class="py-3">
        <RouterView/>
    </div>
    <div class="mb-6 flex gap-2">
      <button 
        @click="ordenarPorTitulo()"
        class="px-4 py-2 rounded border transition-colors"
        :class="filtro === 'titulo' ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'">
        filtra por Título
      </button>
      
      <button 
        @click="ordenarPorAutor()"
        class="px-4 py-2 rounded border transition-colors"
        :class="filtro === 'autor' ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'">
        filtra por Autor
      </button>

      <button 
        @click="ordenarPorPaginas()"class="px-4 py-2 rounded border transition-colors"
        :class="filtro === 'paginas' ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'">
        filtra por Páginas
      </button>
    </div>

    <div v-if="store.isLoading" class="text-center p-6">
      <p class="mt-2 text-gray-600">Cargando libros...</p>
    </div>
    
    <div v-else-if="store.error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
      <strong>Error:</strong> {{ store.error }}
    </div>
    
    <div v-else-if="orden.length === 0" class="text-center py-8 text-gray-500">
      <p class="text-lg">No hay libros en la biblioteca</p>
      <p class="text-sm">Agrega algunos libros para comenzar</p>
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <LibroCard
        v-for="libro in orden" :key="libro.titulo" :libro="libro"/>
    </div>
   
  </div>
</template>