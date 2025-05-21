<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container fluid class="pa-0 fill-height">
        <v-row no-gutters class="fill-height">
          <!-- Panel lateral izquierdo -->
          <v-col cols="3" class="border-r">
            <v-container>
              <!-- Estadísticas -->
              <v-row class="mb-4">
                <v-col cols="12">
                  <v-card class="mb-4 stats-card" elevation="2" rounded="lg">
                    <v-card-text class="pa-6">
                      <div class="d-flex align-center mb-2">
                        <v-icon size="32" color="primary" icon="mdi-ambulance" class="mr-3" />
                        <div class="text-h4 font-weight-bold primary--text">{{ stats.totalAmbulances }}</div>
                      </div>
                      <div class="text-subtitle-1 text-medium-emphasis">Ambulancias Totales</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card class="mb-2 stats-card" elevation="2" rounded="lg">
                    <v-card-text class="pa-4">
                      <div class="d-flex align-center justify-center mb-2">
                        <v-icon size="28" color="success" icon="mdi-check-circle" class="mr-2" />
                        <div class="text-h5 font-weight-bold success--text">{{ stats.availableAmbulances }}</div>
                      </div>
                      <div class="text-caption text-center text-medium-emphasis">Disponibles</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card class="mb-2 stats-card" elevation="2" rounded="lg">
                    <v-card-text class="pa-4">
                      <div class="d-flex align-center justify-center mb-2">
                        <v-icon size="28" color="info" icon="mdi-car-arrow-right" class="mr-2" />
                        <div class="text-h5 font-weight-bold info--text">{{ stats.onDutyAmbulances }}</div>
                      </div>
                      <div class="text-caption text-center text-medium-emphasis">En Servicio</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Lista de ambulancias -->
              <div class="d-flex align-center justify-space-between mb-4">
                <h2 class="text-h6 font-weight-bold">Estado de Unidades</h2>
              </div>

              <!-- Lista de ambulancias -->
              <v-card v-for="ambulance in ambulances" :key="ambulance.id" class="mb-3 ambulance-card" elevation="1"
                rounded="lg" hover>
                <v-card-item>
                  <template v-slot:prepend>
                    <v-avatar :color="getStatusColor(ambulance.status)" size="42" class="elevation-1">
                      <v-icon size="24" color="white" icon="mdi-ambulance" />
                    </v-avatar>
                  </template>
                  <v-card-title class="font-weight-bold">Ambulancia {{ ambulance.licensePlate }}</v-card-title>
                  <v-card-subtitle class="mt-1">
                    <v-chip :color="getStatusColor(ambulance.status)" size="small" variant="tonal"
                      class="font-weight-medium">
                      {{ ambulance.status === 'AVAILABLE' ? 'Disponible' :
                        ambulance.status === 'ON_DUTY' ? 'En Servicio' :
                          ambulance.status === 'MAINTENANCE' ? 'En Mantenimiento' : 'Fuera de Servicio' }}
                    </v-chip>
                  </v-card-subtitle>
                </v-card-item>
              </v-card>
            </v-container>
          </v-col>

          <!-- Mapa y traslados -->
          <v-col>
            <v-container fluid class="fill-height pa-0">
              <v-row no-gutters class="fill-height">
                <!-- Mapa -->
                <v-col cols="12" md="8" class="fill-height">
                  <GeoMap :markers="markers" class="fill-height" />
                </v-col>

                <!-- Panel de traslados -->
                <v-col cols="12" md="4" class="border-l">
                  <v-container>
                    <!-- Estadísticas de traslados -->
                    <v-row class="mb-4">
                      <v-col cols="6">
                        <v-card class="stats-card" elevation="2" rounded="lg">
                          <v-card-text class="pa-4">
                            <div class="d-flex align-center justify-center mb-2">
                              <v-icon size="28" color="warning" icon="mdi-progress-clock" class="mr-2" />
                              <div class="text-h5 font-weight-bold warning--text">{{ stats.activeTransfers }}</div>
                            </div>
                            <div class="text-caption text-center text-medium-emphasis">En Progreso</div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="6">
                        <v-card class="stats-card" elevation="2" rounded="lg">
                          <v-card-text class="pa-4">
                            <div class="d-flex align-center justify-center mb-2">
                              <v-icon size="28" color="success" icon="mdi-check-decagram" class="mr-2" />
                              <div class="text-h5 font-weight-bold success--text">{{ stats.completedTransfers }}</div>
                            </div>
                            <div class="text-caption text-center text-medium-emphasis">Completados</div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>

                    <div class="d-flex align-center justify-space-between mb-4">
                      <h2 class="text-h6 font-weight-bold">Traslados Activos</h2>
                      <v-btn color="primary" prepend-icon="mdi-plus" variant="tonal" @click="showDialog">
                        Nuevo Traslado
                      </v-btn>
                    </div>

                    <!-- Lista de traslados activos -->
                    <v-card v-for="transfer in activeTransfers" :key="transfer.id" class="mb-4 transfer-card"
                      elevation="1" rounded="lg">
                      <v-card-item>
                        <template v-slot:prepend>
                          <v-avatar :color="getPriorityColor(transfer.priority)" size="42" class="elevation-1">
                            <v-icon size="24" color="white" icon="mdi-ambulance" />
                          </v-avatar>
                        </template>
                        <v-card-title class="font-weight-bold d-flex align-center">
                          <span>Traslado #{{ transfer.id }}</span>
                          <v-chip :color="getPriorityColor(transfer.priority)" size="small" variant="tonal"
                            class="ml-2">
                            {{ transfer.priority }}
                          </v-chip>
                          <v-chip color="grey" size="small" variant="flat" class="ml-2">
                            {{ transfer.status }}
                          </v-chip>
                        </v-card-title>
                        <v-card-subtitle>
                          <div class="d-flex align-center mb-3">
                            <v-icon size="16" color="primary" icon="mdi-account" class="mr-2" />
                            <span class="font-weight-medium">{{ transfer.patient.name }} {{ transfer.patient.lastName
                            }}</span>
                            <v-chip size="x-small" class="ml-2" color="grey-lighten-3">
                              {{ transfer.patient.document }}
                            </v-chip>
                          </div>
                          <div class="location-grid">
                            <div class="location-row">
                              <v-icon size="16" color="success" icon="mdi-map-marker" class="location-icon" />
                              <div class="location-label">Origen</div>
                              <div class="location-value text-truncate">{{ transfer.origin }}</div>
                            </div>
                            <v-divider class="my-2" />
                            <div class="location-row">
                              <v-icon size="16" color="error" icon="mdi-map-marker" class="location-icon" />
                              <div class="location-label">Destino</div>
                              <div class="location-value text-truncate">{{ transfer.destination }}</div>
                            </div>
                          </div>
                        </v-card-subtitle>
                      </v-card-item>
                      <v-divider />
                      <v-card-actions class="pa-3">
                        <v-btn color="error" variant="text" density="comfortable" prepend-icon="mdi-delete"
                          @click="deleteTransfer(transfer.id)">
                          Eliminar
                        </v-btn>
                        <v-spacer />
                        <v-btn color="primary" variant="tonal" prepend-icon="mdi-car-emergency"
                          @click="showAssignDialog(transfer)">
                          Asignar Ambulancia
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

      <!-- Dialog para nuevo traslado -->
      <v-dialog
        v-model="newTransferDialog"
        max-width="600px"
        persistent
      >
        <v-card>
          <v-card-title class="text-h5 pa-4 bg-primary text-white">
            Nuevo Traslado
          </v-card-title>
          <v-card-text class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <div class="text-subtitle-1 font-weight-medium mb-2">Información del Paciente</div>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newTransfer.patientName"
                    label="Nombre"
                    variant="outlined"
                    density="comfortable"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newTransfer.patientLastName"
                    label="Apellido"
                    variant="outlined"
                    density="comfortable"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newTransfer.patientDocument"
                    label="DNI"
                    variant="outlined"
                    density="comfortable"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newTransfer.patientSocialSecurity"
                    label="Obra Social"
                    variant="outlined"
                    density="comfortable"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newTransfer.patientSocialSecurityNumber"
                    label="Número de Afiliado"
                    variant="outlined"
                    density="comfortable"
                  />
                </v-col>
                <v-col cols="12" class="pb-0">
                  <div class="text-subtitle-1 font-weight-medium mb-2">Información del Traslado</div>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newTransfer.origin"
                    label="Dirección de Origen"
                    variant="outlined"
                    density="comfortable"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newTransfer.destination"
                    label="Dirección de Destino"
                    variant="outlined"
                    density="comfortable"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="newTransfer.priority"
                    :items="priorityOptions"
                    item-title="title"
                    item-value="value"
                    label="Prioridad"
                    variant="outlined"
                    density="comfortable"
                    required
                  >
                    <template v-slot:selection="{ item }">
                      <v-chip :color="getPriorityColor(item.raw.value)" size="small" variant="tonal" class="mr-2">
                        {{ item.title }}
                      </v-chip>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newTransfer.scheduledTime"
                    label="Hora Programada"
                    type="time"
                    variant="outlined"
                    density="comfortable"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newTransfer.notes"
                    label="Notas Adicionales"
                    variant="outlined"
                    density="comfortable"
                    rows="3"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider />
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn
              color="grey"
              variant="outlined"
              @click="closeNewTransferDialog"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              class="ml-2"
              @click="createTransfer"
              :loading="saving"
              :disabled="!isFormValid"
            >
              Crear Traslado
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog para asignar ambulancia -->
      <v-dialog v-model="assignDialog" max-width="600px">
        <v-card>
          <v-card-title class="text-h5 pa-4 bg-success text-white">
            Asignar Ambulancia
          </v-card-title>
          <v-card-text class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-col cols="12">
                  <div class="d-flex align-center mb-4">
                    <v-avatar :color="getPriorityColor(selectedTransfer?.priority)" size="42" class="mr-3">
                      <v-icon size="24" color="white">mdi-ambulance</v-icon>
                    </v-avatar>
                    <div>
                      <div class="text-h6">Traslado #{{ selectedTransfer?.id }}</div>
                      <div class="text-subtitle-2">{{ selectedTransfer?.patient?.name }} {{ selectedTransfer?.patient?.lastName }}</div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="selectedAmbulance"
                    :items="availableAmbulances"
                    item-title="licensePlate"
                    item-value="id"
                    label="Seleccionar Ambulancia"
                    variant="outlined"
                    density="comfortable"
                    required
                  >
                    <template v-slot:item="{ props, item }">
                      <v-list-item v-bind="props">
                        <template v-slot:prepend>
                          <v-icon color="success">mdi-ambulance</v-icon>
                        </template>
                        <v-list-item-title>Ambulancia {{ item.raw.licensePlate }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item.raw.model }}</v-list-item-subtitle>
                      </v-list-item>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="selectedCrew"
                    :items="availableCrew"
                    item-title="name"
                    item-value="id"
                    label="Personal Médico"
                    variant="outlined"
                    density="comfortable"
                    multiple
                    required
                  >
                    <template v-slot:item="{ props, item }">
                      <v-list-item v-bind="props">
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-account-multiple</v-icon>
                        </template>
                        <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item.raw.role }}</v-list-item-subtitle>
                      </v-list-item>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="assignmentNotes"
                    label="Notas de Asignación"
                    variant="outlined"
                    density="comfortable"
                    rows="3"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider />
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn color="grey" variant="outlined" @click="assignDialog = false">
              Cancelar
            </v-btn>
            <v-btn color="success" class="ml-2" @click="assignAmbulance" :loading="saving">
              Asignar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import mockService from '@/services/mockService';
