<template>
  <v-card class="pa-4 mb-6" elevation="3">
    <v-card-title class="text-h6">Buscar tareas y obtener por ID</v-card-title>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="textoBusqueda"
          label="Buscar por título"
          variant="outlined"
          clearable
        />
      </v-col>

      <v-col cols="12" md="6" class="d-flex ga-2 align-center">
        <v-btn color="info" @click="emit('buscar', textoBusqueda)">
          Buscar
        </v-btn>

        <v-btn color="secondary" @click="emit('mostrar-todas')">
          Mostrar todas
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model.number="idBusqueda"
          label="Buscar por ID"
          type="number"
          variant="outlined"
        />
      </v-col>

      <v-col cols="12" md="8" class="d-flex align-center">
        <v-btn color="success" @click="emit('buscar-id', idBusqueda)">
          Obtener tarea por ID
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['buscar', 'mostrar-todas', 'buscar-id'])

const textoBusqueda = ref('')
const idBusqueda = ref(null)
</script>