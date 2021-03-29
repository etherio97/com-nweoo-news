<template>
  <v-container
    class="mx-auto mt-10"
    style="max-width: 500px; min-width: 320px; width: 100%"
  >
    <v-form>
      <v-stepper :value="step">
        <v-stepper-header>
          <v-stepper-step step="1">ဘယ်အချိန်</v-stepper-step>
          <v-stepper-step step="2">ဘယ်နေရာ</v-stepper-step>
          <v-stepper-step step="3">ဘာတွေဖြစ်</v-stepper-step>
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
              <v-card-title> ဘယ်နေရာမှာဖြစ်တာလဲ </v-card-title>
              <v-card-text>
                <v-autocomplete
                  :items="divisions_mm"
                  v-model="regionState"
                  label="တိုင်းဒေသကြီး/ပြည်နယ်"
                  outlined
                />
                <v-expand-transition>
                  <v-combobox
                    v-model="city_village"
                    label="မြို့/နယ်"
                    v-show="stage === 2"
                    outlined
                    append-icon=""
                  />
                </v-expand-transition>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="step++" :disabled="!regionState">
                  နောက်တဆင့်
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card>
              <v-card-title> ဘာတွေဖြစ်နေလဲ </v-card-title>
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
              </v-card-text>
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
import { mapGetters } from "vuex";

export default {
  name: "OnlineReport",
  data: () => ({
    step: 3,
    error: null,
    user: null,
    loading: true,
    regionState: "",
    city_village: "",
    title: "",
    body: "",
    date: "",
    time: "",
    stage: 1,
    keywords: [
      "ပစ်ခတ်",
      "ဖြိုခွင်း",
      "ဖမ်းစီး",
      "ရိုက်နှက်",
      "စစ်သား",
      "ရဲ",
      "နဲ့",
      "စစ်",
      "တပ်",
      "ကား",
      "တွေ",
      "ကျည်",
      "ထိ",
      "သေ",
      "သွား",
      "ပါ",
      "တယ်",
      "ဝင်",
      "ရောက်",
      "လာ",
      "ပြီ",
      "လို့",
    ],
  }),

  methods: {
    submit() {
      const data = {
        body: this.body,
        regionState: this.regionState,
        datetime: new Date(`${this.date} ${this.time} GMT+06:30`),
      };
      this.error = "";
      this.loading = true;
      this.step++;
      this.axios
        .post(`${this.$root.api}/online-report`, data)
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
    ...mapGetters("regionState", ["divisions_mm"]),
    invalidDateTime() {
      const today = new Date();
      const update = new Date(`${this.date} ${this.time} GMT+06:30`);
      return update >= today;
    },
  },

  watch: {
    regionState(value) {
      this.stage = (this.divisions_mm.includes(value) && 2) || 1;
    },
  },

  beforeMount() {
    const dt = new Date();
    let mm = dt.getMonth() + 1;
    mm < 9 && (mm = "0" + mm);
    this.date = `${dt.getFullYear()}-${mm}-${dt.getDate()}`;
    this.time = `${dt.getHours()}:${dt.getMinutes()}`;
    this.loading = false;
  },
};
</script>
