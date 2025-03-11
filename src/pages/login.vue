<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-h5">Inicio de Sesión</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="login.username" :rules="usernameRules" label="Nombre de usuario"
                required></v-text-field>
              <v-text-field v-model="login.password" :rules="passwordRules" label="Contraseña" type="password"
                required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" color="primary" @click="submit">Iniciar Sesión</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginService } from '@/services/useLoginService';

const valid = ref(true);
const login = ref({
  username: '',
  password: ''
});

const usernameRules = [
  v => !!v || 'El nombre de usuario es requerido',
];

const passwordRules = [
  v => !!v || 'La contraseña es requerida',
];

const router = useRouter();
const { loginUser } = useLoginService();

const submit = async () => {
  console.log(`enviar datos: ${login.value.username} ${login.value.password}`);
  if (valid.value) {
    try {
      const response = await loginUser(login.value);
      console.log(response);
      sessionStorage.setItem('token', response);
      router.push("/");
    } catch (error) {
      console.error('Error en el login:', error);
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}

.v-card-title {
  background-color: #23a98d;
  color: white;
}
</style>
