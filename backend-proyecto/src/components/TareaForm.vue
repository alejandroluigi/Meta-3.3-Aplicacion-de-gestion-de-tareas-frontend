<template>
  <v-card class="pa-4 mb-6" elevation="3">
    <v-card-title class="text-h6">Crear nueva tarea (POST)</v-card-title>

    <v-row>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="titulo"
          label="Título de la tarea"
          variant="outlined"
          clearable
        />
      </v-col>

      <v-col cols="12" md="4" class="d-flex align-center">
        <v-checkbox
          v-model="completada"
          label="Completada"
          hide-details
        />
      </v-col>
    </v-row>

    <v-btn color="primary" @click="crearTarea">
      Crear tarea
    </v-btn>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['tarea-creada'])

const titulo = ref('')
const completada = ref(false)

const crearTarea = () => {
  if (!titulo.value.trim()) return

  emit('tarea-creada', {
    titulo: titulo.value,
    completada: completada.value
  })

  titulo.value = ''
  completada.value = false
}
</script>