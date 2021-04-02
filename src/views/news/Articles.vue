<template>
  <v-container class="mt-4 mb-15">
    <v-row>
      <v-col cols="12">
        <h2>သတင်းများ</h2>
      </v-col>

      <template v-if="loading">
        <v-col v-for="n of [1, 2, 3]" :key="n" cols="12" md="6">
          <v-skeleton-loader
            max-width="100%"
            type="image, card-heading, divider, list-item-three-line"
          />
        </v-col>
      </template>

      <template v-else>
        <v-expand-transition>
          <v-col cols="12" v-show="error">
            <v-alert type="error">
              {{ error }}
            </v-alert>
          </v-col>
        </v-expand-transition>

        <v-col cols="12" md="6" lg="4">
          <article-card
            :source="dummyArticle.source"
            :content="dummyArticle.content"
            :image="dummyArticle.image"
            :video="dummyArticle.video"
            :link="dummyArticle.link"
            :title="dummyArticle.title"
            :datetime="dummyArticle.datetime"
          ></article-card>
        </v-col>

        <v-col
          v-for="article of items"
          :key="article.id"
          cols="12"
          md="6"
          lg="4"
        >
          <article-card
            :source="article.source"
            :content="article.content"
            :image="article.image"
            :video="article.video"
            :link="article.link"
            :title="article.title"
            :datetime="article.datetime"
          ></article-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "NewsArticles",
  components: {
    ArticleCard,
  },
  data: () => ({
    loading: true,
    error: null,
    dummyArticle: {
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed error excepturi, quis illum saepe fugiat at nobis explicabo maxime architecto!",
      datetime: "2021-04-01T10:10:58.443Z",
      id: "1",
      image:
        "https://www.myanmargraphic.com/wp-content/uploads/2021/02/Burma-Spring-Revolution-830x466.png",
      video: "https://youtu.be/691VmUszg8g",
      link: "https://www.myanmargraphic.com/burma-spring-revolution/",
      post_id: "1",
      source: "RFA",
      title: "Myanmar Spring Revolution",
    },
  }),
  methods: mapActions("articles", ["FETCH_ARTICLES"]),
  computed: mapState("articles", ["items"]),
  mounted() {
    this.FETCH_ARTICLES({ url: this.$root.api })
      .catch(() => (this.error = true))
      .finally(() => (this.loading = false));
  },
};
</script>
