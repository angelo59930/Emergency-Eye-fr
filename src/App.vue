<template>
  <AddTrasladoButton class=addTraslado @action="test">+ TRASLADO</AddTrasladoButton>
  <DetailCard title="Detalle de la tarjeta"> 
    <template #description>
      <p>Descripcion de la tarjeta</p>
    </template>
    <template #footer-tag>
      <p> rueba</p>
      <Button class="button" label="Link" link>Cancel </Button>
    </template>
  </DetailCard>
</template>

<script>
import AddTrasladoButton from "./components/AddTrasladoButton"
import DetailCard from "./components/DetailCard"
import Button from 'primevue/button';
export default {
  name: 'App',
  components: {
    AddTrasladoButton,
    DetailCard,
    Button
  },
  methods: {
    test() {
      alert("Presione el boton");
    }
  }
}

</script>

<style scoped>

.button {
  color: #23a98d;
}


.addTraslado {
  border-radius: 25px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
