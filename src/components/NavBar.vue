<template>
  <v-app-bar app elevation="1" class="navbar">
    <v-container class="d-flex align-center py-0">
      <!-- Logo y nombre -->
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-img src="/src/assets/ambulance.svg" width="32" height="32" class="mr-2" />
        <span class="text-h6 font-weight-bold primary-text">Emergency Eye</span>
      </router-link>

      <v-spacer />

      <!-- Búsqueda -->
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Buscar ambulancia, paciente o traslado"
        single-line
        hide-details
        density="compact"
        variant="solo-filled"
        rounded
        class="mx-4 search-field"
        bg-color="grey-lighten-4"
      />

      <v-spacer />

      <!-- Navegación principal -->
      <div class="d-flex align-center">
        <v-btn
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :prepend-icon="item.icon"
          variant="text"
          rounded
          class="mx-1"
          :class="{ 'active-link': isCurrentRoute(item.path) }"
        >
          {{ item.title }}
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const search = ref('');

const menuItems = [
  { title: 'Traslados', path: '/transfers', icon: 'mdi-ambulance' },
  { title: 'Personal', path: '/personnel', icon: 'mdi-account-group' },
  { title: 'Ambulancias', path: '/ambulances', icon: 'mdi-car-emergency' },
  { title: 'Pacientes', path: '/patients', icon: 'mdi-account-heart' },
];

const isCurrentRoute = (path) => route.path === path;
</script>

<style scoped>
.navbar {
  background-color: white !important;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
}

.primary-text {
  color: #23a98d;
}

.search-field {
  max-width: 400px;
  transition: all 0.2s ease;
}

.search-field:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.active-link {
  color: #23a98d !important;
  background-color: #e8f5f1;
}

.v-btn {
  text-transform: none !important;
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: all 0.2s ease;
}

.v-btn:hover {
  transform: translateY(-1px);
}
</style>
