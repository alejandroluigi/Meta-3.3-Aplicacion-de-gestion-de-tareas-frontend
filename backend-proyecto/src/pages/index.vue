<template>
  <v-app>
    <v-container class="py-6">
      <v-card class="pa-4 mb-6" elevation="4">
        <v-card-title class="text-h4 font-weight-bold">
          Gestión de Tareas - Vue + Vuetify + Fetch
        </v-card-title>
        <v-card-subtitle>
          Frontend con componentes y consumo de API REST
        </v-card-subtitle>
      </v-card>

      <!-- Mensajes -->
      <v-alert
        v-if="mensaje"
        :type="tipoMensaje"
        class="mb-4"
        closable
        @click:close="mensaje = ''"
      >
        {{ mensaje }}
      </v-alert>

      <!-- Crear -->
      <TareaForm @crear="crearTarea" />

      <!-- Buscar -->
      <TareaBusqueda
        @buscar="buscarTareas"
        @mostrar-todas="cargarTareas"
        @buscar-id="obtenerTareaPorId"
      />

      <!-- Resultado por ID -->
      <v-card v-if="tareaPorId" class="pa-4 mb-6" elevation="3">
        <v-card-title class="text-h6">Resultado de búsqueda por ID</v-card-title>
        <p><strong>ID:</strong> {{ tareaPorId.id }}</p>
        <p><strong>Título:</strong> {{ tareaPorId.titulo }}</p>
        <p><strong>Completada:</strong> {{ tareaPorId.completada ? 'Sí' : 'No' }}</p>
      </v-card>

      <!-- Lista -->
      <TareaLista
        :tareas="tareas"
        @patch="actualizarParcial"
        @put="actualizarCompleta"
        @delete="eliminarTarea"
        @recargar="cargarTareas"
      />
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import tareaService from '../services/tareaService'

import TareaForm from '../components/TareaForm.vue'
import TareaBusqueda from '../components/TareaBusqueda.vue'
import TareaLista from '../components/TareaLista.vue'

const tareas = ref([])
const tareaPorId = ref(null)
const mensaje = ref('')
const tipoMensaje = ref('success')

const mostrarMensaje = (texto, tipo = 'success') => {
  mensaje.value = texto
  tipoMensaje.value = tipo
}

const manejarError = (error, mensajeDefault) => {
  console.error(error)
  mostrarMensaje(error.message || mensajeDefault, 'error')
}

// GET
const cargarTareas = async () => {
  try {
    const data = await tareaService.obtenerTodas()
    tareas.value = data.data || []
    tareaPorId.value = null
    mostrarMensaje('Tareas cargadas correctamente', 'success')
  } catch (error) {
    manejarError(error, 'Error al cargar tareas')
  }
}

// GET buscar
const buscarTareas = async (texto) => {
  try {
    if (!texto || !texto.trim()) {
      mostrarMensaje('Escribe un texto para buscar', 'warning')
      return
    }

    const data = await tareaService.buscarPorTitulo(texto)
    tareas.value = data.data || []
    tareaPorId.value = null
    mostrarMensaje(data.message || 'Búsqueda realizada', 'info')
  } catch (error) {
    manejarError(error, 'Error al buscar tareas')
  }
}

// GET por ID
const obtenerTareaPorId = async (id) => {
  try {
    if (!id) {
      mostrarMensaje('Ingresa un ID válido', 'warning')
      return
    }

    const data = await tareaService.obtenerPorId(id)
    tareaPorId.value = data.data
    mostrarMensaje('Tarea obtenida correctamente', 'success')
  } catch (error) {
    tareaPorId.value = null
    manejarError(error, 'Error al obtener tarea por ID')
  }
}

// POST
const crearTarea = async (nuevaTarea) => {
  try {
    const data = await tareaService.crear(nuevaTarea)
    mostrarMensaje(data.message || 'Tarea creada', 'success')
    await cargarTareas()
  } catch (error) {
    manejarError(error, 'Error al crear tarea')
  }
}

// PUT
const actualizarCompleta = async (tarea) => {
  try {
    if (!tarea.titulo || !tarea.titulo.trim()) {
      mostrarMensaje('El título es obligatorio para PUT', 'warning')
      return
    }

    const payload = {
      titulo: tarea.titulo,
      completada: tarea.completada
    }

    const data = await tareaService.actualizarCompleta(tarea.id, payload)
    mostrarMensaje(data.message || 'Tarea actualizada completamente', 'info')
    await cargarTareas()
  } catch (error) {
    manejarError(error, 'Error en PUT')
  }
}

// PATCH
const actualizarParcial = async (tarea) => {
  try {
    const payload = {
      titulo: tarea.titulo,
      completada: tarea.completada
    }

    const data = await tareaService.actualizarParcial(tarea.id, payload)
    mostrarMensaje(data.message || 'Tarea actualizada parcialmente', 'warning')
    await cargarTareas()
  } catch (error) {
    manejarError(error, 'Error en PATCH')
  }
}

// DELETE
const eliminarTarea = async (id) => {
  try {
    const confirmar = confirm(`¿Deseas eliminar la tarea ${id}?`)
    if (!confirmar) return

    const data = await tareaService.eliminar(id)
    mostrarMensaje(data.message || 'Tarea eliminada', 'error')
    await cargarTareas()
  } catch (error) {
    manejarError(error, 'Error en DELETE')
  }
}

onMounted(() => {
  cargarTareas()
})
</script>
