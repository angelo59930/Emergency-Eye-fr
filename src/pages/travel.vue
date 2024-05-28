<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <v-container>
    <v-row>
      <v-col cols="4">
        <h2>Gestor de <b>Traslados</b></h2>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-btn color="#23a98d">Agregar traslado</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table :headers="headers" :items="travels" class="elevation-1">
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
  { title: 'Origen', value: 'origin' },
  { title: 'Destino', value: 'destination' },
  { title: 'Estado', value: 'status' },
  { title: 'Prioridad', value: 'priority'},
  { title: 'Fecha', value: 'date'},
  { title: 'Paciente', value: 'patient'},
  { title: 'Acciones', value: 'action', sortable: false },

]

const travels = ref([
  { origin: 'Hospital Regional', destination: 'Hospital de niños', status: 'Espera', priority: 'Alta', date: '2021-10-10', patient: 'Juan Perez' },
  { origin: 'Hospital Regional', destination: 'Hospital de niños', status: 'Espera', priority: 'Media', date: '2021-10-10', patient: 'Pedro Rodriguez' },
  { origin: 'Hospital Regional', destination: 'Hospital de niños', status: 'Espera', priority: 'Baja', date: '2021-10-10', patient: 'Maria Lopez' },
  // Añade más datos de prueba aquí
])

const editItem = (item) => {
  console.log('Edit item', item)
}

const deleteItem = (item) => {
  console.log('Delete item', item)
}


</script>