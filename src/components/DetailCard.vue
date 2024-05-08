<template>
  <Card class="card" title="Detalle de la tarjeta">
    <template #title>{{title}}</template>
    <template #content>
        <slot name="description"></slot>
    </template>
    <template #footer>
        <div class=footer>
            <slot name="footer-tag"></slot>
        </div>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';

export default {
  name: 'DetailCard',
  props: {
    title: String,
  },
  components: {
    Card,
  }
}

</script>

<style scoped>
.footer {
  display: flex;
}

.card {
  background-color: #f1f1f1;
  border-radius: 25px;
  padding: 20px;
  margin: 20px;
}
</style>