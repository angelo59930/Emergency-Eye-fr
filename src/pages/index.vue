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
          <v-card v-for="ambulance in ambulances" :key="ambulance.id" class="mb-3 ambulance-card" elevation="1" rounded="lg" hover>
            <v-card-item>
              <template v-slot:prepend>
                <v-avatar :color="getStatusColor(ambulance.status)" size="42" class="elevation-1">
                  <v-icon size="24" color="white" icon="mdi-ambulance" />
                </v-avatar>
              </template>
              <v-card-title class="font-weight-bold">Ambulancia {{ ambulance.licensePlate }}</v-card-title>
              <v-card-subtitle class="mt-1">
                <v-chip :color="getStatusColor(ambulance.status)" size="small" variant="tonal" class="font-weight-medium">
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
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-plus"
                    variant="tonal"
                    @click="showDialog"
                  >
                    Nuevo Traslado
                  </v-btn>
                </div>

                <!-- Lista de traslados activos -->
                <v-card
                  v-for="transfer in activeTransfers"
                  :key="transfer.id"
                  class="mb-4 transfer-card"
                  elevation="1"
                  rounded="lg"
                >
                  <v-card-item>
                    <template v-slot:prepend>
                      <v-avatar :color="getPriorityColor(transfer.priority)" size="42" class="elevation-1">
                        <v-icon size="24" color="white" icon="mdi-ambulance" />
                      </v-avatar>
                    </template>
                    <v-card-title class="font-weight-bold d-flex align-center">
                      <span>Traslado #{{ transfer.id }}</span>
                      <v-chip
                        :color="getPriorityColor(transfer.priority)"
                        size="small"
                        variant="tonal"
                        class="ml-2"
                      >
                        {{ transfer.priority }}
                      </v-chip>
                      <v-chip
                        color="grey"
                        size="small"
                        variant="flat"
                        class="ml-2"
                      >
                        {{ transfer.status }}
                      </v-chip>
                    </v-card-title>
                    <v-card-subtitle>
                      <div class="d-flex align-center mb-2">
                        <v-icon size="16" color="primary" icon="mdi-account" class="mr-1" />
                        <span class="font-weight-medium">{{ transfer.patient.name }} {{ transfer.patient.lastName }}</span>
                        <v-chip size="x-small" class="ml-2" color="grey-lighten-3">
                          {{ transfer.patient.document }}
                        </v-chip>
                      </div>
                      <div class="d-flex align-center mb-1">
                        <v-icon size="16" color="success" icon="mdi-map-marker" class="mr-1" />
                        <span>{{ transfer.origin }}</span>
                      </div>
                      <div class="d-flex align-center">
                        <v-icon size="16" color="error" icon="mdi-map-marker" class="mr-1" />
                        <span>{{ transfer.destination }}</span>
                      </div>
                    </v-card-subtitle>
                  </v-card-item>
                  <v-divider />
                  <v-card-actions class="pa-3">
                    <v-btn
                      color="error"
                      variant="text"
                      density="comfortable"
                      prepend-icon="mdi-delete"
                      @click="deleteTransfer(transfer.id)"
                    >
                      Eliminar
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      variant="tonal"
                      prepend-icon="mdi-car-emergency"
                      @click="showAssignDialog(transfer)"
                    >
                      Asignar Ambulancia
                    </v-btn>
                  </v-card-actions>
                </v-card>

                <!-- Lista de traslados -->
                <div class="transfers-container">
                  <TravelCard
                    v-for="transfer in transfers"
                    :key="transfer.id"
                    :priority="transfer.priority"
                    class="mb-3"
                    @eliminar="deleteTransfer(transfer.id)"
                  >
                    <template #header>
                      <div class="d-flex align-center">
                        <v-icon
                          :color="getPriorityColor(transfer.priority)"
                          class="mr-2"
                          icon="mdi-alert-circle"
                        />
                        <h3 class="text-subtitle-1 font-weight-bold mb-0">
                          Traslado #{{ transfer.id }}
                        </h3>
                      </div>
                    </template>
                    <template #description>
                      <v-list-item
                        :prepend-icon="'mdi-map-marker'"
                        :title="transfer.origen"
                        subtitle="Origen"
                        class="pa-0"
                      />
                      <v-list-item
                        :prepend-icon="'mdi-flag-checkered'"
                        :title="transfer.destino"
                        subtitle="Destino"
                        class="pa-0"
                      />
                      <v-chip
                        :color="getStatusChipColor(transfer.estado)"
                        size="small"
                        class="mt-2"
                      >
                        {{ transfer.estado }}
                      </v-chip>
                    </template>
                  </TravelCard>
                </div>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
          </v-col>
        </v-row>
      </v-container>

      <!-- Dialog para nuevo traslado -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title class="text-h5 pa-4">
            Nuevo Traslado
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    v-model="originAddress"
                    label="Dirección de Origen"
                    :items="originSuggestions"
                    item-text="description"
                    item-value="place_id"
                    @input="getPlacePredictions('origin')"
                    clearable
                    placeholder="Ingrese la dirección de origen"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12">
                  <v-combobox
                    v-model="destinationAddress"
                    label="Dirección de Destino"
                    :items="destinationSuggestions"
                    item-text="description"
                    item-value="place_id"
                    @input="getPlacePredictions('destination')"
                    clearable
                    placeholder="Ingrese la dirección de destino"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="newTransfer.priority"
                    :items="['Alta', 'Media', 'Baja']"
                    label="Prioridad"
                    variant="outlined"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="isNewPatient"
                    label="Nuevo Paciente"
                    color="primary"
                  />
                </v-col>
                <v-col cols="12" v-if="!isNewPatient">
                  <v-text-field
                    v-model="existingPatientDNI"
                    label="DNI del Paciente"
                    @blur="fetchPatient"
                    variant="outlined"
                  />
                </v-col>
                <template v-if="isNewPatient">
                  <v-col cols="12">
                    <v-text-field
                      v-model="newTransfer.patient.name"
                      label="Nombre"
                      variant="outlined"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newTransfer.patient.lastName"
                      label="Apellido"
                      variant="outlined"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newTransfer.patient.document"
                      label="Documento"
                      variant="outlined"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newTransfer.patient.socialSecurity"
                      label="Seguridad Social"
                      variant="outlined"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newTransfer.patient.socialSecurityNumber"
                      label="Número de Seguridad Social"
                      variant="outlined"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="newTransfer.patient.gender"
                      :items="['Masculino', 'Femenino', 'Otro']"
                      label="Género"
                      variant="outlined"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newTransfer.patient.birthDate"
                      label="Fecha de Nacimiento"
                      type="date"
                      variant="outlined"
                      required
                    />
                  </v-col>
                </template>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="grey" variant="text" @click="dialog = false">Cancelar</v-btn>
            <v-btn color="primary" variant="elevated" @click="saveTransfer">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
          <!-- Dialog para asignar ambulancia -->
      <v-dialog v-model="assignDialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5 pa-4 pb-2">
            Asignar Ambulancia
          </v-card-title>
          <v-card-subtitle class="px-4 pb-0" v-if="selectedTransfer">
            <div class="d-flex align-center">
              <v-icon size="16" color="primary" icon="mdi-account" class="mr-1" />
              <span>{{ selectedTransfer.patient.name }} {{ selectedTransfer.patient.lastName }}</span>
            </div>
            <div class="d-flex align-center mt-1">
              <v-icon size="16" color="success" icon="mdi-map-marker" class="mr-1" />
              <span class="text-caption">{{ selectedTransfer.origin }}</span>
              <v-icon size="16" icon="mdi-arrow-right" class="mx-1" />
              <span class="text-caption">{{ selectedTransfer.destination }}</span>
            </div>
          </v-card-subtitle>
          <v-card-text class="pa-4">
            <v-select
              v-model="selectedAmbulance"
              :items="ambulances.filter(a => a.status === 'AVAILABLE')"
              item-title="licensePlate"
              item-value="id"
              label="Seleccionar Ambulancia"
              variant="outlined"
              required
              class="mb-2"
            >
              <template v-slot:selection="{ item }">
                <v-icon
                  :color="getStatusColor(item.raw.status)"
                  icon="mdi-ambulance"
                  size="small"
                  class="mr-2"
                />
                {{ item.title }}
              </template>
              <template v-slot:item="{ item, props }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <v-icon
                      :color="getStatusColor(item.raw.status)"
                      icon="mdi-ambulance"
                      size="small"
                    />
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-select>
          </v-card-text>
          <v-divider />
          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn color="grey" variant="text" @click="assignDialog = false">Cancelar</v-btn>
            <v-btn
              color="primary"
              variant="elevated"
              :disabled="!selectedAmbulance"
              :loading="isAssigning"
              @click="assignAmbulance"
            >
              Asignar Ambulancia
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
import { usePatientService } from '@/services/usePatientService';
import { ServiceFactory } from '@/services/ServiceFactory';
import useAmbulanceService from '@/services/useAmbulanceService';
import * as OpenLocationCode from 'open-location-code';
import NavBar from '@/components/NavBar.vue';
import StateTag from '@/components/StateTag.vue';
import GeoMap from '@/components/GeoMap.vue';
import TravelCard from '@/components/TravelCard.vue';
import { mockAmbulances, mockTravels } from '@/services/mocks/mockData';

