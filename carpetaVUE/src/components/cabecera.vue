<script setup>
import { ref } from 'vue';

// Emitir el evento para añadir una nueva nota
const emit = defineEmits(["altaRecordatorio"]);
const textoNuevaNota = ref("");

// Función para agregar una nueva nota
function altaNuevaNota() {
  if (textoNuevaNota.value.trim() === "") {
    // No hacemos nada si el campo está vacío
    return;
  } else {
    // Emitimos el evento hacia el componente padre
    emit("altaRecordatorio", textoNuevaNota.value);
    textoNuevaNota.value = ""; // Limpiamos el campo después de enviar
  }
}
</script>

<template>
  <h1>NOTAS</h1>
  <!-- Input para nueva nota -->
  <input 
    class="nuevaNota" 
    v-model="textoNuevaNota" 
    placeholder="Escribe una nota..." 
    v-on:keyup.enter="altaNuevaNota"
  />
  
  <!-- Botón para añadir nueva nota, deshabilitado si no hay texto -->
  <button 
    type="submit" 
    v-on:click="altaNuevaNota" 
    :disabled="textoNuevaNota.trim() === ''"
  >
    AÑADIR
  </button>
</template>

<style scoped>
/* Aquí puedes agregar tus estilos CSS si los necesitas */
</style>
