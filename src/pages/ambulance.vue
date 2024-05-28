<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <v-container>
    <v-row>
      <v-col cols="4">
        <h2>Gestor de <b>Ambulancias</b></h2>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-btn color="#23a98d">Agregar Ambulancia</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table :headers="headers" :items="ambulances" class="elevation-1">
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Modelo', value: 'model' },
  { title: 'Año', value: 'year' },
  { title: 'Acciones', value: 'action', sortable: false },
]

const ambulances = ref([
  { id: 1, model: 'Modelo 1', year: 2020 },
  { id: 2, model: 'Modelo 2', year: 2021 },
  { id: 3, model: 'Modelo 3', year: 2022 },
  // Añade más datos de prueba aquí
])

const editItem = (item) => {
  console.log('Edit item', item)
}

const deleteItem = (item) => {
  console.log('Delete item', item)
}
</script>