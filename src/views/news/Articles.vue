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
              <v-btn
                text
                class="ma-2 font-weight-medium"
                color="secondary"
                @click="$router.go()"
              >
                ပြန်လည်ကြိုးစားကြည့်ပါ
              </v-btn>
            </v-alert>
          </v-col>
        </v-expand-transition>

        <v-col v-for="article of items" :key="article.id" cols="12" lg="6">
          <article-card-feed
            :permalink_url="article.permalink_url"
            :attachments="article.attachments"
            :message="article.message"
            :tags="article.message_tags"
            :image="article.picture_full"
          ></article-card-feed>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ArticleCardFeed from "@/components/ArticleCardFeed.vue";

export default {
  name: "NewsArticles",
  components: {
    ArticleCardFeed,
  },
  data: () => ({
    loading: true,
    error: null,
    items: [],
  }),
  methods: mapActions("articles", ["FETCH_ARTICLES"]),
  // computed: mapState("articles", ["items"]),
  beforeMount() {
    this.items = require("@/assets/articles.json")["data"];
    this.loading = false;
    return;
    this.FETCH_ARTICLES(this.$root)
      .catch((e) => (this.error = e.message))
      .finally(() => (this.loading = false));
  },
};
</script>
