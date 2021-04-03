<template>
  <v-card>
    <video
      v-if="viewing"
      :src="video"
      :poster="image"
      width="100%"
      height="auto"
      controls
    ></video>
    <v-img
      v-else
      id="video-cover"
      @click="viewing = true"
      aspect-ratio="1.7778"
      lazy-src="../assets/images/image.jpg"
      :src="image"
      :alt="title"
    />
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
const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export default {
  name: "VideoCard",
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
    viewing: false,
    readmore: false,
  }),
  watch: {
    viewing(value) {
      if (value) {
        setTimeout(() => {
          const vdo = document.querySelector("video");
          if (!vdo) return;
          vdo.addEventListener("canplaythrough", () => vdo.play());
        }, 800);
      }
    },
  },
  computed: {
    html() {
      let description = this.description.replace(/\n/gim, "<br>");
      let urls = description.match(URL_PATTERN);
      if (urls) {
        description = description.replace(
          new RegExp(`${urls[0]}`, "gim"),
          `<a href="${urls[0]}" class="text-decoration-underline" rel="noreferrer noopener" target="_blank">${urls[0]}</a>`
        );
      }
      return description;
    },
    wrap() {
      return this.textWrap ? this.html.substr(0, 255) + "..." : this.html;
    },
    textWrap() {
      return this.description.length > 255;
    },
    video() {
      return `${this.$root.api}/news/player?source=${btoa(this.source)}`;
    },
    image() {
      // let i = Math.floor(Math.random() * this.thumbnails.length);
      return `${this.$root.api}/news/image?source=${btoa(
        this.thumbnails[5].uri
      )}`;
    },
  },
};
</script>

<style scoped>
#video-cover {
  cursor: pointer;
}
</style>
