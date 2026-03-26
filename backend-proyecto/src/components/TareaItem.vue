<template>
  <v-col cols="12" md="6" lg="4">
    <v-card elevation="3" class="pa-3 h-100">
      <v-card-title class="text-subtitle-1 font-weight-bold">
        Tarea #{{ tareaLocal.id }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="tareaLocal.titulo"
          label="Título"
          variant="outlined"
          density="comfortable"
        />

        <v-switch
          v-model="tareaLocal.completada"
          label="Completada"
          color="success"
          inset
        />
      </v-card-text>

      <v-card-actions class="d-flex flex-wrap ga-2">
        <v-btn color="warning" size="small" @click="emitirPatch">
          PATCH
        </v-btn>

        <v-btn color="info" size="small" @click="emitirPut">
          PUT
        </v-btn>

        <v-btn color="error" size="small" @click="emitirDelete">
          DELETE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tarea: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['patch', 'put', 'delete'])

const tareaLocal = ref({ ...props.tarea })

watch(
  () => props.tarea,
  (nuevaTarea) => {
    tareaLocal.value = { ...nuevaTarea }
  },
  { deep: true }
)

const emitirPatch = () => {
  emit('patch', { ...tareaLocal.value })
}

const emitirPut = () => {
  emit('put', { ...tareaLocal.value })
}

const emitirDelete = () => {
  emit('delete', tareaLocal.value.id)
}
</script>