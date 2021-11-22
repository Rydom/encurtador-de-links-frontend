<template>
  <div>
    <p class="logo">Z<span>G</span>LIFY</p>
  </div>
  <!-- <v-toolbar-title v-text="title" class="logo" /> -->
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
    margin-top: 20px;
    font-size: 32px !important;
    font-family: Poppins, sans-serif;
    font-weight: 650;
    letter-spacing: 2px;
  }
  .logo span {
    color: #7CB342;  /* light-green darken-1 */
  }
</style>
