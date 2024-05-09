<template>
  <SimpleAmbulanceCard class="ambulances" title="Ambulancia compleja 1" >
    <template #left>
      <Button class="button" label="Link" link>Ver mas</Button>
    </template>      
    <template #mid>
      <p>Chofer: Manfredi, Roberto: 8:10 <br/>
        Doctor: House, Brittany - 8:10<br/>
        <strong>SIN RESPIRADOR</strong>
      </p>
    </template>
    <template #right>
      <Button class="button" label="Link" link>Ubicar movil</Button>
    </template>
  </SimpleAmbulanceCard>
  <AddTrasladoButton class=addTraslado @action="test">+ TRASLADO</AddTrasladoButton>
  <DetailCard title="Ambulancia compleja 3"> 
    <template #description>
      <p>Chofer: Manfredi, Roberto: 8:10 <br/>
        Doctor: House, Brittany - 8:10<br/>
        <strong>SIN RESPIRADOR</strong>
      </p>
    </template>
    <template #footer-tag>
      <Tag severity="danger">En recorrido</Tag>
      <Button class="button" label="Link" link>Cancel </Button>
      <Button class="button" label="Link" link>Aceptar </Button>
      
    </template>
  </DetailCard>
</template>

<script>
import AddTrasladoButton from "./components/AddTrasladoButton"
import DetailCard from "./components/DetailCard"
import SimpleAmbulanceCard from "./components/SimpleAmbulanceCard"
import Button from 'primevue/button';
import Tag from 'primevue/tag';



export default {
  name: 'App',
  components: {
    AddTrasladoButton,
    DetailCard,
    SimpleAmbulanceCard,
    Button,
    Tag
  },
  methods: {
    test() {
      alert("Presione el boton");
    }
  }
}

</script>

<style scoped>

.ambulances {
  margin: 20px;
  width: 75px;
  height: auto;
}


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
