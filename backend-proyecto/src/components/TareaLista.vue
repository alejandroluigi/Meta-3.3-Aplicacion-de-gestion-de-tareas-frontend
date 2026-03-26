<template>
  <v-card class="pa-4 mb-6" elevation="3">
    <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h6">Lista de tareas (GET)</span>
      <v-btn color="primary" @click="$emit('recargar')">
        Recargar
      </v-btn>
    </v-card-title>

    <v-row v-if="tareas.length > 0">
      <TareaItem
        v-for="tarea in tareas"
        :key="tarea.id"
        :tarea="tarea"
        @patch="$emit('patch', $event)"
        @put="$emit('put', $event)"
        @delete="$emit('delete', $event)"
      />
    </v-row>

    <v-alert
      v-else
      type="info"
      variant="tonal"
      class="mt-4"
    >
      No hay tareas para mostrar
    </v-alert>
  </v-card>
</template>

<script setup>
import TareaItem from './TareaItem.vue'

defineProps({
  tareas: {
    type: Array,
    required: true
  }
})

defineEmits(['patch', 'put', 'delete', 'recargar'])
</script>