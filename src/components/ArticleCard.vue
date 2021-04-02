<template>
  <v-card class="articleCard">
    <template v-if="video"> Show video </template>
    <template v-else>
      <v-img v-show="image" :src="image"></v-img>
    </template>

    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-subtitle>
      {{ new Date(datetime).toLocaleString() }} -
      <a :href="'https://burmese.dvb.no'" target="_blank">{{ source }}</a>
    </v-card-subtitle>

    <v-card-text>
      {{ readmore ? content : content.substr(0, 300) + "..." }}
      <a @click="readmore = !readmore">{{
        readmore ? "" : "ပိုမိုဖတ်ရှုရန်"
      }}</a>
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
export default {
  name: "ArticleCard",
  props: ["title", "image", "video", "content", "link", "datetime", "source"],
  data: () => ({
    readmore: false,
  }),
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/articleCard.scss";
</style>
