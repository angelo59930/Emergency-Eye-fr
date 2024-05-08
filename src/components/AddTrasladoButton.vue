<template>
  <button @click="pressButton"> <slot></slot> </button>
</template>

<script>

export default {
  emits: ['action'],
  methods: {
    pressButton(event) {
      this.$emit('action', event)
    }
  }
}
</script>

<style scoped>
button {
  background-color: #23a98d;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

button:hover {
  background-color: #1b6f5b;
}

</style>