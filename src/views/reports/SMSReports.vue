<template>
  <section class="reports">
    <v-container class="mt-4">
      <v-card elevation="0" color="transparent">
        <v-card-title class="text-h5">
          ပေးပို့ချက်များ
          <live-button
            :items="items"
            :loaded="!loading"
            :timeout="timeout"
          ></live-button>
        </v-card-title>

        <v-card-text>
          <v-expand-transition>
            <v-alert type="error" v-show="error">
              {{ error }}
            </v-alert>
          </v-expand-transition>

          <div class="text-right" v-if="updated_at">
            <code>Last updated at: {{ updated_at.toLocaleString() }}</code>
          </div>

          <div>
            <template v-if="loading">
              <v-skeleton-loader
                max-width="100%"
                type="card-heading, divider, list-item-three-line"
              />
            </template>

            <template v-for="report in reports" v-else>
              <v-list-item-content
                v-if="report.deleted"
                :key="report.id"
                class="my-4"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ attr, on }">
                    <i v-on="on" v-bind="attr" class="text-grey text--accent-4">
                      - This content has been deleted.
                    </i>
                  </template>

                  <span>
                    {{ report.message }} -
                    {{ new Date(report.timestamp).toLocaleString() }}
                  </span>
                </v-tooltip>
              </v-list-item-content>

              <report-card
                v-else
                :key="report.id"
                :report="report"
              ></report-card>
            </template>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ReportCard from "@/components/ReportCard.vue";
import LiveButton from "@/components/LiveButton.vue";

const MAX_TIMEOUT = 1500;

export default {
  data: () => ({
    error: null,
    loading: true,
    updated_at: undefined,
    timeout: MAX_TIMEOUT,
  }),
  components: {
    ReportCard,
    LiveButton,
  },
  name: "Home",
  computed: mapState("reports", ["reports"]),
  methods: {
    ...mapActions("reports", ["UPDATE_REPORTS"]),
    update() {
      this.UPDATE_REPORTS({
        url: this.$root["api"],
        network_mode: this.$root["network_mode"],
      })
        .then(() => {
          this.updated_at = new Date();
          this.error = null;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = !Boolean(this.reports.length);
          this.error = e.message;
        });
    },
  },
  mounted() {
    this.update();
  },
};
</script>
