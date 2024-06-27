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

<script>
import router from '@/router';
import { LoginApi } from '@/services/LoginService';

export default {
  data() {
    return {
      valid: true,
      login: {
        username: '',
        password: '',
      },
      usernameRules: [
        v => !!v || 'El nombre de usuario es requerido',
      ],
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
      ],
    };
  },
  methods: {
    async submit() {
      console.log("enviar datos: " + this.login.username + " " + this.login.password)
      if (this.$refs.form.validate()) {
        try {
          let loginApi = new LoginApi("http://127.0.0.1:8081/api/v1");
          const response = await loginApi.login(this.login);
          console.log(response)
          sessionStorage.setItem('token', response);
          router.push("/");
        } catch (error) {
          console.error('Error en el login:', error);
        }
      }
    },
  },
};
</script>