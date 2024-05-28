<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <v-container>
    <v-row>
      <v-col cols="4">
        <h2>Gestor de <b>Pacientes</b></h2>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-btn color="#23a98d">Agregar Paciente</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table :headers="headers" :items="patients" class="elevation-1">
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
  { title: 'Nombre', value: 'name' },
  { title: 'Obra Social', value: 'socialWork' },
  { title: 'DNI', value: 'dni' },
  { title: 'Edad', value: 'age' },
  { title: 'Teléfono', value: 'phone' },
  { title: 'Dirección', value: 'address' },
  { title: 'Acciones', value: 'action', sortable: false },
]

const patients = ref([
  { id: 1, name: 'Juan Perez', socialWork: 'OSDE', dni: '12345678', age: 30, phone: '1234567890', address: 'Calle Falsa 123' },
  { id: 2, name: 'Pedro Rodriguez', socialWork: 'Swiss Medical', dni: '87654321', age: 25, phone: '0987654321', address: 'Avenida Siempreviva 742' },
  { id: 3, name: 'Maria Lopez', socialWork: 'Galeno', dni: '11111111', age: 40, phone: '1122334455', address: 'Calle Falsa 456' },
  // Añade más datos de prueba aquí
])

const editItem = (item) => {
  console.log('Edit item', item)
}

const deleteItem = (item) => {
  console.log('Delete item', item)
}


</script>