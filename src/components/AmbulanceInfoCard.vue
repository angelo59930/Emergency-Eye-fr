<template>
  <v-container class="bordered">
    <v-row>
      <v-col cols="2">
        <v-btn density="comfortable" icon="mdi-plus" flat color="#23A98D" dark />
      </v-col>
      <v-col cols="8">
        <slot name="ambulance-info" />
      </v-col>
      <v-col cols="2">
        <v-btn density="comfortable" icon="mdi-crosshairs-gps" flat color="#23A98D" dark />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.bordered {
  border: 2px solid #23A98D;
  border-radius: 25px;
}
</style>