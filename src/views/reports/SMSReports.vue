<template>
  <section class="reports">
    <v-container class="mt-4">
      <v-card elevation="0" color="transparent">
        <v-card-title class="text-h5">
          SMS မှ တဆင့် ပေးပို့ချက်များ
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
import DeviceStatus from "@/components/DeviceStatus.vue";
import ReportCard from "@/components/ReportCard.vue";

const MAX_TIMEOUT = 30000; // 30s

let _t;

export default {
  data: () => ({
    error: null,
    loading: true,
    updated_at: undefined,
  }),
  components: {
    DeviceStatus,
    ReportCard,
  },
  name: "Home",
  computed: mapState("reports", ["reports"]),
  methods: {
    ...mapActions("reports", ["UPDATE_REPORTS"]),
    update() {
      this.UPDATE_REPORTS({
        url: this.$root.api,
      })
        .then(() => {
          this.updated_at = new Date();
          this.error = null;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.error = e.message;
        });
    },
  },
  mounted() {
    this.update();
  },
};
</script>
