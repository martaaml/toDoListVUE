<script setup>
defineProps(['descripcionTarea', 'prioridad', 'prioridadNumerica', 'tiempo', 'completada']);
const emit = defineEmits(['borrado', 'editado', 'tachar', 'cambiaPrioridad']);

function eliminarTarea() {
  emit('borrado');
}

function editarTarea() {
  emit('editado');
}

function cambiaPrioridad(nuevaPrioridad) {
  emit('cambiaPrioridad', nuevaPrioridad);
}

function tachar() {
  emit('tachar');
}
</script>

<template>
  <main>
    <div class="tarea">
      <div class="cabecera">
        <h2 :class="{ tachado: completada }">{{ descripcionTarea }}</h2>
      </div>
      <div class="Datos">
        <div class="Prioridad">
          <button v-on:click="cambiaPrioridad('alta')" :class="{ alta: prioridad == 'alta' }"><span>Alta</span></button>
          <button v-on:click="cambiaPrioridad('normal')" :class="{ normal: prioridad == 'normal' }"><span>Normal</span></button>
          <button v-on:click="cambiaPrioridad('baja')" :class="{ baja: prioridad == 'baja' }"><span>Baja</span></button>
        </div>
        <span>La tarea fue creada hace {{ tiempo }} minutos</span>
        <div class="Opciones">
          <button class="EstadoCompletado" v-on:click="tachar"><img src="../assets/circulo.png" alt="tachar" width="30" height="30">
            <svg class="Completo" v-show="!completada" xmlns="../assts/circulo.png" width="30" height="30"></svg>
              <!-- Icono de tarea completada -->
            <svg class="NoCompletada" v-show="completada" xmlns="../assts/circulo.png" width="30" height="30">
              <!-- Icono de tarea no completada -->
            </svg>
          </button>
          <button class="borrar" v-on:click="eliminarTarea"><img src="../assets/papelera.png" alt="delete" width="30" height="30"></button>
          <button class="editar" v-on:click="editarTarea"><img src="../assets/editar.png" alt="editar" width="30" height="30"></button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.tachado {
  text-decoration: line-through;
  color: gray;
}

button {
  margin-right: 8px;
}

button:hover {
  background-color: #d081b3;
}
</style>
