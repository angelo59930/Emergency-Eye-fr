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
        <v-btn color="#23a98d" @click="addTransfer">Agregar traslado</v-btn>
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

  <!-- Dialogo para agregar/editar traslado -->
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ isEditing ? 'Editar Traslado' : 'Nuevo Traslado' }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="currentTransfer.origin" label="Origen" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="currentTransfer.destination" label="Destino" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select v-model="currentTransfer.priority" :items="['Alta', 'Media', 'Baja']" label="Prioridad"
                required></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="currentTransfer.date" label="Fecha" type="date" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="currentTransfer.patient" label="Paciente" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select v-model="currentTransfer.status" :items="['Espera', 'En Progreso', 'Completado']" label="Estado"
                required></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="saveTransfer">{{ isEditing ? 'Guardar Cambios' : 'Guardar' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'

const headers = [
  { title: 'Origen', value: 'origin' },
  { title: 'Destino', value: 'destination' },
  { title: 'Estado', value: 'status' },
  { title: 'Prioridad', value: 'priority' },
  { title: 'Fecha', value: 'date' },
  { title: 'Paciente', value: 'patient' },
  { title: 'Acciones', value: 'action', sortable: false },
]

const travels = ref([
  { origin: 'Hospital Regional', destination: 'Hospital de niños', status: 'Espera', priority: 'Alta', date: '2021-10-10', patient: 'Juan Perez' },
  { origin: 'Hospital Regional', destination: 'Hospital de niños', status: 'Espera', priority: 'Media', date: '2021-10-10', patient: 'Pedro Rodriguez' },
  { origin: 'Hospital Regional', destination: 'Hospital de niños', status: 'Espera', priority: 'Baja', date: '2021-10-10', patient: 'Maria Lopez' },
  // Añade más datos de prueba aquí
])

const dialog = ref(false)
const isEditing = ref(false)
const currentTransfer = ref({
  origin: '',
  destination: '',
  priority: '',
  date: '',
  patient: '',
  status: ''
})

const addTransfer = () => {
  isEditing.value = false
  resetCurrentTransfer()
  dialog.value = true
}

const editItem = (item) => {
  isEditing.value = true
  currentTransfer.value = { ...item }
  dialog.value = true
}

const deleteItem = (item) => {
  const index = travels.value.indexOf(item)
  if (index !== -1) {
    travels.value.splice(index, 1)
  }
}

const saveTransfer = () => {
  if (isEditing.value) {
    const index = travels.value.findIndex(travel => travel.origin === currentTransfer.value.origin && travel.date === currentTransfer.value.date)
    if (index !== -1) {
      travels.value[index] = { ...currentTransfer.value }
    }
  } else {
    travels.value.push({ ...currentTransfer.value })
  }
  dialog.value = false
}

const resetCurrentTransfer = () => {
  currentTransfer.value = {
    origin: '',
    destination: '',
    priority: '',
    date: '',
    patient: '',
    status: ''
  }
}
</script>

<style scoped>
/* estilos */
</style>