import NavBar from '@/components/NavBar.vue';
import StateTag from '@/components/StateTag.vue';
import GeoMap from '@/components/GeoMap.vue';
import TravelCard from '@/components/TravelCard.vue';
import * as OpenLocationCode from 'open-location-code';

// Form state
const newTransferDialog = ref(false);
const saving = ref(false);
const loading = ref(false);
const ambulances = ref([]);
const transfers = ref([]);
const activeTransfers = ref([]);

const newTransfer = ref({
  patientName: '',
  patientLastName: '',
  patientDocument: '',
  patientSocialSecurity: '',
  patientSocialSecurityNumber: '',
  origin: '',
  destination: '',
  priority: '',
  scheduledTime: '',
  notes: ''
});

const priorityOptions = [
  { title: 'Alta', value: 'Alta', color: 'error' },
  { title: 'Media', value: 'Media', color: 'warning' },
  { title: 'Baja', value: 'Baja', color: 'success' },
];

const isFormValid = computed(() => {
  return (
    newTransfer.value.patientName &&
    newTransfer.value.patientLastName &&
    newTransfer.value.patientDocument &&
    newTransfer.value.origin &&
    newTransfer.value.destination &&
    newTransfer.value.priority
  );
});

const resetForm = () => {
  newTransfer.value = {
    patientName: '',
    patientLastName: '',
    patientDocument: '',
    patientSocialSecurity: '',
    patientSocialSecurityNumber: '',
    origin: '',
    destination: '',
    priority: '',
    scheduledTime: '',
    notes: ''
  };
};

