<script setup lang="ts">
import { ref } from 'vue';
import type { Libro } from '../models/libro.ts';
import { useBibliotecaStore } from '../stores/biblioteca.js';

const store = useBibliotecaStore();

const form = ref<Libro>({
  id: 0,
  titulo: '',
  autor: '',
  paginas: 0,
  disponible: true,  
});

const successMessage = ref('');

const resetForm = () => {
  form.value = {
    id: 0,
    titulo: '',
    autor: '',
    paginas: 0,
    disponible: true,
  };
};

const submit = () => {
  store.addLibro({...form.value});
  if (!store.error) {
    successMessage.value = 'Libro agregado con éxito';
    resetForm();
    setTimeout(() => (successMessage.value = ''), 3000);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-4 px-4">
      <div class="bg-white rounded-lg shadow overflow-hidden">
    
        <div class="bg-purple-600 p-4 text-white">
          <h1 class="text-xl font-bold">Agregar Libro</h1>
        </div>
        
        
        <div 
          v-if="successMessage" 
          class="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
        >
          {{ successMessage }}
        </div>
        <div 
          v-if="store.error" 
          class=" p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          {{ store.error }}
        </div>



        <form @submit.prevent="submit" class="p-4 space-y-4">
       
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700 mb-1">Título del Libro</label>
            <input
              type="text"
              id="titulo"
              v-model="form.titulo"
              required
              placeholder="Ingresa el título"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label for="autor" class="block text-sm font-medium text-gray-700 mb-1">Autor</label>
            <input
              type="text"
              id="autor"
              v-model="form.autor"
              required
              placeholder="Nombre del autor"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

        
          <div>
            <label for="paginas" class="block text-sm font-medium text-gray-700 mb-1">Número de Páginas</label>
            <input
              type="number" id="paginas" v-model.number="form.paginas" required
              placeholder="Número de páginas"
              class="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div class="flex items-center  bg-gray-50 rounded">
            <input type="checkbox" id="disponible"v-model="form.disponible"
              class="w-4 h-4 text-purple-600 border-gray-300 rounded"
            />
            <span class="text-gray">Esta disponible?</span>
          </div>

          <!-- Botones -->
          <div class="flex gap-3 pt-2">
            <button
              type="submit"
              class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-medium"
            >
              Agregar Libro
            </button>
            <button
              type="button"
              @click="resetForm"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded font-medium"
            >
              Limpiar
            </button>
          </div>


          
        </form>


    </div>
  </div>
</template>