const ambulances = ref(mockAmbulances);
const transfers = ref(mockTravels);

// Estadísticas calculadas
const stats = computed(() => ({
  totalAmbulances: ambulances.value.length,
  availableAmbulances: ambulances.value.filter(a => a.status === 'AVAILABLE').length,
  onDutyAmbulances: ambulances.value.filter(a => a.status === 'ON_DUTY').length,
  maintenanceAmbulances: ambulances.value.filter(a => a.status === 'MAINTENANCE').length,
  activeTransfers: transfers.value.filter(t => t.status === 'IN_PROGRESS').length,
  completedTransfers: transfers.value.filter(t => t.status === 'COMPLETED').length
}));

const markers = computed(() => 
  ambulances.value.map(ambulance => ({
    position: ambulance.location,
    title: `Ambulancia ${ambulance.licensePlate}`,
    icon: getMarkerIcon(ambulance.status)
  }))
);

const dialog = ref(false);
const assignDialog = ref(false);
const selectedTransfer = ref(null);
const selectedAmbulance = ref(null);
const isAssigning = ref(false);

// Mock data for active transfers
const activeTransfers = ref([
  {
    id: 1,
    origin: 'Hospital Central',
    destination: 'Clínica San Martín',
    priority: 'Alta',
    status: 'Pendiente',
    patient: {
      name: 'Juan',
      lastName: 'Pérez',
      document: '12345678',
      socialSecurity: 'OSDE',
      socialSecurityNumber: '123456789'
    }
  },
  {
    id: 2,
    origin: 'Centro Médico Norte',
    destination: 'Hospital Regional',
    priority: 'Media',
    status: 'Pendiente',
    patient: {
      name: 'María',
      lastName: 'González',
      document: '87654321',
      socialSecurity: 'Swiss Medical',
      socialSecurityNumber: '987654321'
    }
  },
  {
    id: 3,
    origin: 'Sanatorio del Valle',
    destination: 'Hospital Universitario',
    priority: 'Baja',
    status: 'Pendiente',
    patient: {
      name: 'Carlos',
      lastName: 'Rodríguez',
      document: '45678912',
      socialSecurity: 'Galeno',
      socialSecurityNumber: '456789123'
    }
  }
]);
const originAddress = ref('');
const destinationAddress = ref('');
const originSuggestions = ref([]);
const destinationSuggestions = ref([]);
const newTransfer = ref({
  origen: '',
  destino: '',
  priority: '',
  patient: {
    name: '',
    lastName: '',
    document: '',
    socialSecurity: '',
    socialSecurityNumber: '',
    gender: '',
    birthDate: ''
  }
});
const isNewPatient = ref(false);
const existingPatientDNI = ref('');
const { createPatient, getPatientByDNI } = usePatientService();
const travelService = ServiceFactory.getTravelService();
const ambulanceService = ServiceFactory.getAmbulanceService();

