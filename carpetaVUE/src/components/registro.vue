<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const register = async () => {
    if (password.value !== confirmPassword.value) {
        errorMessage.value = "Las contraseñas no coinciden";
        successMessage.value = "";
        return;
    }
    const auth = getAuth();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        successMessage.value = "Usuario registrado con éxito.";
        errorMessage.value = "";
    } catch (error) {
        errorMessage.value = "Error al registrar: " + error.message;
        successMessage.value = "";
    }
};
</script>

<template>
    <div>
        <h1>FORMULARIO DE REGISTRO</h1>
        <form @submit.prevent="register">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" placeholder="Introduzca su nombre">
            <label for="correo">Correo</label>
            <input type="email" id="correo" v-model="email" placeholder="Introduzca su correo">
            <label for="contraseña">Contraseña</label>
            <input type="password" id="contraseña" v-model="password" placeholder="Introduce tu contraseña">
            <label for="verificacion_contraseña">Verificación de contraseña</label>
            <input type="password" id="verificacion_contraseña" v-model="confirmPassword" placeholder="Repite tu contraseña">
            <input type="submit" value="Registrarse">
        </form>
        <!-- Mensajes de error o éxito -->
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
</template>
