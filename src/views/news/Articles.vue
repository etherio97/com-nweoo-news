<template>
  <v-container class="mt-5">
    <v-row class="px-2" justify="space-between">
      <h2>သတင်းဆောင်ပါးများ</h2>
      <template v-if="usingRTDB">
        <v-btn small text @click="useAPI" color="red darken-3" rounded>
          <v-icon class="mr-1" small>mdi-radiobox-marked</v-icon>
          Live
        </v-btn>
      </template>
      <template v-else>
        <v-btn small text @click="useRTDB" color="grey lighten-2" rounded>
          <v-icon class="mr-1" small>mdi-radiobox-marked</v-icon>
          Live
        </v-btn>
      </template>
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
        <v-col cols="12">
          <v-alert type="warning" v-show="$root.network_mode === 'rtdb'">
            ​VPN မရှိပါက ​Live ကို ပိတ်ပြီးအသုံးပြုပေးပါ။
          </v-alert>
        </v-col>
        <v-col v-for="n of [1, 2, 3]" :key="n" cols="12" md="6">
          <v-skeleton-loader
            max-width="100%"
            type="image, card-heading, divider, list-item-three-line"
          />
        </v-col>
      </template>

      <template v-else>
        <v-col v-for="article of items" :key="article.id" cols="12" md="6">
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

export default {
  name: "NewsArticles",
  components: {
    ArticleCard,
  },
  data: () => ({
    loading: true,
    error: null,
  }),
  methods: {
    ...mapActions("articles", ["FETCH_ARTICLES"]),
    useAPI() {
      localStorage.setItem("network_mode", "api");
      this.$router.go();
    },
    useRTDB() {
      localStorage.setItem("network_mode", "rtdb");
      this.$router.go();
    },
  },
  computed: {
    ...mapState("articles", ["items"]),
    usingRTDB() {
      return this.$root.network_mode === "rtdb";
    },
  },
  beforeMount() {
    this.FETCH_ARTICLES(this.$root)
      .catch((e) => (this.error = e.message))
      .finally(() => (this.loading = false));
  },
};
</script>
