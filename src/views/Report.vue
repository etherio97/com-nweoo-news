<template>
  <v-container
    class="mx-auto mt-10 mb-15"
    style="max-width: 500px; min-width: 320px; width: 100%;"
  >
    <v-expand-transition>
      <v-alert type="error" v-show="disabled">
        စာစုအမှတ် #{{ id }} ကို ရှာမတွေ့ပါ။
      </v-alert>
    </v-expand-transition>

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
              <v-btn
                color="primary"
                @click="$router.push(`/report/${id}`) && (step = 2)"
              >
                တိုင်ကြားရန်
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-card-title>
              <v-chip color="secondary" class="mr-2">
                စာစုအမှတ် #{{ id }}
              </v-chip>
              ကို ဘာလုပ်နိုင်ပါသလဲ။
            </v-card-title>
            <v-card-text class="mt-5 pb-4">
              <v-row justify="space-between">
                <v-col cols="12" sm="6">
                  <v-btn
                    block
                    color="primary"
                    dark
                    large
                    @click="(error = null) | (step = 3)"
                  >
                    ပယ်ဖျက်ရန်တောင်းဆိုခြင်း
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-btn
                    block
                    dark
                    color="red darken-2"
                    large
                    :disabled="disabled"
                    @click="(error = null) | (step = 4)"
                  >
                    ချက်ချင်းပယ်ဖျက်ခြင်း
                  </v-btn>
                </v-col>
                <v-col cols="12" v-if="post_id">
                  <iframe
                    :src="`https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fweb.facebook.com%2Fnweoo22222%2Fposts%2F${post_id}&width=386&show_text=true&appId=2927529797469638&height=482`"
                    width="100%"
                    height="500"
                    style="border: none; overflow: hidden;"
                    scrolling="no"
                    frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
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
              <v-chip color="secondary" class="mr-2">
                စာစုအမှတ် #{{ id }}
              </v-chip>
              ကို ပယ်ဖျက်ရန်တောင်းဆိုခြင်း
            </v-card-title>
            <v-card-text>
              <v-alert type="warning">
                အခုလောလောဆယ် ပယ်ဖျက်ရန်တောင်းဆိုလိုပါက chatbox ကတဆင့်သာသ
                ဆက်သွယ်တောင်းဆိုပေးပါ။
              </v-alert>
              <v-select
                label="အကြောင်းအရာ"
                outlined
                v-model="reason"
                :items="reasons"
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
              <v-chip color="secondary" class="mr-2">
                စာစုအမှတ် #{{ id }}
              </v-chip>
              ကို ချက်ချင်းဖျက်ရန်
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

    <v-overlay :value="!loaded">
      <v-progress-circular indeterminate size="120" />
    </v-overlay>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ReportSMS",
  components: {},
  data: () => ({
    loaded: false,
    loading: false,
    disabled: false,
    error: null,
    step: 1,
    id: "",
    phone: "",
    reason: "",
    status: "",
    useOtherReason: false,
    otherReason: "",
    post_id: null,
  }),
  computed: mapState("reports", ["reasons"]),
  methods: {
    instantDelete() {
      this.step = 5;
      this.error = null;
      this.status = "လုပ်ဆောင်နေပါတယ်";

      const url =
        `${this.$root.api}/report/${this.id}?phone=${this.phone}` +
        `&times=${this.$root.times++}&ga=${this.$root.ga}`;

      return this.axios
        .delete(url)
        .then(() => (this.step = 6))
        .catch((e) => {
          let error = e.message;
          if (
            e.response &&
            e.response["data"] &&
            e.response["data"]["message"]
          ) {
            error = e.response["data"]["message"]["error"];
          }
          this.withError(error, 4);
        });
    },
    submitReport() {
      this.step = 2;
      return;
      this.step = 5;
      this.error = null;
      this.status = "လုပ်ဆောင်နေပါတယ်";
      const report = {
        reason: this.reason,
        otherReson: this.otherReason,
      };
      this.axios
        .put(`${this.$root.api}/report/${this.id}`, report)
        .then(({ data }) => {
          this.step = 6;
        })
        .catch((e) => this.withError("လုပ်ဆောင်မှုမအောင်မြင်ပါ", 3));
    },
    withError(error, step) {
      this.step = step || 2;
      this.error = error;
    },
  },
  watch: {
    reason(value) {
      if (this.reasons[this.reasons.length - 1] === value) {
        this.useOtherReason = true;
        this.otherReason = "";
      } else {
        this.useOtherReason = false;
        this.otherReason = undefined;
      }
    },
  },
  beforeMount() {
    if (!this.$route.params["id"]) {
      if (this.$route.query["id"]) {
        return this.$router.push(`/report/${this.$route.query["id"]}`);
      }
      this.loaded = true;
      return;
    }
    this.id = this.$route.params["id"];
    switch (this.$route.query["action"]) {
      case "request":
        this.step = 3;
        break;
      case "delete":
        this.step = 4;
        break;
      default:
        this.step = this.id && 2;
    }
    if (this.id) {
      this.axios(`${this.$root.api}/report/${this.id}`)
        .then(({ data: { status, data } }) => {
          this.loaded = true;
          if (status !== 200) {
            this.disabled = true;
            return;
          }
          this.post_id = data.post_id.split("_").pop();
          if (data.deleted) {
            this.step = 6;
          }
        })
        .catch(() => (this.disabled = true))
        .finally(() => (this.loaded = true));
    }
  },
};
</script>
