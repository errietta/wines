<template>
  <footer>
    &copy; 2018
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
}
</script>
<style scoped>
  footer {
    position: absolute;
    height: 40px;
    bottom: 0;
    padding: 10px;
  }
</style>
