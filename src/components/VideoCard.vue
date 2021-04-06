<template>
  <v-card>
    <video-player
      class="vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
      width="100%"
      height="auto"
      controls
    ></video-player>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle>
      {{ new Date(created_time).toLocaleString() }}
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
import { parseUrl } from "@/functions/formatter";
import "video.js/dist/video-js.css";

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
    poster() {
      return this.thumbnails[5].uri;
    },
  },

  beforeMount() {
    let matched = this.source.match(/^https:\/\/(.+)-.+-.+\.xx\.fbcdn\.net/);
    let uri = new URL(this.source);
    if (matched) {
      switch (matched[1]) {
        case "external":
          uri = "https://cdn.nweoo.com/e" + uri.pathname + uri.search;
          break;
        case "scontent":
          uri = "https://cdn.nweoo.com/s" + uri.pathname + uri.search;
          break;
        case "video":
          uri = "https://cdn.nweoo.com/v" + uri.pathname + uri.search;
          break;
      }
      this.playerOptions.sources[0].title = this.title;
      this.playerOptions.sources[0].type = "video/mp4";
      this.playerOptions.sources[0].src = uri.toString();
    }
  },
};
</script>
