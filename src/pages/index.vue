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
            <p>Chofer: Gabriel manfredi</p>
            <p>medico: Jose Pablo</p>
            <p><b>SIN DESFRIBILADOR</b></p>
          </template>
        </AmbulanceInfoCard>
        <!--Esto sera una lista-->

      </v-col>
      <v-col cols="8">
        <GeoMap />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn size="x-large" rounded prepend-icon="mdi-plus" flat color="#23A98D">
          Traslado
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <!-- Esto sera una lista de traslados a asignar -->
      <v-col cols="4">
        <TravelCard priority="alta" @eliminar="funcionmia">
          <template #header>
            <h2>Traslado 1 - (ALTA PRIORIDAD)</h2>
          </template>
          <template #description>
            <p>Origen: Hospital Regional</p>
            <p>Destino: Hospital de niños</p>
            <p>Estado: Espera</p>
          </template>
        </TravelCard>
      </v-col>
      <v-col cols="4">
        <TravelCard priority="media" @eliminar="funcionmia">
          <template #header>
            <h2>Traslado 2 - (MEDIA PRIORIDAD)</h2>
          </template>
          <template #description>
            <p>Origen: Hospital Regional</p>
            <p>Destino: Hospital de niños</p>
            <p>Estado: Espera</p>
          </template>
        </TravelCard>
      </v-col>
      <v-col cols="4">
        <TravelCard priority="baja" @eliminar="funcionmia">
          <template #header>
            <h2>Traslado 3 - (BAJA PRIORIDAD)</h2>
          </template>
          <template #description>
            <p>Origen: Hospital Regional</p>
            <p>Destino: Hospital de niños</p>
            <p>Estado: Espera</p>
          </template>
        </TravelCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

</script>
