<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <v-container class="py-4">
    <!-- Encabezado -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6">
        <div class="d-flex align-center">
          <v-icon size="32" color="primary" class="mr-3">mdi-account-heart</v-icon>
          <h1 class="text-h4 font-weight-bold mb-0">Gestor de Pacientes</h1>
        </div>
        <p class="text-subtitle-1 text-grey-darken-1 mt-2 mb-0">
          Administra los pacientes y su información personal
        </p>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex align-center justify-end">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="large"
          @click="addPatient"
        >
          Agregar Paciente
        </v-btn>
      </v-col>
    </v-row>

    <!-- Tabla de Pacientes -->
    <v-card variant="outlined" class="mb-6">
      <v-card-item>
        <v-card-title class="text-h6">Lista de Pacientes</v-card-title>
      </v-card-item>
      <v-divider />
      <v-data-table
        :headers="headers"
        :items="patients"
        :loading="loading"
        hover
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            icon="mdi-pencil"
            variant="text"
            size="small"
            color="primary"
            class="mr-2"
            @click="editItem(item.raw)"
          />
          <v-btn
            icon="mdi-delete"
            variant="text"
            size="small"
            color="error"
            @click="deleteItem(item.raw)"
          />
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialogo para agregar/editar paciente -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="px-4 py-3 bg-primary">
          <span class="text-h5 text-white">{{ isEditing ? 'Editar Paciente' : 'Nuevo Paciente' }}</span>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="currentPatient.name"
                  label="Nombre"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="currentPatient.lastName"
                  label="Apellido"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="currentPatient.document"
                  label="Documento"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="currentPatient.socialSecurity"
                  label="Seguridad Social"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="currentPatient.socialSecurityNumber"
                  label="Número de Seguridad Social"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="currentPatient.gender"
                  :items="['Masculino', 'Femenino', 'Otro']"
                  label="Género"
                  variant="outlined"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="currentPatient.birthDate"
                  label="Fecha de Nacimiento"
                  type="date"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            color="grey"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            class="ml-2"
            @click="savePatient"
            :loading="saving"
          >
            {{ isEditing ? 'Guardar Cambios' : 'Guardar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { ref, onMounted } from 'vue'
import {PatientApi} from '@/services/Apis/PatientService'

const patientApi = new PatientApi('http://localhost:8081/api/v1')

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'name' },
  { title: 'Apellido', key: 'lastName' },
  { title: 'Documento', key: 'document' },
  { title: 'Seguridad Social', key: 'socialSecurity' },
  { title: 'Número de Seguridad Social', key: 'socialSecurityNumber' },
  { title: 'Género', key: 'gender' },
  { title: 'Fecha de Nacimiento', key: 'birthDate' },
  { title: 'Acciones', key: 'action', sortable: false },
]

const patients = ref([])
const loading = ref(false)
const saving = ref(false)
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
  loading.value = true
  try {
    const response = await patientApi.getPatients()
    patients.value = response
  } catch (error) {
    console.error('Error al obtener pacientes:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.stat-card {
  transition: all 0.2s ease-in-out;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.v-data-table {
  background: transparent !important;
}

.v-data-table-header {
  background: #f5f5f5;
}
</style>
