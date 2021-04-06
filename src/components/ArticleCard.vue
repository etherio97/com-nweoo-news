<template>
  <v-card class="articleCard">
    <div class="articleCard__mediaWrapper">
      <template v-if="video">
        <video-player
          class="video-player-box articleCard__media"
          ref="videoPlayer"
          :options="playerConfig"
          :poster="image"
          :playsinline="true"
          @ready="playerReadied"
          data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }'
        >
        </video-player>
      </template>
      <template v-else>
        <img :src="image" :alt="title" class="articleCard__media" />
      </template>
    </div>

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
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import "videojs-youtube";

const newsMedia = {
  RFA: "https://www.rfa.org/burmese",
  DVB: "https://burmese.dvb.no",
};

export default {
  name: "ArticleCard",
  props: {
    title: { required: true, type: String },
    image: { type: String },
    video: { type: String },
    content: { required: true, type: String },
    link: { required: true, type: String },
    datetime: { required: true, type: String },
    source: { required: true, type: String },
  },
  components: {
    videoPlayer,
  },
  data: () => ({
    readmore: false,
    player: null,
    playerConfig: {
      autoplay: false,
      aspectRatio: "5:3",
    },
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
  methods: {
    playerReadied() {
      this.player = this.$refs.videoPlayer.player;
      this.player.poster(this.image);
      // this.player.src({
      //   type: "video/youtube",
      //   src: this.video,
      // });
      // this.player.src(this.video);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/articleCard.scss";
</style>