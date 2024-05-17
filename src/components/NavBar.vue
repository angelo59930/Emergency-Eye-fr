<template>
  <v-app-bar app color="#23a98d" flat>
    <!--ver si es planteable el hacer quye la busqueda sea de color blanco como el figma-->
    <v-text-field filled class="mx-4" hide-details label="Buscar ambulancia" prepend-inner-icon="mdi-magnify"
       rounded ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn text to="/link1">TRASLADOS</v-btn>
    <v-btn text to="/link2">CHOFER</v-btn>
    <v-btn text to="/link3">AMBULANCIAS</v-btn>
    <v-btn text to="/link4">PACIENTES</v-btn>
  </v-app-bar>
</template>

<script setup>
</script>
