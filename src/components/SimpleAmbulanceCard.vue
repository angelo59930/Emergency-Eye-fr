<template>
  <div class="container">
    <div class="column">
      <slot name="left">
        <!--Boton de mas informacion -->
      </slot>
    </div>
    <div class="column">
      <div class="header">
        <h2 class="header-title">{{ title }}</h2>
        <slot name="mid">
          <!-- Descripcion de la ambulancia -->
        </slot>
      </div>
    </div>
    <div class="column">
      <slot name="right">
        <!-- Boton de ubicar movil -->
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleAmbulanceCard',
  props: {
    title: String,
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  border: 1px solid #23a98d;
}

.column {
  flex: 1;
  margin: 0 10px;
}

.header {
  display: flex;
  flex-direction: column;
}

.header-title {
  margin-bottom: 10px;
}
</style>