<script setup>
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup,signOut } from 'firebase/auth';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';
const auth=useFirebaseAuth();
const googleAuthProvider=new GoogleAuthProvider();
const user=useCurrentUser();

function login()
{
  //Al iniciar sesión salta un modal de bienvenida
  signInWithPopup(auth, googleAuthProvider).then(
    ()=>console.log("Sesión iniciada")
  ).catch((error)=>{console.error("Error: ",error)})
}

function closeSesion()
{
  signOut(auth,googleAuthProvider).then(
    (
      console.log("Sesión cerrada")
  ).catch(
    (error)=>console.error("Error: "+error)
  ) 
  );
}
</script>

<template>
  <p v-if="user">¡Hola!, {{user.displayName}}</p>
    <button v-if="user" @click="closeSesion"><RouterLink to="/">Cerrar sesión</RouterLink></button>
    <button v-else @click="login"><RouterLink to="/">Iniciar sesión</RouterLink></button>
</template>
