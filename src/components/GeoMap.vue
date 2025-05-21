<template>
  <div class="map">
    <div id="mapContainer" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import ambulanceSvg from '@/assets/ambulance.svg'
import L from 'leaflet'

let map = null
let markersLayer = null

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

watch(() => props.markers, (newMarkers) => {
  if (map) {
    if (markersLayer) {
      markersLayer.clearLayers()
    }
    setMarkers()
  }
}, { deep: true })

const createMapLayer = () => {
  map = L.map('mapContainer').setView([-31.41895036757332, -64.18806943065226], 12)
  L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  markersLayer = L.layerGroup().addTo(map)

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
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });

  props.markers.forEach((marker) => {
    const position = marker.position;
    if (!position || typeof position.lat !== 'number' || typeof position.lng !== 'number') {
      console.warn('Invalid marker position:', marker);
      return;
    }

    L.marker([position.lat, position.lng], {
      icon: ambulanceIcon
    })
    .addTo(markersLayer)
    .bindPopup(marker.title || '');
  });
};

</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}

#mapContainer {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
#mapContainer {
  width: auto;
  height: calc(100vh - 200px);
  border-radius: 25px;
}
</style>