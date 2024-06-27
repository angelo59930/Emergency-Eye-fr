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
        <v-btn color="#23a98d" @click="addPatient">Agregar Paciente</v-btn>
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

  <!-- Dialogo para agregar/editar paciente -->
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ isEditing ? 'Editar Paciente' : 'Nuevo Paciente' }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="currentPatient.name" label="Nombre" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="currentPatient.lastName" label="Apellido" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="currentPatient.document" label="Documento" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="currentPatient.socialSecurity" label="Seguridad Social" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="currentPatient.socialSecurityNumber" label="Número de Seguridad Social"
                required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select v-model="currentPatient.gender" :items="['Masculino', 'Femenino', 'Otro']" label="Género"
                required></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="currentPatient.birthDate" label="Fecha de Nacimiento" type="date"
                required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="savePatient">{{ isEditing ? 'Guardar Cambios' : 'Guardar' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref, onMounted } from 'vue'
import {PatientApi} from '@/services/PatientService'

const patientApi = new PatientApi('http://127.0.0.1:8081/api/v1')

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Nombre', value: 'name' },
  { title: 'Apellido', value: 'lastName' },
  { title: 'Documento', value: 'document' },
  { title: 'Seguridad Social', value: 'socialSecurity' },
  { title: 'Número de Seguridad Social', value: 'socialSecurityNumber' },
  { title: 'Género', value: 'gender' },
  { title: 'Fecha de Nacimiento', value: 'birthDate' },
  { title: 'Acciones', value: 'action', sortable: false },
]

const patients = ref([])

const dialog = ref(false)
const isEditing = ref(false)
const currentPatient = ref({
  id: null,
  name: '',
  lastName: '',
  document: '',
  socialSecurity: '',
  socialSecurityNumber: '',
  gender: '',
  birthDate: ''
})

const addPatient = () => {
  isEditing.value = false
  resetCurrentPatient()
  dialog.value = true
}

const editItem = (item) => {
  isEditing.value = true
  currentPatient.value = { ...item }
  dialog.value = true
}

const deleteItem = async (item) => {
  try {
    await patientApi.deletePatient(item.id)
    const index = patients.value.findIndex(patient => patient.id === item.id)
    if (index !== -1) {
      patients.value.splice(index, 1)
    }
  } catch (error) {
    console.error('Error al eliminar paciente:', error)
  }
}

const savePatient = async () => {
  try {
    if (isEditing.value) {
      await patientApi.updatePatient(currentPatient.value)
      const index = patients.value.findIndex(patient => patient.id === currentPatient.value.id)
      if (index !== -1) {
        patients.value[index] = { ...currentPatient.value }
      }
    } else {
      const response = await patientApi.createPatient(currentPatient.value)
      patients.value.push(response)
    }
    dialog.value = false
  } catch (error) {
    console.error('Error al guardar paciente:', error)
  }
}

const resetCurrentPatient = () => {
  currentPatient.value = {
    id: null,
    name: '',
    lastName: '',
    document: '',
    socialSecurity: '',
    socialSecurityNumber: '',
    gender: '',
    birthDate: ''
  }
}


onMounted(async () => {
  try {
    const response = await patientApi.getPatients()
    patients.value = response
  } catch (error) {
    console.error('Error al obtener pacientes:', error)
  }
})
</script>

<style scoped>
/* estilos */
</style>
