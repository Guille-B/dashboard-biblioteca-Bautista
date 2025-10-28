<script  lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import LibroList from './LibroList.vue';

const route = useRoute();
const routeRef = ref(route)

 



</script>
<template>
    <div class="min-h-screen flex bg-purple-600 font-serif">
        <header class=" h-36 border-r p-4 border- bg-purple-400/60">
            <div class=" flex-row ">

            </div>

        </header>

        <div>
            <RouterView/>
        </div>

    </div>
    

</template>