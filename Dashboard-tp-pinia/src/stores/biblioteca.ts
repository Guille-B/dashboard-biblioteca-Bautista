import type { Libro } from "@/models/libro";
import { defineStore } from "pinia";

interface LibrosState {
    isLoading:boolean,
    data: Libro[],
    error: string | null,
}

export const useBibliotecaStore = defineStore('libros', {
    state: (): LibrosState => ({
        isLoading:true,
        data:[],
        error: null
    }),


    actions: {
        async fetchInitialData() {
            this.isLoading = true
            try {
                // Simulación de carga
                await new Promise((r) => setTimeout(r, 300))
                this.data = []
                this.error = null
            } catch (err) {
                this.error = 'Error al cargar los datos iniciales'
            } finally {
                this.isLoading = false
            }
        },


        addLibro(libro: Libro) {
            this.data.push(libro)
            this.error = null
            console.log(`libro agregado:  ${libro.titulo} de ${libro.autor}`)
        },

        updateEstado(titulo:string) {
           const libro = this.data.find((l)=> l.titulo === titulo)
            if(!libro) {
                this.error = `No se encontro el libro con el titulo ${titulo}`
                return
            }

            libro.disponible = !libro.disponible
            this.error = null
            console.log(`Se cambio el estado del libro`)
        }

    },

    getters: {
        sortedByTitle: (state): Libro[] => {
           return [...state.data].sort((a ,b)=> a.titulo.localeCompare(b.titulo))
        },

        sortedByAutor: (state) => {
           return [...state.data].sort((a,b)=> a.autor.localeCompare(b.autor))
        },

        sortedByPageNumber:(state) => {
            return[...state.data].sort((a,b)=> a.paginas - b.paginas)
        }
    },

    
})