<template>
  <v-card>
    <v-img
      v-if="image"
      aspect-ratio="1.7778"
      :lazy-src="imageDefault"
      :src="image"
    />
    <v-card-title v-if="title">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <span v-html="readmore ? html : wrap"></span>
      <a v-show="textWrap && !readmore" @click="readmore = true">
        ပိုမိုဖတ်ရှုရန်
      </a>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        rel="noreferrer noopener"
        :href="permalink_url"
        target="_blank"
        text
      >
        အပြည့်အစုံကြည့်ရန်
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import imageDefault from "@/assets/images/image.jpg";
import { parseTags, parseUrl } from "@/functions/formatter";

export default {
  name: "ArticleCardFeed",
  props: {
    message: { type: String },
    tags: { type: Array, default: Array },
    attachments: { type: Object },
    image: { type: String },
    permalink_url: { type: String },
    created_time: { type: String },
  },
  data: () => ({
    title: null,
    body: null,
    imageDefault,
    readmore: false,
  }),
  computed: {
    nweooBot() {
      return this.tags.findIndex(({ name }) => name === "#NweOoBot") !== -1;
    },

    wrap() {
      let message = (this.body || "").replace(/\n/gim, "<br>");
      return this.textWrap ? message.substr(0, 255) + "..." : message;
    },
    html() {
      return (this.body || "").replace(/\n/gm, " <br/>");
    },
    textWrap() {
      return this.message && this.message.length > 255;
    },
  },
  beforeMount() {
    this.body = parseUrl(parseTags(this.message || "", this.tags || []));
    if (this.nweooBot) {
      const message = this.body.split("\n");
      this.title = message.shift();
      this.body = message.join("\n");
    }
  },
};
</script>
