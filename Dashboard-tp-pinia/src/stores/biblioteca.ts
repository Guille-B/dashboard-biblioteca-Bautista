import type { Libro } from "@/models/libro";
import { defineStore } from "pinia";

interface librosState {
    isLoading:boolean
    data: Libro[]
    error: string | null
}

export const useBibliotecaStore = defineStore('libros', {
    state: (): librosState => ({
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
        sortedByTitle(libro: Libro[]) {
            [...libro].sort((a ,b)=> a.titulo.localeCompare(b.titulo))
        },

        sortedByAutor(libros:Libro[]) {
            [...libros].sort((a,b)=> a.autor.localeCompare(b.autor))
        },

        sortedByPageNumber(libross:Libro[]) {
            [...libross].sort((a,b)=> a.paginas - b.paginas)
        }



    },

    
})