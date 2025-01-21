<script setup>
//Import Vistas
import cabecera from './cabecera.vue';
import usoTarea from './usoTarea.vue';
import Tarea from './tarea.vue';


//Import Componentes
import {computed,onMounted, watch} from 'vue'
import { useCollection,useFirestore } from 'vuefire'
import { collection,addDoc, orderBy, query, updateDoc } from 'firebase/firestore'
import { recordatoriosRef } from '../../firebase';
const db= useFirestore();

const numeroTareasPendientes = computed (()=>{
return listaRecordatorios.value.filter(
recordatorios=>!recordatorios.completada).length;});


//Funcionalidad
var listaRecordatorios = useCollection(query(collection(db, 'recordatorios'), orderBy('nombre', 'asc')));
onMounted(() => {});

function altaNuevaNota(texto) {
  let prioridadNumerica;
  
  if (prioridad === 'alta') {
    prioridadNumerica = 1;
  } else if (prioridad === 'normal') {
    prioridadNumerica = 2;
  } else if (prioridad === 'baja') {
    prioridadNumerica = 3;
  }

    let NuevoRecordatorio ={
    nombre: texto,
    prioridad: normal,
    prioridadNumerica: prioridadNumerica,
    tiempo: 0,
    completada: false
  }


  addDoc(collection(db, "recordatorios"),NuevoRecordatorio)
  .then( (docRef) =>{
    console.log("Error" + docRef.is)
  })
  .catch(error =>{
    console.log("Error" + error);
  });
}

function eliminaTareaCompletada(){
  listaRecordatorios.value.forEach(recordatorios => 
    {
      if (recordatorios.completada) 
      {
        deleteDoc(doc(db, "recordatorios", recordatorios.id))
          .then(() => {
            console.log("Tareas eliminadas correctamente.");
          })
          .catch(error => {
            console.log("Error" + error);
          });
      }
    });
  }

  function eliminaTodaTareas(){
    listaRecordatorios.value.forEach(recordatorios =>
    {
      deleteDoc(doc(db, "recordatorios", recordatorios.id))
        .then(() => {
          console.log("Tareas eliminadas correctamente.");
        })
        .catch(error => {
          console.log("Error" + error);
        });
    });
  }

  function borrarTarea(indice){
    deleteDoc(doc(db, "recordatorios", listaRecordatorios.value[indice].id))
    .then( (docRef) =>{
      console.log("Tarea eliminada correctamente.");
    })
    .catch(error =>{
      console.log("Error" + error);
    });
  }

  function editarTarea(indice){
    updateDoc(doc(db, "recordatorios", listaRecordatorios.value[indice].id),
      {
        nombre: listaRecordatorios.value[indice].nombre,
        prioridad: listaRecordatorios.value[indice].prioridad,
        tiempo: listaRecordatorios.value[indice].tiempo,
        completada: listaRecordatorios.value[indice].completada
      }
    )
    .then( (docRef) =>{
      console.log("Tarea editada correctamente.");
    })
    .catch(error =>{
      console.log("Error" + error);
    });

  }

  function cambiaPrioridad(indice,prioridad){
    updateDoc(doc(db, "recordatorios", listaRecordatorios.value[indice].id),
      {
        prioridad: prioridad
      }
    )
    .then( (docRef) =>{
      console.log("Prioridad cambiada correctamente.");
    })
    .catch(error =>{
      console.log("Error" + error);
    });

  }

  function tachado(indice){
    updateDoc(doc(db, "recordatorios", listaRecordatorios.value[indice].id),
      {
        completada: true
      }
    )
    .then( (docRef) =>{
      console.log("Tarea completada correctamente.");
    })
    .catch(error =>{
      console.log("Error" + error);
    });

  }



</script>

<template>
 
  <cabecera v-on:NuevoRecordatorio="altaNuevaNota"></cabecera>
  {{ numeroTareasPendientes }} tareas pendientes de {{ numero }} recordatorios
  <usoTarea v-on:eliminaTareasCompletadas="eliminaTareasCompletadas" v-on:eliminarTareas="eliminarTareas"></usoTarea>
  <Tarea v-for="(recordatorios,indice) in listaRecordatorios" :nombre="recordatorios.nombre" :prioridad="recordatorios.prioridad" :tiempo="recordatorios.tiempo" :completada="recordatorios.completada" v-on:borrado="borrarTarea(indice)" v-on:editado="editarTarea(indice)" v-on:cambiaPrioridad="cambiaPrioridad(indice,recordatorios.prioridad)" v-on:tachar="tachado(indice)"></Tarea>
  <footer></footer>
</template>

<style scoped>

</style>
