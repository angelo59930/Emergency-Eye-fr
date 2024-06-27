<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <v-container>
    <v-row>
      <v-col cols="4">
        <!--Esto sera una lista-->
        <AmbulanceInfoCard>
          <template #ambulance-info>
            <v-row>
              <v-col cols="auto">
                <h2><b>Ambulancia 3</b></h2>
              </v-col>
              <v-col>
                <StateTag state="Libre" />
              </v-col>
            </v-row>
            <p>Chofer: Gabriel Manfredi</p>
            <p>Médico: Jose Pablo</p>
            <p><b>SIN DESFIBRILADOR</b></p>
          </template>
        </AmbulanceInfoCard>
        <!--Esto sera una lista-->
      </v-col>
      <v-col cols="8">
        <GeoMap :markers="data.markers" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn size="x-large" rounded prepend-icon="mdi-plus" flat color="#23A98D" @click="showDialog">
          Traslado
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <!-- Esto sera una lista de traslados a asignar -->
      <v-col cols="4">
        <TravelCard priority="alta" @eliminar="funcionmia">
          <template #header>
            <h2>Traslado 1 - (ALTA)</h2>
          </template>
          <template #description>
            <p>Origen: Hospital Regional</p>
            <p>Destino: Hospital de Niños</p>
            <p>Estado: Espera</p>
          </template>
        </TravelCard>
      </v-col>
      <v-col cols="4">
        <TravelCard priority="media" @eliminar="funcionmia">
          <template #header>
            <h2>Traslado 2 - (MEDIA)</h2>
          </template>
          <template #description>
            <p>Origen: Hospital Regional</p>
            <p>Destino: Hospital de Niños</p>
            <p>Estado: Espera</p>
          </template>
        </TravelCard>
      </v-col>
      <v-col cols="4">
        <TravelCard priority="baja" @eliminar="funcionmia">
          <template #header>
            <h2>Traslado 3 - (BAJA)</h2>
          </template>
          <template #description>
            <p>Origen: Hospital Regional</p>
            <p>Destino: Hospital de Niños</p>
            <p>Estado: Espera</p>
          </template>
        </TravelCard>
      </v-col>
    </v-row>
  </v-container>

  <!-- Dialogo para crear un nuevo traslado -->
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Nuevo Traslado</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="newTransfer.origen" label="Origen" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newTransfer.destino" label="Destino" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select v-model="newTransfer.priority" :items="['Alta', 'Media', 'Baja']" label="Prioridad"
                required></v-select>
            </v-col>
            <v-col cols="12">
              <v-checkbox v-model="isNewPatient" label="Nuevo Paciente"></v-checkbox>
            </v-col>
            <v-col cols="12" v-if="!isNewPatient">
              <v-text-field v-model="existingPatientDNI" label="DNI del Paciente" @blur="fetchPatient"></v-text-field>
            </v-col>
            <template v-if="isNewPatient">
              <v-col cols="12">
                <v-text-field v-model="newTransfer.patient.name" label="Nombre" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newTransfer.patient.lastName" label="Apellido" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newTransfer.patient.document" label="Documento" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newTransfer.patient.socialSecurity" label="Seguridad Social"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newTransfer.patient.socialSecurityNumber" label="Número de Seguridad Social"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select v-model="newTransfer.patient.gender" :items="['Masculino', 'Femenino', 'Otro']" label="Género"
                  required></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newTransfer.patient.birthDate" label="Fecha de Nacimiento"
                  required></v-text-field>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="saveTransfer">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PatientApi } from '@/services/PatientService';

const patientApi = new PatientApi('http://127.0.0.1:8081/api/v1')

// Estado del dialogo
const dialog = ref(false)
const isNewPatient = ref(false)
const existingPatientDNI = ref('')
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
})

const data = {
  markers: [
    {
      latitude: -31.41895036757332,
      longitude: -64.18806943065226,
      description: 'Hospital Regional'
    },
    {
      latitude: -31.45258230636035,
      longitude: -64.1886027433417,
      description: 'Lautaro 667'
    }
  ]
}

const router = useRouter()

onMounted(() => {
  const token = sessionStorage.getItem('token')
  if (!token) {
    router.push('/login')
  }
})

const showDialog = () => {
  dialog.value = true
}

const saveTransfer = async () => {
  try {
    if (isNewPatient.value) {
      // Crear nuevo paciente
      const response = await patientApi.createPatient(newTransfer.value.patient)
      newTransfer.value.patient.id = response.data.id
      console.log('Nuevo paciente creado:', response.data)
    } else {
      // Buscar paciente por DNI
      await fetchPatient()
    }
    // lógica para guardar el nuevo traslado
    console.log('Guardando nuevo traslado:', newTransfer.value)
    // Aquí deberías agregar la lógica para guardar el traslado usando el servicio correspondiente
  } catch (error) {
    console.error('Error al guardar el traslado:', error)
  } finally {
    dialog.value = false
    // Reseteo del formulario
    newTransfer.value.origen = ''
    newTransfer.value.destino = ''
    newTransfer.value.priority = ''
    newTransfer.value.patient.name = ''
    newTransfer.value.patient.lastName = ''
    newTransfer.value.patient.document = ''
    newTransfer.value.patient.socialSecurity = ''
    newTransfer.value.patient.socialSecurityNumber = ''
    newTransfer.value.patient.gender = ''
    newTransfer.value.patient.birthDate = ''
    isNewPatient.value = false
    existingPatientDNI.value = ''
  }
}

const fetchPatient = async () => {
  const dni = existingPatientDNI.value
  if (dni) {
    try {
      console.log('Obteniendo información del paciente con DNI:', dni)
      const response = await patientApi.getPatientByDNI(dni)
      if (response.data) {
        // Asignar la información del paciente existente a newTransfer.patient
        newTransfer.value.patient.name = response.data.name
        newTransfer.value.patient.lastName = response.data.lastName
        newTransfer.value.patient.document = response.data.document
        newTransfer.value.patient.socialSecurity = response.data.socialSecurity
        newTransfer.value.patient.socialSecurityNumber = response.data.socialSecurityNumber
        newTransfer.value.patient.gender = response.data.gender
        newTransfer.value.patient.birthDate = response.data.birthDate
      }
    } catch (error) {
      console.error("Error al obtener la información del paciente:", error)
    }
  }
}

const funcionmia = () => {
  // lógica para eliminar traslado
}
</script>

<style scoped>
/* estilos */
</style>
