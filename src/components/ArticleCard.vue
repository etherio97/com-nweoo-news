<template>
  <v-card class="articleCard">
    <!-- :to="`/articles/${id}`" -->
    <v-img
      v-if="image"
      aspect-ratio="1.7778"
      @click="$router.push(`/articles/${id}`)"
      lazy-src="@/assets/images/image.jpg"
      :max-height="imageHeight"
      :src="`https://api.nweoo.com/open?url=${encodeURLComponent(image)}`"
    />

    <v-card-title class="mb-1">
      <router-link class="font-weight-bold" :to="`/articles/${id}`">
        {{ title }}
      </router-link>
    </v-card-title>

    <v-card-subtitle>
      <a :href="sourceUrl" rel="noopener noreferrer" target="_blank">
        {{ source }}
      </a>
      | {{ new Date(timestamp).toLocaleString() }}
    </v-card-subtitle>

    <v-card-text>
      <span>{{ description }}</span>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        class="font-weight-bold"
        :to="`/articles/${id}`"
        text
      >
        ဆက်ဖတ်ရန်
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const newsMedia = {
  RFA: "https://www.rfa.org/burmese",
  DVB: "https://burmese.dvb.no",
  VOA: "https://burmese.voanews.com",
};

export default {
  name: "ArticleCard",
  props: {
    id: { required: true, type: String },
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
    description() {
      return this.content.split("\n").filter((n) => !!n)[0];
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/articleCard.scss";
</style>
