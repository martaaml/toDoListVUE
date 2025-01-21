<script setup>
defineProps(['cantidadTareasPendentes']);
const emit = defineEmits(['eliminaTareasCompletadas','eliminaTareas']);

function eliminaTareasCompletadas()
{
    emit('eliminaTareasCompletadas');
}
function eliminaTodasTareas()
{
    emit('eliminarTareas');
}
</script>

<template>
    <section>
        <div>
        <p>Tareas pendientes: {{ cantidadTareasPendentes }}</p>
        <button v-on:click="eliminaTareasCompletadas">Eliminar tareas completadas</button>
        <button v-on:click="eliminaTodasTareas">Eliminar todas las tareas</button>
    </div>
    </section>
</template>

<style scoped>


</style>
