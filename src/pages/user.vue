<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <v-container>
    <v-row>
      <v-col cols="4">
        <h2>Gestor de <b>Choferes</b></h2>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-btn color="#23a98d">Agregar Chofer</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table :headers="headers" :items="drivers" class="elevation-1">
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Nombre', value: 'name' },
  { title: 'Acciones', value: 'action', sortable: false },
]

const drivers = ref([
  { id: 1, name: 'Juan Perez' },
  { id: 2, name: 'Pedro Rodriguez' },
  { id: 3, name: 'Maria Lopez' },
  // Añade más datos de prueba aquí
])

const editItem = (item) => {
  console.log('Edit item', item)
}

const deleteItem = (item) => {
  console.log('Delete item', item)
}


</script>