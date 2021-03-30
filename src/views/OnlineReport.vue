<template>
  <v-container
    class="mx-auto mt-10 mb-15"
    style="max-width: 500px; min-width: 320px; width: 100%;"
  >
    <v-form>
      <v-stepper :value="step">
        <v-stepper-header>
          <v-stepper-step step="1">ဘယ်ချိန်</v-stepper-step>
          <v-stepper-step step="2">ဘယ်မှာ</v-stepper-step>
          <v-stepper-step step="3">ဘာဖြစ်</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-card-title> ဘယ်အချိန် </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="date"
                  type="date"
                  label="နေ့စွဲ"
                  outlined
                />
                <v-text-field
                  v-model="time"
                  type="time"
                  label="အချိန်"
                  outlined
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="invalidDateTime"
                  @click="step++"
                >
                  နောက်တဆင့်
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card>
              <v-card-title>
                <v-btn @click="step--" icon color="primary">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                ဘယ်နေရာမှာဖြစ်တာလဲ
              </v-card-title>
              <v-card-text>
                <v-select
                  :items="divisions_mm"
                  v-model="regionState"
                  label="တိုင်းဒေသကြီး/ပြည်နယ်"
                  outlined
                />
                <v-expand-transition>
                  <v-autocomplete
                    v-model="city"
                    label="မြို့/နယ်"
                    v-show="stage >= 2"
                    outlined
                    append-icon=""
                    :items="citiesName"
                  />
                </v-expand-transition>
                <v-expand-transition>
                  <v-text-field
                    v-model="district"
                    label="ရပ်ကွက်/ကျေးရွာ (မဖြည့်လည်းရပါတယ်)"
                    v-show="stage >= 3"
                    outlined
                  />
                </v-expand-transition>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="step++"
                  :disabled="!regionState || !city"
                >
                  နောက်တဆင့်
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card>
              <v-card-title>
                <v-btn @click="step--" icon color="primary">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                ဘာတွေဖြစ်နေလဲ
              </v-card-title>
              <v-card-text class="pb-0 mb-0">
                <v-expand-transition>
                  <v-alert type="error" v-show="error">
                    {{ error }}
                  </v-alert>
                </v-expand-transition>
                <v-textarea
                  class="pb-0 mb-0"
                  label="အကြောင်းအရာ"
                  v-model="body"
                  outlined
                />
                <div class="px-3">
                  <template v-for="(keyword, index) in keywords">
                    <v-btn
                      class="mx-2 my-1"
                      :key="index"
                      @click="body += keyword"
                      v-text="keyword"
                      small
                      rounded
                    />
                  </template>
                </div>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="body.length < 15"
                  @click="submit"
                >
                  စာစုတင်ပါ
                  <v-icon class="ml-2">mdi-send</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card>
              <v-card-text class="text-center">
                <v-progress-circular
                  size="64"
                  indeterminate
                ></v-progress-circular>
                <div class="text-h6 mt-5">တင်နေပါတယ်</div>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="5">
            <v-card>
              <v-card-text class="text-center">
                <v-progress-circular color="success" size="64" value="100">
                  <v-icon>mdi-check</v-icon>
                </v-progress-circular>
                <div class="text-h6 mt-5">ပြီးပါပြီ။</div>
                <div class="mt-5">
                  <v-btn block color="primary" to="/reports">
                    ပေးပို့ချက်များကိုကြည့်ရန်
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-form>
  </v-container>
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters } from "vuex";

export default {
  name: "OnlineReport",
  data: () => ({
    step: 1,
    error: null,
    user: null,
    loading: true,
    regionState: "",
    city: "",
    district: "",
    title: "",
    body: "",
    date: "",
    time: "",
    stage: 1,
    keywords: [],
    upload: "",
  }),

  methods: {
    _(value) {
      return _.startCase(value);
    },
    submit() {
      const data = {
        body: this.body,
        region_state: this.regionState,
        city: this.city,
        district: this.district,
        datetime: new Date(`${this.date} ${this.time} GMT+06:30`).getTime(),
        text: this.body,
      };
      const url =
        `${this.$root.api}/online-report?` +
        `times=${this.$root.times++}&ga=${this.root._ga}`;
      this.error = "";
      this.loading = true;
      this.step++;
      this.axios
        .post(url, data)
        .then(() => this.step++)
        .catch((e) => {
          this.error =
            (e.response && e.response["data"] && e.response["data"]["error"]) ||
            e.message;
          this.step--;
        });
    },
  },

  computed: {
    ...mapState("regionState", ["cities"]),
    ...mapGetters("regionState", ["divisions_mm"]),
    invalidDateTime() {
      const today = new Date();
      const update = new Date(`${this.date} ${this.time} GMT+06:30`);
      return update >= today;
    },
    citiesName() {
      return this.cities.map((c) => this._(c["name_mm"] || c["name_en"]));
    },
  },

  watch: {
    regionState(value) {
      this.city = "";
      this.district = "";
      this.stage = (this.divisions_mm.includes(value) && 2) || 1;
    },
    city(value) {
      this.stage = (value.length && 3) || 2;
    },
    stage(value) {
      if (value === 2) {
        this.$store.dispatch("regionState/FETCH_CITIES", {
          division_mm: this.regionState,
          api: this.$root.api,
        });
      }
    },
  },

  beforeMount() {
    const dt = new Date();
    let de = dt.getDate();
    let mn = dt.getMonth() + 1;
    let hr = dt.getHours();
    let me = dt.getMinutes();

    de < 9 && (de = "0" + de);
    mn < 9 && (mn = "0" + mn);
    hr < 9 && (hr = "0" + hr);
    me < 9 && (me = "0" + me);

    this.date = `${dt.getFullYear()}-${mn}-${de}`;
    this.time = `${hr}:${me}`;
    this.loading = false;

    this.axios.get(this.$root.api + "/trends").then(({ data }) => {
      this.keywords = data;
    });
  },
};
</script>
