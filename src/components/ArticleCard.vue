<template>
  <v-card>
    <v-img
      v-if="image"
      aspect-ratio="1.7778"
      :lazy-src="imageDefault"
      :src="image"
    />
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle>
      {{ new Date(datetime).toLocaleString() }} -
      <a :href="sourceUrl" target="_blank">{{ source }}</a>
    </v-card-subtitle>
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
        :href="link"
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

const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const newsMedia = {
  RFA: "https://www.rfa.org/burmese",
  DVB: "https://burmese.dvb.no",
};
export default {
  name: "ArticleCard",
  props: {
    title: { required: true, type: String },
    image: { type: String },
    content: { required: true, type: String },
    link: { required: true, type: String },
    datetime: { required: true, type: String },
    source: { required: true, type: String },
  },
  data: () => ({
    imageDefault,
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
      let content = this.content.replace(/\n/gim, "<br>");
      let urls = content.match(URL_PATTERN);
      if (urls) {
        content = content.replace(
          new RegExp(`${urls[0]}`, "gim"),
          `<a href="${urls[0]}" class="text-decoration-underline" rel="noreferrer noopener" target="_blank">${urls[0]}</a>`
        );
      }
      return content;
    },
    textWrap() {
      return this.content.length > 255;
    },
  },
};
</script>
