<template>
  <div class="background">
    <form class="home-search" name='search_wines' action='/search' method='get'>
      <h1>Search thousands of wine reviews</h1>
      <input type='text' name='search_wines' :placeholder="'Search: ' + searchPlaceholder" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  get searchPlaceholder() {
    return 'Sweet and tasty';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .background {
    background-image: url('/images/wine-background.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
  }
  .home-search input {
    width: 50%;
    margin-left: 20px;
    height: 40px;
    padding: 20px;
    /* margin-top: 20px; */
  }
  .home-search h1 {
    padding: 50px 0 0 20px;
  }
</style>
