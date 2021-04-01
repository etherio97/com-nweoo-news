<template>
  <v-card :key="report.id" class="reportCard">
    <v-card-subtitle v-if="report.timestamp" class="pt-2 pb-1">
      {{ new Date(report.timestamp).toLocaleString() }}
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-title v-html="message" />
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :to="`/report/${report.id}`" color="error" text>
        <v-icon class="mr-1">mdi-flag</v-icon> တိုင်ကြား/ပယ်ဖျက်
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ReportCard",
  props: ["report"],
  data: () => ({
    isActive: false,
  }),
  computed: {
    message() {
      let message = this.report.message;
      let urls = message.match(/((?:https?:\/\/|www\.)[\w\d\.\-\?\%\/\&]+)/gim);
      if (urls) {
        console.log(urls);
        message = message.replace(
          new RegExp(`${urls[0]}`, "gim"),
          `<a href="${urls[0]}" class="text-decoration-underline" target="_blank">${urls[0]}</a>`
        );
      }
      return message;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/reportCard.scss";
</style>
