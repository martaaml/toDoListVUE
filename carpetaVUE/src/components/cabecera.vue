<script setup>
import { ref } from 'vue';
const emit = defineEmits(["altaRecordatorio"]);
var textoNuevaNota=ref("");
function altaNuevaNota(){
    emit("altaRecordatorio", textoNuevaNota.value);
    var textoNuevaNota=" ";
}
</script>

<template>
    <nav>
        <button><RouterLink to="/recordatorios">Recordatorios</RouterLink></button>
        <button><RouterLink to="/registro">Registro</RouterLink></button>
    </nav>
    <h1>CABECERA</h1>
    <input   class="nuevaNota" v-model="textoNuevaNota" placeholder="Escribe una nota..." v-on:keyup.enter="altaNuevaNota">
    <button type="submit" v-on:click="altaNuevaNota">AÑADIR</button>
</template>

<style scoped>


</style>