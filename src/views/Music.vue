<template>
  <v-container>
    <h2>{{ title || "သီချင်းများ" }}</h2>
    <div class="mt-3 mb-2">
      <video v-show="played" ref="video" width="100%" controls></video>
    </div>
    <v-simple-table>
      <tbody>
        <template v-for="(item, i) in items">
          <tr
            :key="i"
            @click="play(item)"
            :class="
              $refs.video &&
              $refs.video.src === item.src &&
              'grey darken-2 white--text'
            "
          >
            <td>
              {{ item.name }}
              <v-chip color="primary" dark small>
                {{ item.artist }}
              </v-chip>
            </td>
            <td>{{ item.duration || "00:00" }}</td>
          </tr>
        </template>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import { getPublicURL } from "@/functions/database";

export default {
  name: "Music",
  data: () => ({
    items: [],
    title: null,
    played: false,
  }),
  methods: {
    fetchMusic() {
      return this.axios(getPublicURL("tracks")).then((res) =>
        Object.entries(res.data)
          .map(([id, value]) => ({ id, ...value }))
          .reverse()
      );
    },
    play({ name, artist, src }) {
      this.title = `${name}${artist ? " - " + artist : ""}`;
      this.$refs.video.src = src;
    },
  },
  async beforeMount() {
    this.items = await this.fetchMusic();
    this.$refs.video.addEventListener("canplaythrough", () =>
      this.$refs.video.play().then(() => (this.played = true))
    );
  },
};
</script>

<style></style>
