<template>
  <v-container class="mt-5">
    <v-expand-transition>
      <v-alert v-if="error" type="error">
        {{ error }}
      </v-alert>
    </v-expand-transition>
    <v-card v-if="loaded && !error" max-width="800px" class="mx-auto">
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
        {{ title }}
      </v-card-title>
      <v-card-subtitle>
        <a :href="sourceURL" rel="no referral" target="_blank">{{ source }}</a>
        -
        {{ datetime }}
      </v-card-subtitle>
      <v-card-text v-html="description"></v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          class="font-weight-bold"
          color="blue darken-2"
          :href="`https://www.facebook.com/nweoo22222/posts/${post_id
            .split('_')
            .pop()}`"
          rel="noreferrer noopener"
          target="_blank"
          text
        >
          <v-icon small dark color="blue darken-2" class="mr-1">
            mdi-facebook
          </v-icon>
          တွင်ကြည့်ရန်
        </v-btn>
        <v-btn
          color="primary"
          class="font-weight-bold"
          rel="noreferrer noopener"
          :to="link"
          target="_blank"
          v-text="'မူရင်းသတင်းသို့'"
          text
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
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
  },
  computed: {
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
</style>
