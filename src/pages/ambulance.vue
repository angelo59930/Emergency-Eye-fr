<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <NavBar />
    <v-row>
      <v-col cols="4">
        <h2>Gestor de <b>Ambulancias</b></h2>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-btn color="#23a98d" @click="dialogNew=true">Agregar Ambulancia</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table :headers="headers" :items="ambulances" class="elevation-1">
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-row>

    <!-- Edit dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Ambulancia</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Patente" v-model="selectedItem.licensePlate"></v-text-field>
                <v-text-field label="Telefono" v-model="selectedItem.telephone"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Create dialog -->
    <v-dialog v-model="dialogNew" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Agregar Ambulancia</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Patente" v-model="newItem.licensePlate"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogNew = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="add">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import AmbulanceApi from '@/services/AmbulanceService';
import { ref, onMounted } from 'vue'

let ambulances = ref([])
let dialog = ref(false)
let dialogNew = ref(false)
let selectedItem = ref({})
let newItem = ref({})


const api = new AmbulanceApi('http://127.0.0.1:8081/api/v1')

onMounted(async () => {
  console.log("se monta la vista")

  ambulances.value = await api.getAmbulance()

  console.log(ambulances.value)
})

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Patente', value: 'licensePlate' },
  { title: 'Telefono', value: 'telephone' },
  { title: 'Acciones', value: 'action', sortable: false },
]

const editItem = async (item) => {
  selectedItem.value = item
  dialog.value = true
}

const save = async () => {
  console.log('Guardar', selectedItem.value)
  await api.putAmbulance( selectedItem.value)
  dialog.value = false
  ambulances.value = await api.getAmbulance()
}

const deleteItem = async (item) => {
  console.log('Eliminar', item)
  await api.deleteAmbulance(item.id)
  ambulances.value = await api.getAmbulance()
}

const add = async () => {
  console.log('Agregar', newItem.value)
  await api.postAmbulance(newItem.value)
  dialogNew.value = false
  ambulances.value = await api.getAmbulance()
}
</script>