const router = useRouter();

onMounted(async () => {
  if (import.meta.env.VITE_USE_MOCKS !== 'true') {
    try {
      const [travelData, ambulanceData] = await Promise.all([
        travelService.getAllTravels(),
        ambulanceService.getAllAmbulances()
      ]);
      transfers.value = travelData;
      ambulances.value = ambulanceData;
    } catch (error) {
      console.error('Error loading data:', error);
      // Keep using mock data as fallback
    }
  }
});

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
        newTransfer.value.origen = plusCode;
      } else {
        newTransfer.value.destino = plusCode;
      }
    } else {
      console.error('Error al obtener detalles del lugar:', status);
    }
  });
};

const saveTransfer = async () => {
  try {
    if (isNewPatient.value) {
      const response = await createPatient(newTransfer.value.patient);
      newTransfer.value.patient.id = response.data.id;
    } else {
      await fetchPatient();
    }
    const transferData = {
      origin: newTransfer.value.origen,
      destination: newTransfer.value.destino,
      priority: newTransfer.value.priority,
      patient: newTransfer.value.patient
    };
    await travelService.createTravel(transferData);
    transfers.value = await travelService.getAllTravels();
  } catch (error) {
    console.error('Error al guardar el traslado:', error);
  } finally {
    dialog.value = false;
    resetForm();
  }
};

