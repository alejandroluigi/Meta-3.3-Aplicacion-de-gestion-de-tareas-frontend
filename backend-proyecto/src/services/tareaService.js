import authService from './authService';

const API_BASE = 'http://localhost:3000';

const tareaService = {

  // ✅ SIN CSRF
  async obtenerTareas() {
    const response = await fetch(`${API_BASE}/api/tareas`, {
      method: 'GET',
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data.data || [];
  },

  // ✅ SIN CSRF
  async buscarTareas(texto) {
    const response = await fetch(`${API_BASE}/api/tareas/buscar?q=${encodeURIComponent(texto)}`, {
      method: 'GET',
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data.data || [];
  },

  // 🔥 CON CSRF
  async crearTarea(tarea) {
    const response = await fetch(`${API_BASE}/api/tareas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': authService.getCsrfToken()
      },
      credentials: 'include',
      body: JSON.stringify(tarea)
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data.data;
  },

  async actualizarTareaPUT(tarea) {
    const response = await fetch(`${API_BASE}/api/tareas/${tarea.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': authService.getCsrfToken()
      },
      credentials: 'include',
      body: JSON.stringify(tarea)
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data.data;
  },

  async actualizarTareaPATCH(tarea) {
    const response = await fetch(`${API_BASE}/api/tareas/${tarea.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': authService.getCsrfToken()
      },
      credentials: 'include',
      body: JSON.stringify(tarea)
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data.data;
  },

  async eliminarTarea(id) {
    const response = await fetch(`${API_BASE}/api/tareas/${id}`, {
      method: 'DELETE',
      headers: {
        'x-csrf-token': authService.getCsrfToken()
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data;
  }
};

export default tareaService;