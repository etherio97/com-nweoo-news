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
  }),
  methods: mapActions("articles", ["FETCH_ARTICLES"]),
  computed: mapState("articles", ["items"]),
  beforeMount() {
    this.FETCH_ARTICLES(this.$root)
      .catch((e) => (this.error = e.message))
      .finally(() => (this.loading = false));
  },
};
</script>
