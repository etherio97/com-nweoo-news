<template>
  <v-container>
    <v-card elevation="0">
      <v-card-title>
        SMS Reports
        <device-status />
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="5" class="mx-auto text-center">
            <video
              id="tvc"
              preload="auto"
              loop="loop"
              muted="muted"
              autoplay="autoplay"
              width="100%"
              title="NweOo SMS Reporter - TVC (1)"
            >
              <source
                type="video/mp4"
                src="https://firebasestorage.googleapis.com/v0/b/nwe-oo.appspot.com/o/public%2F2021%2F03%2Fnweoo-sms-reporter-720p.mp4?alt=media&amp;token=b2126306-01dc-4fb5-a5e9-74f5ac40db6d"
              />
              <source
                type="video/mp4"
                src="https://firebasestorage.googleapis.com/v0/b/nwe-oo.appspot.com/o/public%2F2021%2F03%2Fnweoo-sms-reporter-480p.mp4?alt=media&amp;token=73d09c30-bc8d-47d8-a642-b44834345af5"
              />
            </video>
          </v-col>
          <v-col cols="12" md="7">
            <div class="text-right">
              <code>Last updated at: {{ updated_at.toLocaleString() }}</code>
            </div>
            <template v-for="report in reports">
              <v-list-item-content :key="report.id" v-if="report.deleted">
                <i class="text-grey text--accent-4">
                  - This content has been deleted.
                </i>
              </v-list-item-content>
              <v-card
                :key="report.id"
                class="my-4"
                v-else
                :to="`/report/${report.id}`"
              >
                <v-card-subtitle>
                  {{ new Date(report.timestamp).toLocaleString() }}
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-title>
                  {{ report.message || report.text }}
                </v-card-title>
              </v-card>
            </template>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ReporterCard from "@/components/ReporterCard.vue";
import { mapActions, mapState } from "vuex";
import DeviceStatus from "@/components/DeviceStatus.vue";

const MAX_TIMEOUT = 30000;

let _t;

export default {
  data: () => ({
    loading: true,
    updated_at: null,
  }),
  components: {
    ReporterCard,
    DeviceStatus,
  },
  name: "Home",
  computed: mapState("reports", ["reports"]),
  methods: {
    ...mapActions("reports", ["UPDATE_REPORTS"]),
    update() {
      _t && clearTimeout(_t);
      _t = setTimeout(() => this.update(), MAX_TIMEOUT);
      this.UPDATE_REPORTS({ url: this.$root.api }).then(() => {
        this.updated_at = new Date();
        this.loading = false;
      });
    },
  },
  beforeMount() {
    this.update();
  },
};
</script>

<style scoped>
video#tvc {
  max-width: 100%;
  min-width: 320px;
}
</style>
