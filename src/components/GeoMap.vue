<template>
  <div class="map">
    <div id="mapContainer" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount } from 'vue'
import 'leaflet/dist/leaflet.css'
import ambulanceSvg from '@/assets/ambulance.svg'
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
  console.log('mounted')
  console.table(props.markers[0])
  createMapLayer()
})

onBeforeMount(() => {
  if (map) {
    map.remove()
  }
})

const createMapLayer = () => {
  map = L.map('mapContainer').setView([-31.41895036757332, -64.18806943065226], 12)
  L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)



  if (props.markers.length) {
    setMarkers()
  }
}

const setMarkers = () => {
  console.log('setMarkers')
  console.log(props.markers)
  console.log(ambulanceSvg)
  const ambulanceIcon = L.icon({
    iconUrl: ambulanceSvg,
    iconSize: [38, 95], 
    iconAnchor: [22, 94], 
    popupAnchor: [-3, -76] 
  });

  props.markers.map((marker) => {
    return L.marker([marker.latitude, marker.longitude],
      {
        icon: ambulanceIcon
      }
    ).addTo(map)
      .bindPopup(marker.description)
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