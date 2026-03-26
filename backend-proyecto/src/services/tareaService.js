const BASE_URL = 'http://localhost:3000/api/tareas'

// Función auxiliar para manejar respuestas
const manejarRespuesta = async (response) => {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Error en la petición')
  }

  return data
}

export default {
  // GET /api/tareas
  async obtenerTodas() {
    const response = await fetch(BASE_URL)
    return manejarRespuesta(response)
  },

  // GET /api/tareas/:id
  async obtenerPorId(id) {
    const response = await fetch(`${BASE_URL}/${id}`)
    return manejarRespuesta(response)
  },

  // GET /api/tareas/buscar?q=texto
  async buscarPorTitulo(q) {
    const response = await fetch(`${BASE_URL}/buscar?q=${encodeURIComponent(q)}`)
    return manejarRespuesta(response)
  },

  // POST /api/tareas
  async crear(tarea) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tarea)
    })

    return manejarRespuesta(response)
  },

  // PUT /api/tareas/:id
  async actualizarCompleta(id, tarea) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tarea)
    })

    return manejarRespuesta(response)
  },

  // PATCH /api/tareas/:id
  async actualizarParcial(id, datosParciales) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosParciales)
    })

    return manejarRespuesta(response)
  },

  // DELETE /api/tareas/:id
  async eliminar(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })

    return manejarRespuesta(response)
  }
}