<script setup>

defineProps(['descripcionTarea', 'prioridad','prioridadNumerica', 'tiempo', 'completada']);
const emit=defineEmits(['borrado','editado','tachar','cambiaPrioridad']);

function eliminarTarea(){
    emit('borrado');
}
function editarTarea(){
    emit('editado');
}
function cambiaPrioridad(){
    emit('cambiaPrioridad');
}
function tachar(){
    emit('tachar');
}
</script>
<template>
    <main>
        <div class="tarea">
            <div class="cabecera">
                <h2 class=".tachado">{{ DescripcionTarea }}</h2>
            </div>
            <div class="Datos">
                <div class="Prioridad">
                    <button v-on:click="cambiaPrioridad('alta')" :class="{alta: prioridad == 'alta'}"><span>Alta </span></button>
                    <button v-on:click="cambiaPrioridad('normal')" :class="{normal: prioridad == 'normal'}"><span>Normal </span></button>
                    <button v-on:click="cambiaPrioridad('baja')" :class="{baja: prioridad == 'baja'}"><span> Baja </span></button>
                </div>
                <span>La tarea fue creada hace {{ tiempo }} minutos</span>
                <div class="Opciones">
                    <button class="EstadoCompletado" v-on:click="tachar">
                        <svg class="Completo" v-show="!completada" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                            <g fill="#14e408" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,2c-12.683,0 -23,10.317 -23,23c0,12.683 10.317,23 23,23c12.683,0 23,-10.317 23,-23c0,-4.56 -1.33972,-8.81067 -3.63672,-12.38867l-1.36914,1.61719c1.895,3.154 3.00586,6.83148 3.00586,10.77148c0,11.579 -9.421,21 -21,21c-11.579,0 -21,-9.421 -21,-21c0,-11.579 9.421,-21 21,-21c5.443,0 10.39391,2.09977 14.12891,5.50977l1.30859,-1.54492c-4.085,-3.705 -9.5025,-5.96484 -15.4375,-5.96484zM43.23633,7.75391l-19.32227,22.80078l-8.13281,-7.58594l-1.36328,1.46289l9.66602,9.01563l20.67969,-24.40039z"></path></g></g>
                        </svg>
                        <svg class="NoCompletada" v-show="completada" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                        <g fill="#9a0000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M4.4043,3c-0.647,0 -1.02625,0.72877 -0.65625,1.25977l5.98828,8.55859l-6.01172,7.02734c-0.389,0.454 -0.06675,1.1543 0.53125,1.1543h0.66406c0.293,0 0.57172,-0.12856 0.76172,-0.35156l5.23828,-6.13672l3.94336,5.63477c0.375,0.534 0.98667,0.85352 1.63867,0.85352h3.33398c0.647,0 1.02625,-0.72781 0.65625,-1.25781l-6.31836,-9.04297l5.72656,-6.70898c0.332,-0.39 0.05497,-0.99023 -0.45703,-0.99023h-0.8457c-0.292,0 -0.56977,0.12761 -0.75977,0.34961l-4.8418,5.66016l-3.60156,-5.1543c-0.374,-0.536 -0.98467,-0.85547 -1.63867,-0.85547z"></path></g></g>
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
    
</style>