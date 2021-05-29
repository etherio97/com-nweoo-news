<template>
  <article class="mt-5 container">
    <v-expand-transition>
      <v-alert v-if="error" type="error">
        သင်ရှာနေသောသတင်းဆောင်းပါးအား ရှာမတွေပါ။
        <code>{{ error }}</code>
        <v-btn @click="$router.go()" color="secondary" dark>
          ပြန်လည်ကြိုးစာကြည့်ပါ။
        </v-btn>
        <v-btn @click="$router.push('/articles')" color="primary" dark>
          ရှေ့သို့ပြန်သွားရန်
        </v-btn>
      </v-alert>
    </v-expand-transition>
    <v-card v-if="loaded" class="mx-auto">
      <v-img
        :src="image"
        aspect-ratio="1.7778"
        lazy-src="@/assets/images/image.jpg"
        class="grey lighten-2"
      >
        <v-app-bar flat color="transparent">
          <v-btn
            color="grey lighten-4"
            icon
            @click="$router.push('/articles')"
            x-large
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-app-bar>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-card-title>
        <h1 id="title" class="h6">
          {{ title }}
        </h1>
      </v-card-title>
      <v-card-subtitle>
        <a id="publusher" :href="sourceURL" rel="no referral" target="_blank">
          {{ source }}
        </a>
        <time :datetime="datetimeISO">
          {{ datetimeLocale }}
        </time>
        <v-divider class="my-2"></v-divider>
      </v-card-subtitle>
      <v-card-text class="content" v-html="description"></v-card-text>
      <v-card-actions>
        <v-btn
          class="font-weight-medium"
          color="blue darken-2"
          :href="`https://www.facebook.com/${post_id}`"
          rel="noreferrer noopener"
          target="_blank"
          text
        >
          <v-icon small dark color="blue darken-2" class="mr-1">
            mdi-facebook
          </v-icon>
          တွင်ကြည့်ရန်
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          rel="noreferrer noopener"
          :href="`${link}`"
          target="_blank"
          text
        >
          <v-icon small dark color="primary" class="mr-1">
            mdi-open-in-new
          </v-icon>
          မူရင်းသတင်းသို့
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-skeleton-loader
      v-else
      max-width="100%"
      type="image, card-heading, divider, list-item-three-line"
    />
    <v-divider class="my-4"></v-divider>
    <v-row>
      <v-col cols="12">
        <h2 class="h6">နောက်ဆုံးရသတင်းများ</h2>
      </v-col>
      <v-col cols="12" sm="6" md="4" v-for="(item, i) in latest" :key="i">
        <v-card @click="$router.push(`/articles/${item.id}`)">
          <v-img :src="item.image"></v-img>
          <v-card-text class="text--primary font-weight-bold">
            {{ item.title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </article>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Article",
  data: () => ({
    error: null,
    title: undefined,
    source: undefined,
    sourceURL: undefined,
    link: undefined,
    content: undefined,
    image: undefined,
    post_id: undefined,
    photo_id: undefined,
    video_id: undefined,
    timestamp: undefined,
    loaded: false,
  }),
  methods: mapActions("articles", ["FETCH_ARTICLES"]),
  beforeMount() {
    let { id } = this.$route.params;
    let title = document.querySelector("title");
    if ("article" in window) {
      let data = window.article;
      let url = new URL(data.link);
      this.title = data.title;
      this.source = data.source;
      this.image = data.image;
      this.link = data.link;
      this.content = data.content;
      this.post_id = data.post_id;
      this.photo_id = data.photo_id;
      this.video_id = data.video_id;
      this.timestamp = data.timestamp;
      this.sourceURL = url.protocol + "//" + url.host;
      this.loaded = true;
      title.textContent = `${this.title} - ${this.source} | NweOo`;
      window.article = undefined;
      delete window.article;
    } else {
      this.axios
        .get(`${this.$root.api}/news/articles/${id}`)
        .then(({ data }) => {
          let url = new URL(data.link);
          this.title = data.title;
          this.source = data.source;
          this.image = data.image;
          this.link = data.link;
          this.sourceURL = url.protocol + "//" + url.host;
          this.content = data.content;
          this.post_id = data.post_id;
          this.photo_id = data.photo_id;
          this.video_id = data.video_id;
          this.timestamp = data.timestamp;
          title.textContent = `${this.title} - ${this.source} | NweOo`;
        })
        .catch((e) => {
          this.error = e.response?.data?.error || e.message;
        })
        .finally(() => {
          this.loaded = true;
        });
    }
    if (!this.items?.length) {
      this.FETCH_ARTICLES(this.$root);
    }
  },
  computed: {
    ...mapState("articles", ["items"]),
    latest() {
      return this.items
        .filter((item) => item["id"] !== this.$route.params.id)
        .slice(0, 3);
    },
    datetimeISO() {
      return new Date(this.timestamp).toISOString();
    },
    datetimeLocale() {
      return new Date(this.timestamp).toLocaleString("my-MM", {
        timeZone: "Asia/Yangon",
      });
    },
    description() {
      let content = this.content
        .split("\n")
        .filter((n) => !!n)
        .map((n) => '<p class="text-body-1">' + n + "</p>")
        .join("\n");

      return content;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/articleCard.scss";

h1 {
  font-size: 1.5rem;
}

.v-card__subtitle {
  padding-top: 10px;
}

#datetime::before {
  content: " | ";
}

.container {
  max-width: 800px;
}
</style>
