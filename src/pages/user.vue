<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <v-container>
    <v-row>
      <v-col cols="4">
        <h2>Gestor de <b>Empleados</b></h2>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-btn color="#23a98d" @click="openDialog">Agregar Empleado</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table :headers="headers" :items="users" class="elevation-1">
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Nuevo Empleado</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="newEmployee.name" label="Nombre" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newEmployee.lastname" label="Apellido" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newEmployee.username" label="Username" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newEmployee.employeeNumber" label="N° Empleado" type="number"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newEmployee.license" label="Licencia" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newEmployee.password" label="Contraseña" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="saveEmployee">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import UserApi from '@/services/Users';
import { ref, onMounted } from 'vue'

let users = ref([])
let dialog = ref(false)
let newEmployee = ref({
  accountNonExpired: true,
  accountNonLocked: true,
  credentialsNonExpired: true,
  enabled: true,
  name: "",
  lastname: "",
  username: "",
  employeeNumber: 0,
  password: "",
  roles: [{ description: "", id: 0, name: "" }],
  authoritiesStr: ["string"],
  authorities: [{ authority: "string" }]
})

const api = new UserApi('http://127.0.0.1:8081/api/v1')

onMounted(async () => {
  console.log("se monta la vista")

  users.value = await api.getEnployed()

  users.value.forEach(user => {
    user.roles = user.roles.map(role => role.description).join(', ')
  })

  console.log(users.value[0])
})

const headers = [
  { title: 'N°', value: 'employeeNumber', sortable: true },
  { title: 'Nombre', value: 'name' },
  { title: 'Apellido', value: 'lastname' },
  { title: 'Rol', value: 'roles' },
  { title: 'Licencia', value: 'license' },
  { title: 'Acciones', value: 'action', sortable: false }
]

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

const saveEmployee = async () => {
  try {
    const response = await api.addEmployee(newEmployee.value)
    users.value.push(response)
    closeDialog()
  } catch (error) {
    console.error("Error al agregar el empleado:", error)
  }
}

const editItem = (item) => {
  console.log('Edit item', item)
}

const deleteItem = (item) => {
  console.log('Delete item', item)
}
</script>
