<template>
  <v-container
    class="mx-auto mt-10"
    style="max-width: 500px; min-width: 320px; width: 100%"
  >
    <v-stepper :value="step">
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
            <v-card-title>တိုင်ကြားလိုသော Post ID ကိုထည့်ပါ။</v-card-title>
            <v-card-text>
              <v-text-field
                label="Post ID#"
                v-model="id"
                outlined
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="step = 2">တိုင်ကြားရန်</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-card-title> Post #{{ id }} ကို ဘာလုပ်နိုင်ပါသလဲ။</v-card-title>
            <v-card-text>
              <v-row justify="space-between">
                <v-col cols="12" sm="6">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attr }">
                      <v-btn
                        block
                        color="primary"
                        dark
                        v-on="on"
                        v-bind="attr"
                        large
                        @click="step = 3"
                      >
                        ပယ်ဖျက်ရန်တောင်းဆိုခြင်း
                      </v-btn>
                    </template>
                    <span class="text-body-1">
                      တောင်းဆိုခြင်းများပါက ပယ်ဖျက်သွားမည်ဖြစ်သည်။
                    </span>
                  </v-tooltip>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attr }">
                      <v-btn
                        block
                        dark
                        v-on="on"
                        v-bind="attr"
                        color="red darken-2"
                        large
                        @click="step = 4"
                      >
                        ချက်ချင်းပယ်ဖျက်ခြင်း
                      </v-btn>
                    </template>
                    <span class="text-body-1">
                      ဒီစာစုကိုပို့ခဲ့သောဖုန်းနံပါတ်ရိုက်ထည့်၍
                      ချက်ချင်းဖျက်နိုင်ပါသည်။
                    </span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card>
            <v-card-title>
              <v-btn @click="step = 2" icon color="primary">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              Post#{{ id }} ကို ပယ်ဖျက်ရန်တောင်းဆိုခြင်း
            </v-card-title>
            <v-card-text>
              <v-select
                label="အကြောင်းအရာ"
                outlined
                v-model="reason"
                :items="items"
              ></v-select>
              <v-expand-transition>
                <v-textarea
                  v-model="otherReason"
                  v-if="useOtherReason"
                  label="အကြောင်းပြချက်ဖော်ပြပါ။"
                  outlined
                ></v-textarea>
              </v-expand-transition>
              <v-expand-transition>
                <v-alert type="error" v-if="error">
                  {{ error }}
                </v-alert>
              </v-expand-transition>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="!reason" @click="submitReport">
                တောင်းဆိုပါ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card>
            <v-card-title>
              <v-btn @click="step = 2" icon color="primary">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              Post#{{ id }} ကို ချက်ချင်းဖျက်ရန်
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="ပေးပို့ခဲ့သည့်ဖုန်းနံပါတ်"
                outlined
                hint="အင်္ဂလိပ်လိုဖြည့်သွင်းပါ။ eg. 0942001234"
                v-model="phone"
                :error="error"
                type="tel"
              ></v-text-field>
              <v-expand-transition>
                <v-alert type="error" v-if="error">
                  {{ error }}
                </v-alert>
              </v-expand-transition>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" :disabled="!phone" @click="instantDelete"
                >ဖျက်ပါ</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="5">
          <v-card>
            <v-card-text class="text-center">
              <v-progress-circular
                size="64"
                indeterminate
              ></v-progress-circular>
              <div class="text-h6 mt-5">{{ status }}</div>
            </v-card-text>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="6">
          <v-card>
            <v-card-text class="text-center">
              <v-progress-circular
                color="success"
                size="64"
                value="100"
              ></v-progress-circular>
              <div class="text-h6 mt-5">ပြီးပါပြီ။</div>
            </v-card-text>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  name: "ReportSMS",
  components: {},
  data: () => ({
    loading: false,
    error: null,
    step: 1,
    id: "",
    phone: "",
    reason: "",
    status: "",
    items: [
      "မှားယွင်းသောသတင်းအချက်အလက်များ",
      "ရိုင်းစိုင်းသောစကားသုံးများ",
      "ပုပ်ခတ်ပြောဆိုထားသောစကားလုံးများ",
      "အကြောင်းအရာမသက်ဆိုင်ပါ",
      "အခြား",
    ],
    useOtherReason: false,
    otherReason: "",
  }),
  methods: {
    instantDelete() {
      this.step = 5;
      this.error = null;
      this.status = "အတည်ပြုနေသည်။";
      return this.axios
        .put(`${this.$root.api}/report/${this.id}`, {
          phone: this.phone,
        })
        .catch((e) => {
          if (e.message.match(/500/)) {
            this.step = 6;
            return;
          }
          this.withError("တစ်ခုခုမှားယွင်းနေသည်။", 4);
        });
      this.axios
        .delete(`${this.$root.api}/report/${this.id}?phone=${this.phone}`)
        .then(({ data }) => {
          this.step = 6;
        })
        .catch((e) =>
          this.withError("ဖုန်းနံပါတ် (သို့) တစ်ခုခုမှားယွင်းနေသည်။", 4)
        );
    },
    submitReport() {
      this.step = 5;
      this.error = null;
      this.status = "တိုင်ကြားနေသည်။";
      const report = {
        reason: this.reason,
        otherReson: this.otherReason,
      };
      this.axios
        .put(`${this.$root.api}/report/${this.id}`, report)
        .then(({ data }) => {
          this.step = 6;
        })
        .catch((e) => this.withError("တစ်ခုခုမှားယွင်းနေသည်။", 3));
    },
    withError(error, step) {
      this.step = step || 2;
      this.error = error;
    },
  },
  watch: {
    reason(value) {
      if (this.items[this.items.length - 1] === value) {
        this.useOtherReason = true;
        this.otherReason = "";
      } else {
        this.useOtherReason = false;
        this.otherReason = undefined;
      }
    },
  },
  beforeMount() {
    if (!this.$route.params["id"] && this.$route.query["id"]) {
      return this.$router.push(`/report/${this.$route.query["id"]}`);
    }
    this.id = this.$route.params["id"];
    if (this.id) this.step = 2;
  },
};
</script>
