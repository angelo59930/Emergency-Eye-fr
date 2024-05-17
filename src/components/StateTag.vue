<template>
  <v-chip :color="chipColor">
    {{ state }}
  </v-chip>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  state: String
});

const chipColor = computed(() => {
  switch (props.state) {
    case 'espera':
      return 'yellow';
    case 'recorrido':
      return 'red';
    default:
      return 'green';
  }
});
</script>