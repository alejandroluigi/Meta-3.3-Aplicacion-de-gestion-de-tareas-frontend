<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>

    <form @submit.prevent="iniciarSesion">
      <input
        v-model="email"
        type="email"
        placeholder="Correo electrónico"
        required
      />

      <button type="submit">Entrar</button>
    </form>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import authService from '../services/authService'

const emit = defineEmits(['login-exitoso'])

const email = ref('')
const mensaje = ref('')
const error = ref('')

const iniciarSesion = async () => {
  try {
    error.value = ''
    mensaje.value = ''

    await authService.login(email.value)

    mensaje.value = 'Sesión iniciada correctamente'
    emit('login-exitoso')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.login-container {
  margin-bottom: 20px;
}
.error {
  color: red;
}
.mensaje {
  color: green;
}
</style>