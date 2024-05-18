<template>
  <div class="map">
    <div id="mapContainer" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

let map = null

const props = defineProps({
  markers: {
    type: Array,
    required: false,
    default: () => []
  }
})

onMounted(() => {
  console.log(props.markers)
  createMapLayer()
})

onBeforeMount(() => {
  if (map) {
    map.remove()
  }
})

const createMapLayer = () => {
  map = L.map('mapContainer').setView([-31.41895036757332, -64.18806943065226], 13)
  L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  if (props.markers.length) {
    setMarkers()
  }
}

const setMarkers = () => {
  props.markers.map((marker) => {
    return L.marker([marker.latitude, marker.longitude]).addTo(map)
      .bindPopup(marker.descricao)
  })
}


</script>

<style scoped>
#mapContainer {
  width: auto;
  height: calc(100vh - 200px);
  border-radius: 25px;
}
</style>