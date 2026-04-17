<template>
  <div class="container">
    <h1>Gestor de Tareas con JWT + Cookies + CSRF</h1>

    <LoginForm
      v-if="!autenticado"
      @login-exitoso="verificarSesion"
    />

    <div v-else>
      <button @click="cerrarSesion">Cerrar sesión</button>

      <!-- 🔥 CORREGIDO -->
      <TareaForm @tarea-creada="crearTarea" />

      <TareaBusqueda @buscar="buscarTareas" />

      <!-- 🔥 AGREGADOS -->
      <TareaLista
        :tareas="tareas"
        @patch="actualizarParcial"
        @put="actualizarCompleto"
        @delete="eliminarTarea"
        @recargar="cargarTareas"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import authService from '../services/authService'
import tareaService from '../services/tareaService'

import LoginForm from '../components/LoginForm.vue'
import TareaForm from '../components/TareaForm.vue'
import TareaBusqueda from '../components/TareaBusqueda.vue'
import TareaLista from '../components/TareaLista.vue'

const autenticado = ref(false)
const tareas = ref([])
const error = ref('')

const verificarSesion = async () => {
  try {
    await authService.verify()
    autenticado.value = true
    await cargarTareas()
  } catch {
    autenticado.value = false
  }
}

const cargarTareas = async () => {
  tareas.value = await tareaService.obtenerTareas()
}

const buscarTareas = async (texto) => {
  if (!texto.trim()) return cargarTareas()
  tareas.value = await tareaService.buscarTareas(texto)
}

// 🔥 FIX CREAR
const crearTarea = async (tarea) => {
  try {
    await tareaService.crearTarea(tarea)
    await cargarTareas()
  } catch (err) {
    error.value = err.message
  }
}

// 🔥 NUEVOS
const actualizarParcial = async (tarea) => {
  await tareaService.actualizarTareaPATCH(tarea)
  await cargarTareas()
}

const actualizarCompleto = async (tarea) => {
  await tareaService.actualizarTareaPUT(tarea)
  await cargarTareas()
}

const eliminarTarea = async (id) => {
  await tareaService.eliminarTarea(id)
  await cargarTareas()
}

const cerrarSesion = async () => {
  await authService.logout()
  autenticado.value = false
  tareas.value = []
}

onMounted(verificarSesion)
</script>