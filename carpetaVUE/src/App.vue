<script setup>
import { useRouter } from 'vue-router';
import { getCurrentUser,useCurrentUser} from 'vuefire';

const router = useRouter();
const user = useCurrentUser();

router.beforeEach(async(to, from) => 
{
  if(to.meta.requiresAuth)
  {
    const user = await  getCurrentUser();
    if(!user)
    {
      return false
    }
    else{
      return true
    }
  }
  else
    {
      return true
    }
})
</script>

<template>
  <header>
    <nav>
      <button> <RouterLink to="/">Inicio</RouterLink></button>
          <div v-if="user">
          <button><RouterLink to="/login">Ir a cerrar sesion</RouterLink></button>
          <RouterLink to="/recordatorios">Recordatorios</RouterLink> 
        </div>
        <div v-else>
          <button><RouterLink to="/login">Login</RouterLink></button>
          <button> <RouterLink to="/registro">Registro</RouterLink></button>
        </div>
        <RouterView></RouterView>
    </nav>
  </header>
</template>

<style scoped>
  header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(255, 255, 255);
    width: 100%;
  }
  nav{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1px;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid black;
  }
  button{
    margin-left: 10px;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    color: blue;
  }
  
</style>