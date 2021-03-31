<template>
  <v-container>
    <v-row>
      <v-col v-for="article of articles" :key="article.id" cols="12" md="6">
        <article-card
          :content="article.content"
          :image="article.image"
          :link="article.link"
          :title="article.title"
          :datetime="article.datetime"
        ></article-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";

export default {
  name: "NewsArticles",
  components: {
    ArticleCard,
  },
  data: () => ({
    articles: [],
  }),
  beforeMount() {
    this.axios(`${this.$root.api}/articles`).then(({ data }) => {
      this.articles = data;
    });
  },
};
</script>
