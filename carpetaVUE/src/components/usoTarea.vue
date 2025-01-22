<script setup>
defineProps(['cantidadTareasPendentes']);
const emit = defineEmits(['eliminaTareasCompletadas', 'eliminaTodasTareas']);

function eliminaTCompletadas() {
  emit('eliminaTCompletadas');
}

function eliminaTodasTareas() {
  emit('eliminaTodasTareas');
}

function cambiaPrioridad(indice, prioridad) {
  emit('cambiaPrioridad', indice, prioridad);
}
</script>

<template>
  <section>
    <div class="uso-tarea">
      <p>Tareas pendientes: {{ cantidadTareasPendentes }}</p>
      <button @click="eliminaTareasCompletadas">Eliminar tareas completadas</button>
      <button @click="eliminaTodasTareas">Eliminar todas las tareas</button>
    </div>
  </section>
</template>

<style scoped>
.uso-tarea {
  margin: 16px 0;
}

button {
  margin-right: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #cc88f1;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #b30092;
}
</style>