const closeNewTransferDialog = () => {
  newTransferDialog.value = false;
  resetForm();
};

const createTransfer = async () => {
  if (!isFormValid.value) return;
  
  saving.value = true;
  try {
    const transfer = {
      patient: {
        name: newTransfer.value.patientName,
        lastName: newTransfer.value.patientLastName,
        document: newTransfer.value.patientDocument,
        socialSecurity: newTransfer.value.patientSocialSecurity,
        socialSecurityNumber: newTransfer.value.patientSocialSecurityNumber
      },
      origin: newTransfer.value.origin,
      destination: newTransfer.value.destination,
      priority: newTransfer.value.priority,
      scheduledTime: newTransfer.value.scheduledTime,
      notes: newTransfer.value.notes,
      status: 'Pendiente'
    };

    await mockService.addTransfer(transfer);
    await loadData(); // Recargar datos
    closeNewTransferDialog();
  } catch (error) {
    console.error('Error al crear el traslado:', error);
  } finally {
    saving.value = false;
  }
};

const deleteTransfer = async (id) => {
  try {
    const confirmed = window.confirm('¿Está seguro que desea eliminar este traslado?');
    if (!confirmed) return;

    await mockService.deleteTransfer(id);
    await loadData(); // Recargar datos
  } catch (error) {
    console.error('Error al eliminar el traslado:', error);
    alert('Error al eliminar el traslado');
  }
};

