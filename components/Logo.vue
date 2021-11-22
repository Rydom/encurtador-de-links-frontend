<template>
  <v-toolbar-title v-text="title" class="logo" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Logo',
  props: {
    title: String
  },
})
</script>

<style scoped>
  .logo {
    font-size: 32px !important;
    font-family: Poppins, sans-serif
  }
</style>
