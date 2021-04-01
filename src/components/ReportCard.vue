<template>
  <v-card :key="report.id" class="reportCard" :to="`/report/${report.id}`">
    <v-card-subtitle v-if="report.timestamp" class="pt-2 pb-1">
      {{ new Date(report.timestamp).toLocaleString() }}
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-title>
      {{ report.message }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "ReportCard",
  props: ["report"],
  data: () => ({
    isActive: false,
  }),
};
</script>

<style lang="scss">
@import "@/assets/scss/components/reportCard.scss";
</style>
