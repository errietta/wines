<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <!-- <Footer /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Footer from '@/views/Footer.vue';

@Component({
  components: {
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  background-color: #191825;
  color: white;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  margin-bottom: -40px;
}
#nav {
  padding: 30px;
}

#nav a {
  color: rgb(255, 247, 247);
}

#nav a.router-link-exact-active {
  font-weight: bold;
  color: white;
}
</style>
