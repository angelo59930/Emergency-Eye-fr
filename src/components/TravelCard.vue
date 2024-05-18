<template>
  <v-card :color="colorPrioridad">
    <!-- Parte 1: Título -->
    <v-card-title class="custom-color">
      <slot name="header" />
    </v-card-title>

    <!-- Parte 2: Descripción general del traslado -->
    <v-card-text class="custom-color">
      <slot name="description" />
    </v-card-text>

    <!-- Parte 3: Botones de Eliminar y Asignar -->
    <v-card-body>
      <v-container>
        <v-row class="justify-end">
          <v-btn class="button-margin" flat color="#8c4446" @click="eliminar">Eliminar</v-btn>
          <v-btn class="button-margin" flat color="#23a98d" @click="asignar">Asignar</v-btn>
        </v-row>
      </v-container>

    </v-card-body>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  priority: {
    type: String,
    required: true,
  }
})

const emits = defineEmits(['eliminar']);

const eliminar = () => {
  emits('eliminar');
};

const asignar = () => {
  emits('asignar');
};

const colorPrioridad = computed(() => {
  console.log(props.priority);
  switch (props.priority) {
    case 'alta':
      return '#D39D99';
    case 'media':
      return '#EFE298';
    default:
      return '#A5EED9';
  }
});

</script>

<style scoped>
.custom-color {
  color: black;
}

.button-margin {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>