const fetchPatient = async () => {
  const dni = existingPatientDNI.value;
  if (dni) {
    try {
      const response = await getPatientByDNI(dni);
      if (response.data) {
        Object.assign(newTransfer.value.patient, response.data);
      }
    } catch (error) {
      console.error('Error al obtener la información del paciente:', error);
    }
  }
};

const resetForm = () => {
  newTransfer.value.origen = '';
  newTransfer.value.destino = '';
  newTransfer.value.priority = '';
  newTransfer.value.patient.name = '';
  newTransfer.value.patient.lastName = '';
  newTransfer.value.patient.document = '';
  newTransfer.value.patient.socialSecurity = '';
  newTransfer.value.patient.socialSecurityNumber = '';
  newTransfer.value.patient.gender = '';
  newTransfer.value.patient.birthDate = '';
  isNewPatient.value = false;
  existingPatientDNI.value = '';
  originAddress.value = '';
  destinationAddress.value = '';
  originSuggestions.value = [];
  destinationSuggestions.value = [];
};

const showDialog = () => {
  dialog.value = true;
};

const showAssignDialog = (transfer) => {
  selectedTransfer.value = transfer;
  assignDialog.value = true;
};

const assignAmbulance = async () => {
  if (selectedTransfer.value && selectedAmbulance.value) {
    try {
      isAssigning.value = true;
      // Here you would make the API call to assign the ambulance
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      console.log(`Assigning ambulance ${selectedAmbulance.value} to transfer ${selectedTransfer.value.id}`);
      
      // Update transfer status
      const transfer = activeTransfers.value.find(t => t.id === selectedTransfer.value.id);
      if (transfer) {
        transfer.status = 'Asignado';
      }

      // Update ambulance status
      const ambulance = ambulances.value.find(a => a.id === selectedAmbulance.value);
      if (ambulance) {
        ambulance.status = 'ON_DUTY';
      }

      assignDialog.value = false;
      selectedTransfer.value = null;
      selectedAmbulance.value = null;
    } catch (error) {
      console.error('Error assigning ambulance:', error);
    } finally {
      isAssigning.value = false;
    }
  }
};

const deleteTransfer = async (id) => {
  try {
    await travelService.setCancelled(id);
    transfers.value = await travelService.getAllTravels();
  } catch (error) {
    console.error('Error al eliminar el traslado:', error);
  }
};
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

.ambulance-card, .transfer-card {
  transition: all 0.2s ease;
  border: 1px solid #e0e0e0;
  background: white;
}

.ambulance-card:hover, .transfer-card:hover {
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
  align-items: center;
  margin-top: 4px;
}

.transfer-card .v-avatar {
  border: 2px solid white;
}

.v-btn {
  margin-top: 10px;
}
</style>
