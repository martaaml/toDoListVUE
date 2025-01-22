a<script setup>
// Importamos los componentes necesarios
import cabecera from './components/cabecera.vue';
import usoTarea from './components/usoTarea.vue';
import Tarea from './components/recordatorios.vue';


import { computed, onMounted } from 'vue';
import { useCollection, useFirestore } from 'vuefire';
import { doc, collection, addDoc, orderBy, query, updateDoc, deleteDoc } from 'firebase/firestore';

const db = useFirestore();

// Obtención de la lista de recordatorios desde Firestore
const listaRecordatorios = useCollection(query(collection(db, 'recordatorios'), orderBy('prioridad', 'asc')));

// Computamos el número de tareas pendientes
const numeroTareasPendientes = computed(() => {
  return listaRecordatorios.value.filter(recordatorio => !recordatorio.completada).length;
});

// Computamos el número total de recordatorios
const numero = computed(() => listaRecordatorios.value.length);

// Función para agregar un nuevo recordatorio
function altaNuevaNota(texto, prioridad = 'normal') {
  const prioridadNumerica = prioridad === 'alta' ? 1 : prioridad === 'normal' ? 2 : 3;

  const nuevoRecordatorio = {
    nombre: texto,
    prioridad: prioridad,
    prioridadNumerica: prioridadNumerica,
    tiempo: 0,
    completada: false
  };

  addDoc(collection(db, "recordatorios"), nuevoRecordatorio)
    .then(docRef => {
      console.log("Recordatorio agregado con ID:", docRef.id);
    })
    .catch(error => {
      console.error("Error al agregar recordatorio:", error);
    });
}

// Función para eliminar tareas completadas
function eliminaTareasCompletadas() {
  listaRecordatorios.value.forEach(recordatorio => {
    if (recordatorio.completada) {
      deleteDoc(doc(db, "recordatorios", recordatorio.id))
        .then(() => {
          console.log("Tarea eliminada correctamente.");
        })
        .catch(error => {
          console.error("Error al eliminar tarea:", error);
        });
    }
  });
}

// Función para eliminar todas las tareas
function eliminaTodasTareas() {
  listaRecordatorios.value.forEach(recordatorio => {
    deleteDoc(doc(db, "recordatorios", recordatorio.id))
      .then(() => {
        console.log("Todas las tareas eliminadas correctamente.");
      })
      .catch(error => {
        console.error("Error al eliminar tareas:", error);
      });
  });
}

// Función para borrar una tarea
function borrarTarea(indice) {
  deleteDoc(doc(db, "recordatorios", listaRecordatorios.value[indice].id))
    .then(() => {
      console.log("Tarea eliminada correctamente.");
    })
    .catch(error => {
      console.error("Error al eliminar tarea:", error);
    });
}

// Función para editar una tarea
function editarTarea(indice) {
  const editTexto=prompt("Editar tarea",listaRecordatorios.value[indice].nombre);
  updateDoc(doc(db, "recordatorios", listaRecordatorios.value[indice].id), {
    nombre: listaRecordatorios.value[indice].nombre=editTexto,
  })
    .then(() => {
      console.log("Tarea editada correctamente.");
    })
    .catch(error => {
      console.error("Error al editar tarea:", error);
    });
}

// Función para cambiar la prioridad de una tarea
function cambiaPrioridad(indice, nuevaPrioridad) {
      let prioridadNumerica;

      if (nuevaPrioridad === 'alta') {
        prioridadNumerica = 1;
      } else if (nuevaPrioridad === 'normal') {
        prioridadNumerica = 2;
      } else if (nuevaPrioridad === 'baja') {
        prioridadNumerica = 3;
      }

    updateDoc(doc(db, "recordatorios", listaRecordatorios.value[indice].id), {
      prioridad: nuevaPrioridad,
      prioridadNumerica: prioridadNumerica
      })
      .then(() => {
      console.log("Tarea editada correctamente.");
      })
      .catch(error => {
      console.log("Error" + error);
      });
  }

// Función para marcar una tarea como completada
function tachado(indice) {
  updateDoc(doc(db, "recordatorios", listaRecordatorios.value[indice].id), {
    completada: true
  })
    .then(() => {
      console.log("Tarea completada correctamente.");
    })
    .catch(error => {
      console.error("Error al completar tarea:", error);
    });
}
</script>
<template>
  <header>
<nav>
  <RouterLink to="/">Inicio</RouterLink>
  <RouterLink to="/recordatorios">Recordatorios</RouterLink>
</nav>
<div  v-if="usuario">
  <p>Bienvenid@  {{ usuario.displayName }}</p>
  <button v-on:click="cerrarSesion">Cerrar Sesion</button>
</div>
<div v-else>
  <RouterLink to="/login">Iniciar Sesion</RouterLink>
  <RouterLink to="/registro">Registrarse</RouterLink>
</div>
</header>
<RouterView></RouterView>

<cabecera @altaRecordatorio="altaNuevaNota" />

<div>{{ cantidadTareasPendentes }} tareas pendientes de {{ numero }} recordatorios</div>

<usoTarea 
@eliminaTareasCompletadas="eliminaTareasCompletadas" 
@eliminaTodasTareas="eliminaTodasTareas" 
@cambiaPrioridad="cambiaPrioridad"
/>

<tarea 
v-for="(recordatorio, indice) in listaRecordatorios" 
:key="recordatorio.id"
:descripcionTarea="recordatorio.nombre"
:prioridad="recordatorio.prioridad" 
:tiempo="recordatorio.tiempo" 
:completada="recordatorio.completada"
@borrado="borrarTarea(indice)" 
@editado="editarTarea(indice)" 
@cambiaPrioridad="cambiaPrioridad(indice,$event)"
@tachar="tachado(indice)"
/>

<footer></footer>
</template>


<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color:rgb(178, 68, 86);
}

nav {
  display: flex;
  align-items: center;
}

nav a {
  margin-right: 16px;
  text-decoration: none;
  color: white;
}

nav a:hover {
  color: rgb(227, 163, 174);
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #e265e4;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #b943b9;
}

.router-link-active {
  color: rgb(227, 163, 174);
}

landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
}

landing h1 {
  font-size: 48px;
  margin-bottom: 16px;
}

landing p {
  font-size: 24px;
  margin-bottom: 32px;
  align-items: center;
}

cabecera {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color:rgb(178, 68, 86);
  color: white;
}

cabecera input {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #e265e4;
  color: white;
  cursor: pointer;
}

cabecera input:hover {
  background-color: #b943b9;
}

</style>
