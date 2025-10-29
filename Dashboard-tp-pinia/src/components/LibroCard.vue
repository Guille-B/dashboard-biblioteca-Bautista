<script setup lang="ts">
import type { Libro } from '@/models/libro';
import { useBibliotecaStore } from '@/stores/biblioteca';

defineProps<{
  libro: Libro
}>();

const store = useBibliotecaStore();
</script>

<template>
  <div 
    class="border border-gray-300 rounded-3xl p-4 bg-white transition-all"
    :class="{ 'opacity-50 bg-gray-50': !libro.disponible }"
  >
    <h3 class="text-lg font-bold text-gray-800">{{ libro.titulo }}</h3>
    <p class="py-1 text-gray-600"> <span class="font-semibold">Autor:</span> {{ libro.autor }}</p>
    <p class="py-1 text-gray-600"><span class="font-semibold">Páginas:</span> {{ libro.paginas }}</p>
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium rounded-full p-1" :class="libro.disponible ? 'text-white bg-green-400  ' : 'text-white bg-red-400'">
        {{ libro.disponible ? 'Disponible' : 'Prestado' }}
      </span>
      <button 
        @click="store.updateEstado(libro.titulo)"
        class="px-3 py-1 text-sm rounded transition-colors"
        :class="libro.disponible 
          ? 'bg-purple-500 hover:bg-purple-600 text-white' 
          : 'bg-gray-500 hover:bg-gray-600 text-white'
        "
        :disabled-class="'opacity-50 cursor-not-allowed'"
      >
        {{ libro.disponible ? 'Prestar' : 'Devolver' }}
      </button>
    </div>
  </div>
</template>