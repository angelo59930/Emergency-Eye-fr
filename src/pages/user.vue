<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <v-container class="py-4">
    <!-- Encabezado -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6">
        <div class="d-flex align-center">
          <v-icon size="32" color="primary" class="mr-3">mdi-account-group</v-icon>
          <h1 class="text-h4 font-weight-bold mb-0">Gestor de Personal</h1>
        </div>
        <p class="text-subtitle-1 text-grey-darken-1 mt-2 mb-0">
          Administra el personal médico y sus roles
        </p>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex align-center justify-end">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="large"
          @click="openDialog"
        >
          Agregar Personal
        </v-btn>
      </v-col>
    </v-row>

    <!-- Tabla de Personal -->
    <v-card variant="outlined" class="mb-6">
      <v-card-item>
        <v-card-title class="text-h6">Lista de Personal</v-card-title>
      </v-card-item>
      <v-divider />
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        hover
      >
        <template v-slot:item.roles="{ item }">
          {{ item.raw.roles }}
        </template>
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
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="px-4 py-3 bg-primary">
          <span class="text-h5 text-white">{{ editing ? 'Editar Personal' : 'Agregar Personal' }}</span>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newEmployee.name"
                  label="Nombre"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newEmployee.lastname"
                  label="Apellido"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newEmployee.username"
                  label="Username"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newEmployee.employeeNumber"
                  label="N° Empleado"
                  type="number"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newEmployee.license"
                  label="Licencia"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newEmployee.password"
                  label="Contraseña"
                  type="password"
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
            @click="closeDialog"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            class="ml-2"
            @click="saveEmployee"
            :loading="saving"
          >
            {{ editing ? 'Guardar Cambios' : 'Guardar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import UserApi from '@/services/Users';
import NavBar from '@/components/NavBar.vue';
import { ref, onMounted } from 'vue'

let users = ref([])
let dialog = ref(false)
let editing = ref(false)
let loading = ref(false)
let saving = ref(false)
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

const api = new UserApi('http://localhost:8081/api/v1')

onMounted(async () => {
  loading.value = true
  try {
    users.value = await api.getEmployed()
    users.value = users.value.map(user => ({
      ...user,
      roles: user.roles?.map(role => role.description).join(', ') || ''
    }))
  } catch (error) {
    console.error("Error al cargar usuarios:", error)
  } finally {
    loading.value = false
  }
})

const headers = [
  { title: 'N°', key: 'employeeNumber', sortable: true },
  { title: 'Nombre', key: 'name' },
  { title: 'Apellido', key: 'lastname' },
  { title: 'Rol', key: 'roles' },
  { title: 'Licencia', key: 'license' },
  { title: 'Acciones', key: 'action', sortable: false }
]

const openDialog = () => {
  editing.value = false
  newEmployee.value = {
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
  }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

const saveEmployee = async () => {
  saving.value = true
  try {
    if (editing.value) {
      await api.updateEmployee(newEmployee.value)
      const index = users.value.findIndex(user => user.id === newEmployee.value.id)
      if (index !== -1) {
        users.value[index] = { ...newEmployee.value }
      }
    } else {
      const response = await api.addEmployee(newEmployee.value)
      users.value.push(response)
    }
    closeDialog()
  } catch (error) {
    console.error("Error al guardar el empleado:", error)
  } finally {
    saving.value = false
  }
}

const editItem = (item) => {
  editing.value = true
  newEmployee.value = { ...item }
  dialog.value = true
}

const deleteItem = (item) => {
  console.log('Delete item', item)
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
