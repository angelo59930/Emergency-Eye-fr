<template>
  <v-app-bar app color="#23a98d" flat>
    <!--ver si es planteable el hacer quye la busqueda sea de color blanco como el figma-->
    <v-text-field filled class="mx-4" hide-details label="Buscar ambulancia" prepend-inner-icon="mdi-magnify"
      rounded></v-text-field>
    <!-- solucion temporal -->
    <v-btn text to="/">HOME</v-btn>

    <v-spacer></v-spacer>
    <v-btn text to="/travel">TRASLADOS</v-btn>
    <v-btn text to="/user">PERSONAL</v-btn>
    <v-btn text to="/ambulance">AMBULANCIAS</v-btn>
    <v-btn text to="/patient">PACIENTES</v-btn>
  </v-app-bar>
</template>

<script setup>
</script>
