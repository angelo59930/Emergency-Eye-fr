<template>
  <AddTrasladoButton class=addTraslado>+ TRASLADO</AddTrasladoButton>
</template>

<script>
import AddTrasladoButton from "./components/AddTrasladoButton"
export default {
  name: 'App',
  components: {
    AddTrasladoButton
  }
}

</script>

<style scoped>
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