const assignAmbulance = async () => {
  if (!selectedAmbulance.value || selectedCrew.value.length === 0) {
    alert('Por favor seleccione una ambulancia y al menos un miembro del personal');
    return;
  }

  saving.value = true;
  try {
    const transfer = activeTransfers.value.find(t => t.id === selectedTransfer.value.id);
    if (transfer) {
      transfer.status = 'En Progreso';
      transfer.assignedAmbulance = selectedAmbulance.value;
      transfer.assignedCrew = selectedCrew.value;
      transfer.assignmentNotes = assignmentNotes.value;
      
      await mockService.updateTransfer(transfer);
      
      // Actualizar estado de la ambulancia
      const ambulance = ambulances.value.find(a => a.id === selectedAmbulance.value);
      if (ambulance) {
        ambulance.status = 'ON_DUTY';
        await mockService.updateAmbulance(ambulance);
      }
    }
    
    await loadData(); // Recargar datos
    assignDialog.value = false;
  } catch (error) {
    console.error('Error al asignar ambulancia:', error);
  } finally {
    saving.value = false;
  }
};

const loadData = async () => {
  loading.value = true;
  try {
    const [ambulanceData, transferData] = await Promise.all([
      mockService.getAllAmbulances(),
      mockService.getAllTransfers()
    ]);
    
    ambulances.value = ambulanceData;
    transfers.value = transferData;
    activeTransfers.value = transferData.filter(t => t.status !== 'Completado');
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadData();
});

const dialog = ref(false);
const assignDialog = ref(false);
const selectedTransfer = ref(null);
const selectedAmbulance = ref(null);
const isAssigning = ref(false);

const originSuggestions = ref([]);
const destinationSuggestions = ref([]);
const originAddress = ref('');
const destinationAddress = ref('');
const selectedCrew = ref([]);
const assignmentNotes = ref('');

const availableCrew = ref([
  { id: 1, name: 'Dr. Juan Pérez', role: 'Médico' },
  { id: 2, name: 'Dra. María García', role: 'Médico' },
  { id: 3, name: 'Lic. Carlos López', role: 'Enfermero' },
  { id: 4, name: 'Lic. Ana Martínez', role: 'Enfermera' },
]);

const router = useRouter();

const getStatusColor = (status) => {
  const colors = {
    'AVAILABLE': 'success',
    'ON_DUTY': 'info',
    'OUT_OF_SERVICE': 'error',
    'MAINTENANCE': 'warning'
  };
  return colors[status] || 'grey';
};

const getMarkerIcon = (status) => {
  const icons = {
    'AVAILABLE': '🟢',
    'ON_DUTY': '🔵',
    'MAINTENANCE': '🟡',
    'OUT_OF_SERVICE': '🔴'
  };
  return icons[status] || '🔴';
};

const getPriorityColor = (priority) => {
  const colors = {
    'Alta': 'error',
    'Media': 'warning',
    'Baja': 'success'
  };
  return colors[priority] || 'grey';
};

const getStatusChipColor = (status) => {
  const colors = {
    'PENDING': 'warning',
    'IN_PROGRESS': 'info',
    'COMPLETED': 'success',
    'CANCELLED': 'error'
  };
  return colors[status] || 'grey';
};

const getPlacePredictions = (field) => {
  const input = field === 'origin' ? originAddress.value : destinationAddress.value;
  if (input && input.length > 3) {
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const suggestions = predictions.map(prediction => ({
          description: prediction.description,
          place_id: prediction.place_id
        }));
        if (field === 'origin') {
          originSuggestions.value = suggestions;
        } else {
          destinationSuggestions.value = suggestions;
        }
      } else {
        console.error('Error al obtener predicciones de lugares:', status);
        if (field === 'origin') {
          originSuggestions.value = [];
        } else {
          destinationSuggestions.value = [];
        }
      }
    });
  } else {
    if (field === 'origin') {
      originSuggestions.value = [];
    } else {
      destinationSuggestions.value = [];
    }
  }
};

