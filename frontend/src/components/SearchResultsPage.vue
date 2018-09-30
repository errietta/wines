<template>
  <div class='search-results'>
    <ul v-if="results.length">
      <li v-for="result in results" :key="result.id" class='highlight'>
        <h4 v-html="result.review.title_html" />
        <p>
          <span v-html="result.review.descr_html"></span>
        </p>
      </li>
    </ul>
    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
  .highlight >>> em {
    background-color: white;
    color: black;
  }
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { searchPhrase } from '@/search';

@Component
export default class SearchResultsPage extends Vue {
  @Prop() private searchQuery!: string;
  private error: string = '';
  private results: any[] = [];

  private mounted() {
    this.getData();
  }

  private getData() {
    searchPhrase(this.searchQuery).then((results) => {
      if (results && results.data && results.data.results && results.data.total) {
        this.results = results.data.results.map((result: any) => ({
          ...result,
          review: {
            ...result.review,
            descr_html: (
              result.highlight && result.highlight['description.english'] ?
              result.highlight['description.english'][0] :
              result.review.description
            ),
            title_html: (
              result.highlight && result.highlight.title ?
              result.highlight.title[0] :
              result.review.title
            ),
          },
        }));
      } else {
        this.error = 'No results';
      }
    }).catch((e) => { this.error = e.data || 'Error'; });
  }
}



</script>
