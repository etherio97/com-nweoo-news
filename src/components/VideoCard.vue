<template>
  <v-card class="videoCard">
    <video-player
      ref="player"
      class="vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
      width="100%"
      height="auto"
      controls
    ></video-player>

    <v-card-title class="mb-1">
      {{ title }}
    </v-card-title>

    <v-card-subtitle>
      {{ datetime }}
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
        color="blue darken-2"
        :href="`https://facebook.com/${permalink_url}`"
        rel="noreferrer noopener"
        target="_blank"
        text
      >
        <v-icon
          small
          dark
          color="blue darken-2"
          class="mr-1 font-weight-medium"
        >
          mdi-facebook
        </v-icon>
        တွင်ကြည့်ရန်
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import VideoPlayer from "vue-video-player-vjs";
import "video.js/dist/video-js.css";
import { parseUrl } from "@/functions/formatter";

let __i;

export default {
  name: "VideoCard",
  components: {
    VideoPlayer,
  },
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    created_time: {
      type: String,
    },
    source: {
      type: String,
      required: true,
    },
    permalink_url: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    readmore: false,
    _source: "",
    playerOptions: {
      autoplay: false,
      controls: true,
      preload: "auto",
      fluid: true,
      aspectRatio: "16:9",
      notSupportedMessage: "",
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [
        {
          withCredentials: false,
          type: null,
          src: null,
        },
      ],
      controlBar: {
        timeDivider: false,
        remainingTimeDisplay: false,
        currentTimeDisplay: true,
        durationDisplay: true,
      },
    },
    indexOfPoster: null,
  }),
  computed: {
    html() {
      let description = this.description.replace(/\n/gim, "<br>");
      return parseUrl(description);
    },
    wrap() {
      return this.textWrap ? this.html.substr(0, 255) + "..." : this.html;
    },
    textWrap() {
      return this.description.length > 255;
    },
    datetime() {
      return new Date(this.created_time).toLocaleString("my-MM");
    },
    poster() {
      const images = this.thumbnails;
      const image =
        images[5] ||
        images[4] ||
        images[3] ||
        images[2] ||
        images[1] ||
        images[0];
      return `${this.$root["api"]}/open?url=${encodeURIComponent(image.uri)}`;
    },
  },
  beforeMount() {
    this.playerOptions.sources[0].title = this.title;
    this.playerOptions.sources[0].type = "video/mp4";
    this.playerOptions.sources[0].src = `${
      this.$root["api"]
    }/open?url=${encodeURIComponent(this.source)}`;
    this.playerOptions.poster = this.poster;
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/components/videoCard.scss";
</style>
