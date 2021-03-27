<template>
  <v-container>
    <v-card elevation="0">
      <v-card-title>
        SMS Reports
        <device-status />
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="5" class="mx-auto text-center">
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
          <v-col cols="12" sm="7">
            <v-list three-line>
              <template v-for="report in reports">
                <v-list-item-content :key="report.id" v-if="report.deleted">
                  <i class="text-grey text--accent-4">
                    - This content has been deleted.
                  </i>
                </v-list-item-content>
                <v-list-item-content :key="report.id" v-else>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ new Date(report.timestamp).toLocaleString() }}
                    </v-list-item-title>
                    <v-divider></v-divider>
                    <v-list-item-subtitle>
                      {{ report.message || report.text }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item-content>
              </template>
            </v-list>
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

export default {
  data: () => ({
    loading: true,
  }),
  components: {
    ReporterCard,
    DeviceStatus,
  },
  name: "Home",
  computed: mapState("reports", ["reports"]),
  methods: mapActions("reports", ["UPDATE_REPORTS"]),
  beforeMount() {
    this.UPDATE_REPORTS({ url: this.$root.api }).then(() => {
      this.loading = false;
    });
  },
};
</script>

<style scoped>
video#tvc {
  max-width: 100%;
  min-width: 320px;
}
</style>
