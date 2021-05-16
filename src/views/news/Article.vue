<template>
  <v-container class="mt-5 container">
    <v-expand-transition>
      <v-alert v-if="error" type="error">
        {{ error }}
      </v-alert>
    </v-expand-transition>
    <v-card v-if="loaded && !error" class="mx-auto">
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
            @click="$router.push('/news')"
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
        <h1 class="h6">
          {{ title }}
        </h1>
      </v-card-title>
      <v-card-subtitle>
        <a id="source" :href="sourceURL" rel="no referral" target="_blank">
          {{ source }}
        </a>
        <span id="datetime">
          {{ datetime }}
        </span>
      </v-card-subtitle>
      <v-card-text v-html="description"></v-card-text>
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
          :href="`${link.replace('http:', 'https:')}`"
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

    <v-divider class="my-10"></v-divider>
    <v-row>
      <v-col cols="12">
        <h2 class="h6">နောက်ဆုံးရသတင်းများ</h2>
      </v-col>
      <v-col cols="4" v-for="(item, i) in latest" :key="i">
        <v-card @click="$router.push(`/articles/${item.id}`)">
          <v-img :src="item.image"></v-img>
          <v-card-subtitle>
            {{ item.title }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const newsMedia = {
  RFA: "https://www.rfa.org/burmese",
  DVB: "https://burmese.dvb.no",
  VOA: "https://burmese.voanews.com",
};

export default {
  name: "Article",
  data: () => ({
    error: null,
    title: undefined,
    source: undefined,
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
  mounted() {
    let { id } = this.$route.params;
    this.axios
      .get(`${this.$root.api}/news/articles/${id}`)
      .then(({ data }) => {
        this.title = data.title;
        this.source = data.source;
        this.image = data.image;
        this.link = data.link;
        this.content = data.content;
        this.post_id = data.post_id;
        this.photo_id = data.photo_id;
        this.video_id = data.video_id;
        this.timestamp = data.timestamp;
        let title = window.document.querySelector("title");
        if (title) {
          title.textContent = `${data.title} - ${data.source} | ${title.textContent}`;
        }
      })
      .catch((e) => {
        if (e.status == 404) {
          this.error = "ရှာမတွေ့ပါ။";
        } else {
          this.error = e.response?.data?.error || e.message;
        }
      })
      .finally(() => (this.loaded = true));

    if (!this.items) {
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
    datetime() {
      return new Date(this.timestamp).toLocaleString("my-MM", {
        timeZone: "Asia/Yangon",
      });
    },
    description() {
      return this.content
        .split("\n")
        .filter((n) => !!n)
        .map((n) => "<p>" + n + "</p>")
        .join("\n");
    },
    sourceUrl() {
      return newsMedia[this.source] || "#";
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
