<template>
  <v-chip :color="chipColor" size="small" variant="tonal">
    {{ formatState }}
  </v-chip>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  state: {
    type: String,
    required: true
  }
});

const chipColor = computed(() => {
  switch (props.state) {
    case 'AVAILABLE':
      return 'success';
    case 'ON_DUTY':
      return 'warning';
    case 'OUT_OF_SERVICE':
      return 'error';
    case 'MAINTENANCE':
      return 'info';
    default:
      return 'grey';
  }
});

const formatState = computed(() => {
  const labels = {
    'AVAILABLE': 'Disponible',
    'ON_DUTY': 'En Servicio',
    'OUT_OF_SERVICE': 'Fuera de Servicio',
    'MAINTENANCE': 'En Mantenimiento'
  };
  return labels[props.state] || props.state;
});
</script>