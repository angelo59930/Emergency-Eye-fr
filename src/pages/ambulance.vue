<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <v-container class="py-4">
    <!-- Encabezado -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6">
        <div class="d-flex align-center">
          <v-icon size="32" color="primary" class="mr-3">mdi-ambulance</v-icon>
          <h1 class="text-h4 font-weight-bold mb-0">Gestor de Ambulancias</h1>
        </div>
        <p class="text-subtitle-1 text-grey-darken-1 mt-2 mb-0">
          Administra tu flota de ambulancias y su estado actual
        </p>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex align-center justify-end">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="large"
          @click="dialogNew = true"
        >
          Agregar Ambulancia
        </v-btn>
      </v-col>
    </v-row>

    <!-- Estadísticas -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" variant="outlined">
          <v-card-item>
            <v-card-title class="text-grey-darken-1 text-subtitle-1">Total Ambulancias</v-card-title>
            <div class="text-h4 font-weight-bold mt-2">
              {{ ambulances.length }}
              <v-icon color="primary" size="x-large">mdi-ambulance</v-icon>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" variant="outlined">
          <v-card-item>
            <v-card-title class="text-grey-darken-1 text-subtitle-1">Disponibles</v-card-title>
            <div class="text-h4 font-weight-bold mt-2 text-success">
              {{ getAmbulancesByStatus('AVAILABLE') }}
              <v-icon color="success" size="x-large">mdi-check-circle</v-icon>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" variant="outlined">
          <v-card-item>
            <v-card-title class="text-grey-darken-1 text-subtitle-1">En Servicio</v-card-title>
            <div class="text-h4 font-weight-bold mt-2 text-warning">
              {{ getAmbulancesByStatus('ON_DUTY') }}
              <v-icon color="warning" size="x-large">mdi-clock</v-icon>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" variant="outlined">
          <v-card-item>
            <v-card-title class="text-grey-darken-1 text-subtitle-1">En Mantenimiento</v-card-title>
            <div class="text-h4 font-weight-bold mt-2 text-error">
              {{ getAmbulancesByStatus('MAINTENANCE') }}
              <v-icon color="error" size="x-large">mdi-wrench</v-icon>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tabla de Ambulancias -->
    <v-card variant="outlined" class="mb-6">
      <v-card-item>
        <v-card-title class="text-h6">Lista de Ambulancias</v-card-title>
      </v-card-item>
      <v-divider />
      <v-data-table
        :headers="headers"
        :items="ambulances"
        :loading="loading"
        hover
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
            variant="tonal"
          >
            {{ formatStatus(item.status) }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
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

    <!-- Edit dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="px-4 py-3 bg-primary">
          <span class="text-h5 text-white">Editar Ambulancia</span>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedItem.licensePlate"
                  label="Patente"
                  variant="outlined"
                  :rules="[v => !!v || 'La patente es requerida']"
                  placeholder="Ej: ABC123"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedItem.telephone"
                  label="Teléfono"
                  variant="outlined"
                  placeholder="Ej: +598 99 123 456"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="selectedItem.status"
                  :items="statusOptions"
                  label="Estado"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer />
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
            @click="save"
            :loading="saving"
          >
            Guardar Cambios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Create dialog -->
    <v-dialog v-model="dialogNew" max-width="600px">
      <v-card>
        <v-card-title class="px-4 py-3 bg-primary">
          <span class="text-h5 text-white">Agregar Nueva Ambulancia</span>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newItem.licensePlate"
                  label="Patente*"
                  variant="outlined"
                  :rules="[v => !!v || 'La patente es requerida']"
                  placeholder="Ej: ABC123"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newItem.telephone"
                  label="Teléfono"
                  variant="outlined"
                  placeholder="Ej: +598 99 123 456"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="newItem.status"
                  :items="statusOptions"
                  label="Estado Inicial"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            variant="outlined"
            color="grey"
            @click="dialogNew = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            class="ml-2"
            @click="add"
            :loading="saving"
          >
            Crear Ambulancia
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';
import useAmbulanceService from '@/services/useAmbulanceService';

const { ambulances, getAmbulances, addAmbulance, updateAmbulance, removeAmbulance } = useAmbulanceService();

const dialog = ref(false);
const dialogNew = ref(false);
const selectedItem = ref({});
const newItem = ref({ status: 'AVAILABLE' });
const loading = ref(false);
const saving = ref(false);

const headers = [
  { title: 'Patente', key: 'licensePlate', align: 'start', sortable: true },
  { title: 'Teléfono', key: 'telephone', align: 'start' },
  { title: 'Estado', key: 'status', align: 'start', sortable: true },
  { title: 'Acciones', key: 'actions', align: 'end', sortable: false },
];

const statusOptions = [
  { title: 'Disponible', value: 'AVAILABLE' },
  { title: 'En Servicio', value: 'ON_DUTY' },
  { title: 'Fuera de Servicio', value: 'OUT_OF_SERVICE' },
  { title: 'En Mantenimiento', value: 'MAINTENANCE' },
];

onMounted(async () => {
  loading.value = true;
  try {
    await getAmbulances();
  } catch (error) {
    console.error('Error loading ambulances:', error);
  } finally {
    loading.value = false;
  }
});

const getStatusColor = (status) => {
  const colors = {
    'AVAILABLE': 'success',
    'ON_DUTY': 'warning',
    'OUT_OF_SERVICE': 'error',
    'MAINTENANCE': 'info'
  };
  return colors[status] || 'grey';
};

const formatStatus = (status) => {
  const labels = {
    'AVAILABLE': 'Disponible',
    'ON_DUTY': 'En Servicio',
    'OUT_OF_SERVICE': 'Fuera de Servicio',
    'MAINTENANCE': 'En Mantenimiento'
  };
  return labels[status] || status;
};

const getAmbulancesByStatus = (status) => {
  return ambulances.value.filter(amb => amb.status === status).length;
};

const editItem = (item) => {
  selectedItem.value = { ...item };
  dialog.value = true;
};

const deleteItem = async (item) => {
  if (confirm('¿Está seguro que desea eliminar esta ambulancia?')) {
    saving.value = true;
    try {
      await removeAmbulance(item.id);
    } catch (error) {
      console.error('Error deleting ambulance:', error);
    } finally {
      saving.value = false;
    }
  }
};

const save = async () => {
  saving.value = true;
  try {
    await updateAmbulance(selectedItem.value);
    dialog.value = false;
  } catch (error) {
    console.error('Error saving ambulance:', error);
  } finally {
    saving.value = false;
  }
};

const add = async () => {
  saving.value = true;
  try {
    await addAmbulance(newItem.value);
    dialogNew.value = false;
    newItem.value = { status: 'AVAILABLE' };
  } catch (error) {
    console.error('Error adding ambulance:', error);
  } finally {
    saving.value = false;
  }
};
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
