<template>
  <v-container>
    <v-card class="mx-auto" max-width="60%">
      <v-card-text class="mt-3">
        <v-expand-transition>
          <v-alert type="error" v-show="error" class="font-weight-bold">
            {{ error }}
          </v-alert>
        </v-expand-transition>
        <v-form @submit.prevent="submitReport">
          <v-text-field
            label="ID#"
            outlined
            v-model="id"
            readonly="readonly"
          ></v-text-field>
          <v-select
            label="Reason"
            :items="reasons"
            v-model="reason"
            outlined
          ></v-select>
          <v-textarea
            label="Please specify (optional)"
            v-show="isOtherReason"
            v-model="otherReason"
            outlined
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <instant-delete :id="id"></instant-delete>
        <v-btn
          type="submit"
          color="primary"
          class="pl-3 pr-4"
          :loading="loading"
        >
          <v-icon class="mr-2">mdi-send</v-icon>
          တိုင်ကြားရန်
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import InstantDelete from "../../components/InstantDelete.vue";

export default {
  name: "ReportSMS",
  components: {
    InstantDelete,
  },
  data() {
    return {
      reasons: [
        "သတင်းအချက်အလက်မှားယွင်းနေသည်",
        "မသက်ဆိုင်သောအကြောင်းအရာဖြစ်သည်",
        "ရိုင်းစိုင်းသောစကားလုံးပါဝင်သည်",
        "ပုပ်ခတ်ပြောဆိုထားသည်",
        "အခြား",
      ],
      error: null,
      readonly: "id" in this.$route.query,
      id: this.$route.query["id"] || "",
      reason: "",
      isOtherReason: false,
      otherReason: "",
      loading: false,
    };
  },
  watch: {
    reason(value) {
      this.isOtherReason = value === this.reasons[this.reasons.length - 1];
    },
  },
  methods: {
    submitReport() {},
    instantDelete() {},
  },
  beforeMount() {},
};
</script>

<style>
</style>
