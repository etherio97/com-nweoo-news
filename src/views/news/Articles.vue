<template>
  <v-container class="mt-4 mb-15">
    <v-row>
      <v-col cols="12">
        <h2 class="py-4">သတင်းများ</h2>
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
              <v-btn
                text
                class="ma-2 font-weight-medium"
                color="secondary"
                @click="$router.go()"
                dark
              >
                ပြန်လည်ကြိုးစားကြည့်ပါ
              </v-btn>
            </v-alert>
          </v-col>
        </v-expand-transition>

        <v-col v-for="article of items" :key="article.id" cols="12" lg="6">
          <article-card
            :id="article.id"
            :title="article.title"
            :content="article.content"
            :datetime="article.datetime"
            :image="article.image"
            :video="article.video"
            :link="article.link"
            :post_id="article.post_id"
            :source="article.source"
          ></article-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ArticleCard from "@/components/ArticleCard.vue";

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
  beforeMount() {
    this.FETCH_ARTICLES()
      .catch((e) => (this.error = e.message))
      .finally(() => (this.loading = false));
  },
};
</script>
