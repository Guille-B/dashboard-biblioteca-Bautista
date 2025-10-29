<script setup lang="ts">
import { ref, type Ref } from 'vue';


interface Section {
    name: string,
    route: string,
    isActive: boolean
}


const sections: Ref<Section[]> = ref<Section[]>([
    { name: 'Libros', route: '/libros', isActive: false },
    { name: 'Añadir Libro', route: '/libro/nuevo', isActive: false }
]);


</script>
<template>
    <div class="min-h-screen flex flex-col  bg-purple-100 font-serif">
        <header class="border-r min-h-24 p-4 border- bg-purple-400/60 shadow-md">
            <div class=" flex flex-row p-3 border-b-2 border-white justify-center">
                 <p class="text-white font-black text-2xl">Biblioteca De Cosas</p>
            </div>
            <nav class="px-3 pt-4 flex flex-row justify-center gap-3">
                    <RouterLink v-for="(section, index) in sections" :key="index" :to="section.route" class=" px-4 py-2.5 rounded-lg border border-transparent text-md font-medium transition-colors text-white duration-200
                        hover:bg-purple-100 hover:border-purple-200 hover:text-gray-800 hover:shadow-sm"
                        :class="{ 'bg-zinc-800 border-zinc-700 text-white': section.isActive }">
                        <!-- Puedes agregar íconos aquí si lo deseas -->
                        <span class="ml-1">{{ section.name }}</span>
                    </RouterLink>
             </nav>

        </header>

        <main class="flex-1 flex flex-col">
            <section class="flex-1 p-6 overflow-y-auto bg-purple-200/40">            
                <RouterView/>
                
            </section>

        </main>

    </div>
    

</template>