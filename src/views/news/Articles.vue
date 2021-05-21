<template>
  <v-container class="mt-5 mx-auto">
    <h2 class="title">သတင်းများ</h2>

    <div class="mt-5 mb-3">
      <search-input></search-input>
    </div>

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

      <template v-if="!loaded">
        <v-col cols="12">
          <v-skeleton-loader
            max-width="100%"
            type="image, card-heading, divider, list-item-three-line"
          />
        </v-col>
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

        <v-col v-for="(article, i) of latestArticles" :key="i" cols="12" md="6">
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

        <v-col cols="12" class="text-center">
          <v-btn
            color="primary"
            :loading="loading"
            :text="loading"
            @click="fetchMoreArticles()"
            rounded
          >
            နောက်ထပ်...
          </v-btn>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ArticleCard from "@/components/ArticleCard.vue";
import SearchInput from "@/components/SearchInput.vue";

export default {
  name: "NewsArticles",
  components: {
    ArticleCard,
    SearchInput,
  },
  data: () => ({
    loading: true,
    loaded: false,
    error: null,
  }),
  methods: {
    ...mapActions("articles", ["FETCH_ARTICLES", "MORE_ARTICLES"]),
    fetchMoreArticles() {
      this.loading = true;
      this.MORE_ARTICLES(this.$root).finally(() => {
        this.loading = false;
      });
    },
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
        this.loaded = !this.loading;
      });
  },
};
</script>
