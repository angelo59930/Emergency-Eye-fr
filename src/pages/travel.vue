<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <v-container class="py-4">
    <!-- Encabezado -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6">
        <div class="d-flex align-center">
          <v-icon size="32" color="primary" class="mr-3">mdi-ambulance</v-icon>
          <h1 class="text-h4 font-weight-bold mb-0">Gestor de Traslados</h1>
        </div>
        <p class="text-subtitle-1 text-grey-darken-1 mt-2 mb-0">
          Administra los traslados médicos y su estado actual
        </p>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex align-center justify-end">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="large"
          @click="addTransfer"
        >
          Agregar Traslado
        </v-btn>
      </v-col>
    </v-row>

    <!-- Estadísticas -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" variant="outlined">
          <v-card-item>
            <v-card-title class="text-grey-darken-1 text-subtitle-1">Total Traslados</v-card-title>
            <div class="text-h4 font-weight-bold mt-2">
              {{ travels.length }}
              <v-icon color="primary" size="x-large">mdi-ambulance</v-icon>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" variant="outlined">
          <v-card-item>
            <v-card-title class="text-grey-darken-1 text-subtitle-1">En Espera</v-card-title>
            <div class="text-h4 font-weight-bold mt-2 text-success">
              {{ getTransfersByStatus('Espera') }}
              <v-icon color="success" size="x-large">mdi-clock</v-icon>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" variant="outlined">
          <v-card-item>
            <v-card-title class="text-grey-darken-1 text-subtitle-1">En Progreso</v-card-title>
            <div class="text-h4 font-weight-bold mt-2 text-warning">
              {{ getTransfersByStatus('En Progreso') }}
              <v-icon color="warning" size="x-large">mdi-run</v-icon>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" variant="outlined">
          <v-card-item>
            <v-card-title class="text-grey-darken-1 text-subtitle-1">Completados</v-card-title>
            <div class="text-h4 font-weight-bold mt-2 text-info">
              {{ getTransfersByStatus('Completado') }}
              <v-icon color="info" size="x-large">mdi-check-circle</v-icon>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tabla de Traslados -->
    <v-card variant="outlined" class="mb-6">
      <v-card-item>
        <v-card-title class="text-h6">Lista de Traslados</v-card-title>
      </v-card-item>
      <v-divider />
      <v-data-table
        :headers="headers"
        :items="travels"
        :loading="loading"
        hover
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
            variant="tonal"
          >
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            icon="mdi-pencil"
            variant="text"
            size="small"
            color="primary"
            class="mr-2"
            @click="editItem(item)"
          />
          <v-btn
            icon="mdi-delete"
            variant="text"
            size="small"
            color="error"
            @click="deleteItem(item)"
          />
        </template>
      </v-data-table>
    </v-card>

    <!-- Diálogo para Agregar/Editar Traslado -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="px-4 py-3 bg-primary">
          <span class="text-h5 text-white">{{ isEditing ? 'Editar Traslado' : 'Nuevo Traslado' }}</span>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="currentTransfer.origin"
                  label="Origen"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="currentTransfer.destination"
                  label="Destino"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="currentTransfer.priority"
                  :items="['Alta', 'Media', 'Baja']"
                  label="Prioridad"
                  variant="outlined"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="currentTransfer.date"
                  label="Fecha"
                  type="date"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="currentTransfer.patient"
                  label="Paciente"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="currentTransfer.status"
                  :items="['Espera', 'En Progreso', 'Completado']"
                  label="Estado"
                  variant="outlined"
                  required
                ></v-select>
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
            @click="saveTransfer"
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
import { ref, computed } from 'vue'

const headers = [
  { title: 'Origen', key: 'origin' },
  { title: 'Destino', key: 'destination' },
  { title: 'Estado', key: 'status' },
  { title: 'Prioridad', key: 'priority' },
  { title: 'Fecha', key: 'date' },
  { title: 'Paciente', key: 'patient' },
  { title: 'Acciones', key: 'action', sortable: false },
]

const travels = ref([
  { origin: 'Hospital Regional', destination: 'Hospital de niños', status: 'Espera', priority: 'Alta', date: '2021-10-10', patient: 'Juan Perez' },
  { origin: 'Hospital Regional', destination: 'Hospital de niños', status: 'Espera', priority: 'Media', date: '2021-10-10', patient: 'Pedro Rodriguez' },
  { origin: 'Hospital Regional', destination: 'Hospital de niños', status: 'Espera', priority: 'Baja', date: '2021-10-10', patient: 'Maria Lopez' },
  // Añade más datos de prueba aquí
])

const loading = ref(false)
const saving = ref(false)
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

const getStatusColor = (status) => {
  const colors = {
    'Espera': 'success',
    'En Progreso': 'warning',
    'Completado': 'info'
  };
  return colors[status] || 'grey';
};

const getTransfersByStatus = (status) => {
  return travels.value.filter(t => t.status === status).length;
};

const addTransfer = () => {
  isEditing.value = false
  currentTransfer.value = {
    origin: '',
    destination: '',
    priority: '',
    date: '',
    patient: '',
    status: ''
  }
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

const saveTransfer = async () => {
  saving.value = true
  try {
    if (isEditing.value) {
      const index = travels.value.findIndex(travel => travel.id === currentTransfer.value.id)
      if (index !== -1) {
        travels.value[index] = { ...currentTransfer.value }
      }
    } else {
      travels.value.push({ ...currentTransfer.value })
    }
    dialog.value = false
  } catch (error) {
    console.error('Error al guardar el traslado:', error)
  } finally {
    saving.value = false
  }
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
.stat-card {
  transition: all 0.2s ease-in-out;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

:deep(.v-data-table) {
  background: transparent !important;
}

:deep(.v-data-table-header) {
  background: #f5f5f5;
}
</style>
