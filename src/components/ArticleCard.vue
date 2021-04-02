<template>
  <v-card>
    <v-img v-show="image" :src="image"></v-img>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle>
      {{ new Date(datetime).toLocaleString() }} -
      <a :href="sourceUrl" target="_blank">{{ source }}</a>
    </v-card-subtitle>
    <v-card-text>
      <span v-html="readmore ? content.replace(/\n/gim, '<br>') : body"></span>
      <a v-show="textWrap && !readmore" @click="readmore = true">
        ပိုမိုဖတ်ရှုရန်
      </a>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :href="link" target="_blank" text>
        အပြည့်အစုံကြည့်ရန်
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
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
    readmore: false,
  }),
  computed: {
    sourceUrl() {
      return newsMedia[this.source] || "#";
    },
    body() {
      return this.textWrap ? this.content.substr(0, 255) + "..." : this.content;
    },
    textWrap() {
      return this.content.length > 255;
    },
  },
};
</script>