const selectSuggestion = (field, suggestion) => {
  if (field === 'origin') {
    originAddress.value = suggestion.description;
    getPlusCode(field, suggestion.place_id);
  } else {
    destinationAddress.value = suggestion.description;
    getPlusCode(field, suggestion.place_id);
  }
};

const getPlusCode = (field, placeId) => {
  if (!placeId) {
    console.error('No placeId provided for getPlusCode');
    return;
  }

  const service = new google.maps.places.PlacesService(document.createElement('div'));
  service.getDetails({ placeId }, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const location = place.geometry.location;
      const plusCode = OpenLocationCode.encode(location.lat(), location.lng());
      if (field === 'origin') {
        newTransfer.value.origin = plusCode;
      } else {
        newTransfer.value.destination = plusCode;
      }
    } else {
      console.error('Error al obtener detalles del lugar:', status);
    }
  });
};

const showDialog = () => {
  newTransfer.value = {
    patientName: '',
    patientLastName: '',
    patientDocument: '',
    patientSocialSecurity: '',
    patientSocialSecurityNumber: '',
    origin: '',
    destination: '',
    priority: '',
    scheduledTime: '',
    notes: ''
  };
  newTransferDialog.value = true;
  console.log('Dialog should open:', newTransferDialog.value); // Para debugging
};

const showAssignDialog = (transfer) => {
  selectedTransfer.value = transfer;
  selectedAmbulance.value = null;
  selectedCrew.value = [];
  assignmentNotes.value = '';
  assignDialog.value = true;
};

// Estadísticas calculadas
const stats = computed(() => ({
  totalAmbulances: ambulances.value.length,
  availableAmbulances: ambulances.value.filter(a => a.status === 'AVAILABLE').length,
  onDutyAmbulances: ambulances.value.filter(a => a.status === 'ON_DUTY').length,
  maintenanceAmbulances: ambulances.value.filter(a => a.status === 'MAINTENANCE').length,
  activeTransfers: transfers.value.filter(t => t.status === 'En Progreso').length,
  completedTransfers: transfers.value.filter(t => t.status === 'Completado').length
}));

const markers = computed(() => {
  return ambulances.value.map(ambulance => {
    const defaultPosition = { lat: -31.4201, lng: -64.1888 }; // Córdoba
    const position = ambulance.location || defaultPosition;
    
    // Asegurarse de que las coordenadas sean números
    const lat = typeof position.lat === 'number' ? position.lat : defaultPosition.lat;
    const lng = typeof position.lng === 'number' ? position.lng : defaultPosition.lng;
    
    return {
      position: { lat, lng },
      title: `Ambulancia ${ambulance.licensePlate || 'Sin patente'}`,
      icon: getMarkerIcon(ambulance.status)
    };
  });
});
</script>

<style scoped>
.border-r {
  border-right: 1px solid #e0e0e0;
}

.border-l {
  border-left: 1px solid #e0e0e0;
}

.transfers-container {
  height: calc(100vh - 200px);
  overflow-y: auto;
}

.fill-height {
  height: calc(100vh - 64px);
}

.stats-card {
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.ambulance-card,
.transfer-card {
  transition: all 0.2s ease;
  border: 1px solid #e0e0e0;
  background: white;
}

.ambulance-card:hover,
.transfer-card:hover {
  transform: translateY(-2px);
  border-color: var(--v-primary-base);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-size: 1.1rem !important;
  line-height: 1.4;
}

.text-medium-emphasis {
  color: rgba(0, 0, 0, 0.6) !important;
}

.v-card-subtitle {
  opacity: 0.8;
  font-size: 0.875rem !important;
}

.v-chip {
  font-weight: 500;
}

.transfer-card {
  overflow: hidden;
}

.transfer-card .v-card-actions {
  background-color: #f8f9fa;
}

.transfer-card .v-card-subtitle {
  display: flex;
  flex-direction: column;
  margin-top: 4px;
}

.transfer-card .v-avatar {
  border: 2px solid white;
}

.location-grid {
  display: grid;
  margin-top: 4px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.location-row {
  display: grid;
  grid-template-columns: 24px minmax(60px, auto) 1fr;
  gap: 12px;
  align-items: center;
}

.location-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-label {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.location-value {
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
  min-width: 0;
}

.v-btn {
  margin-top: 10px;
}
</style>
