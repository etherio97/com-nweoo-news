<template>
  <v-container class="mt-4 mb-15">
    <v-row>
      <v-col cols="12">
        <h2>ဗီဒီယိုသတင်းများ</h2>
      </v-col>
      <template v-if="loading">
        <v-col v-for="n in [1, 2, 3]" :key="n" cols="6" lg="4">
          <v-skeleton-loader
            max-width="100%"
            type="image, card-heading, divider, list-item-three-line"
          />
        </v-col>
      </template>
      <template v-else>
        <v-expand-transition>
          <v-col cols="12" v-show="error">
            <v-alert type="error">
              {{ error }}
              <v-btn
                class="ma-2 font-weight-medium"
                color="primary"
                @click="$router.go()"
              >
                ပြန်လည်ကြိုးစားကြည့်ပါ
              </v-btn>
            </v-alert>
          </v-col>
        </v-expand-transition>

        <v-col v-for="video in items" :key="video.id" cols="6" lg="4">
          <video-card
            :id="video.id"
            :created_time="video.created_time"
            :title="video.title"
            :thumbnails="video.thumbnails['data']"
            :permalink_url="video.permalink_url"
            :description="video.description"
            :source="video.source"
          ></video-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import VideoCard from "@/components/VideoCard.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "VideoNews",
  data: () => ({
    loading: true,
    error: null,
  }),
  components: {
    VideoCard,
  },
  computed: mapState("videos", ["items"]),
  methods: mapActions("videos", ["FETCH_VIDEOS"]),
  beforeMount() {
    this.FETCH_VIDEOS(this.$root)
      .catch((e) => (this.error = e.message))
      .finally(() => (this.loading = false));
  },
};
</script>
