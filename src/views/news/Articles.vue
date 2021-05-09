<template>
  <v-container class="mt-5">
    <v-row class="px-2" justify="space-between">
      <h2>သတင်းများ</h2>
      <live-button :items="items" :loaded="!loading" />
    </v-row>

    <v-row>
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

      <template v-if="!items.length">
        <v-col v-for="n of [1, 2, 3]" :key="n" cols="12" md="6">
          <v-skeleton-loader
            max-width="100%"
            type="image, card-heading, divider, list-item-three-line"
          />
        </v-col>
      </template>

      <template v-else>
        <v-col cols="12">
          <article-card
            :id="latestArticle.id"
            :title="latestArticle.title"
            :content="latestArticle.content"
            :timestamp="latestArticle.timestamp"
            :image="latestArticle.image"
            :link="latestArticle.link"
            :post_id="latestArticle.post_id"
            :source="latestArticle.source"
            :imageHeight="380"
          ></article-card>
        </v-col>

        <v-col
          v-for="article of latestArticles"
          :key="article.id"
          cols="12"
          md="6"
        >
          <article-card
            :id="article.id"
            :title="article.title"
            :content="article.content"
            :timestamp="article.timestamp"
            :image="article.image"
            :link="article.link"
            :post_id="article.post_id"
            :source="article.source"
          />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ArticleCard from "@/components/ArticleCard.vue";
import LiveButton from "@/components/LiveButton.vue";

export default {
  name: "NewsArticles",
  components: {
    ArticleCard,
    LiveButton,
  },
  data: () => ({
    loading: true,
    error: null,
  }),
  methods: {
    ...mapActions("articles", ["FETCH_ARTICLES"]),
  },
  computed: {
    ...mapState("articles", ["items"]),

    latestArticle() {
      return this.items[0];
    },

    latestArticles() {
      return this.items.slice(1);
    },
  },
  beforeMount() {
    this.FETCH_ARTICLES(this.$root)
      .catch((e) => {
        this.error = e.message;
      })
      .finally(() => {
        this.loading = !Boolean(this.items.length);
      });
  },
};
</script>
