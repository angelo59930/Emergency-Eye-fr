<template>
  <NavBar />
  <v-container class="py-4">
    <v-row class="mb-6">
      <v-col cols="12" sm="6">
        <div class="d-flex align-center">
          <v-icon size="32" color="primary" class="mr-3">mdi-cog</v-icon>
          <h1 class="text-h4 font-weight-bold mb-0">Configuración</h1>
        </div>
      </v-col>
    </v-row>

    <v-card class="mb-4">
      <v-card-title>Preferencias del Sistema</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-switch
              v-model="settings.darkMode"
              label="Modo Oscuro"
              color="primary"
              hide-details
            ></v-switch>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="settings.language"
              :items="languages"
              label="Idioma"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>Notificaciones</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-switch
              v-model="settings.emailNotifications"
              label="Notificaciones por Email"
              color="primary"
              hide-details
            ></v-switch>
          </v-col>
          <v-col cols="12" md="6">
            <v-switch
              v-model="settings.pushNotifications"
              label="Notificaciones Push"
              color="primary"
              hide-details
            ></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Cuenta</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userProfile.email"
              label="Email"
              readonly
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userProfile.role"
              label="Rol"
              readonly
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveSettings">
          Guardar Cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';

const settings = ref({
  darkMode: false,
  language: 'es',
  emailNotifications: true,
  pushNotifications: true
});

const userProfile = ref({
  email: 'admin@emergency.com',
  role: 'Administrador'
});

const languages = [
  { title: 'Español', value: 'es' },
  { title: 'English', value: 'en' }
];

const saveSettings = () => {
  // TODO: Implement settings save functionality
  console.log('Settings saved:', settings.value);
};
</script>
