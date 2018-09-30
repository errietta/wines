<template>
  <SearchResultsPage :searchQuery="searchQuery" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SearchResultsPage from '@/components/SearchResultsPage.vue';

@Component({
  components: {
    SearchResultsPage,
  },
})
export default class Search extends Vue {
  @Prop() private searchQuery!: string;
}
</script>
