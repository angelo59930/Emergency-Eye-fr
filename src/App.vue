<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

onMounted(() => {
  theme.global.name.value = 'light'
})
</script>

<style>
@import '@mdi/font/css/materialdesignicons.css';
</style>
