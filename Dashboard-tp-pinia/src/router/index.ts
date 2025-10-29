import DashboardPage from '@/pages/DashboardPage.vue'
import LibroForm from '@/pages/LibroForm.vue'
import LibroList from '@/pages/LibroList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: DashboardPage, children:[
        {path: 'libros', component:LibroList, children:[
          {path: '/libro/nuevo', component:LibroForm},
        ]},
        
      ]
    }
  ],
})

export default router
