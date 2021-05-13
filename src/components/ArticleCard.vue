<template>
  <v-card class="articleCard">
    <v-img
      v-if="image"
      aspect-ratio="1.7778"
      lazy-src="@/assets/images/image.jpg"
      :max-height="imageHeight"
      :src="image"
    />

    <v-card-title class="mb-1">
      {{ title }}
    </v-card-title>

    <v-card-subtitle>
      {{ new Date(timestamp).toLocaleString() }} -
      <a :href="sourceUrl" target="_blank">{{ source }}</a>
    </v-card-subtitle>

    <v-card-text @click="readmore = !readmore">
      <span v-html="readmore ? html : wrap"></span>
      <a v-show="textWrap && !readmore" href="javascript:void(0)">
        ပိုမိုဖတ်ရန်
      </a>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        class="font-weight-bold"
        rel="noreferrer noopener"
        :href="link"
        target="_blank"
        text
      >
        မူရင်းသတင်းသို့
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { parseUrl } from "@/functions/formatter";

const newsMedia = {
  RFA: "https://www.rfa.org/burmese",
  DVB: "https://burmese.dvb.no",
  VOA: "https://burmese.voanews.com",
};

export default {
  name: "ArticleCard",
  props: {
    title: { required: true, type: String },
    image: { type: String },
    content: { required: true, type: String },
    link: { required: true, type: String },
    timestamp: { required: false, type: Number },
    source: { required: true, type: String },
    imageHeight: { required: false, type: Number },
  },
  data: () => ({
    readmore: false,
  }),
  computed: {
    sourceUrl() {
      return newsMedia[this.source] || "#";
    },
    wrap() {
      return this.textWrap ? this.content.substr(0, 255) + "..." : this.content;
    },
    html() {
      let content = this.content.replace(/\n\n?/gim, "<br>");
      return parseUrl(content);
    },
    textWrap() {
      return this.content.length > 255;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/articleCard.scss";
</style>
