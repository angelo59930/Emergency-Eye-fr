<template>
  <v-card :color="colorPrioridad">
    <!-- Parte 1: Título -->
    <v-card-title>
      <slot name="header" />
    </v-card-title>

    <!-- Parte 2: Descripción general del traslado -->
    <v-card-text>
      <slot name="description" />
    </v-card-text>

    <!-- Parte 3: Botones de Eliminar y Asignar -->
    <v-card-actions>
      <v-btn color="#8c4446" @click="eliminar">Eliminar</v-btn>
      <v-btn color="#23a98d" @click="asignar">Asignar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineEmits, computed } from 'vue';

const props = {
  prioridad: {
    type: String,
    required: true,
  }
}

const emits = defineEmits(['eliminar']);

const eliminar = () => {
  emits('eliminar');
};

const asignar = () => {
  emits('asignar');
};

computed(() => {
  switch (props.prioridad) {
    case 'alta':
      return '#f44336';
    case 'media':
      return '#ff9800';
    default:
      return '#4caf50';
  }
});

</script>