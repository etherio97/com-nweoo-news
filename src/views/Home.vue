<template>
  <v-container class="mb-12">
    <v-row class="mt-2">
      <v-col cols="12">
        <h6 class="text-h6">
          ‌ေဖ‌ေဖာ်ဝါရီ (၁)ရက် မှ {{ formatDate(updatedAt) }} ထိ
        </h6>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-4"
          title="သေဆုံးသူ""
          :total="today.death"
          :count="death"
          :to="{ name: 'Deaths' }"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-3"
          title="ဖမ်းစီးခံရသူ"
          :total="arrestedToday"
          :count="detention + released"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-2"
          title="ထိန်းသိမ်းထားသူ"
          :total="today.detention"
          :count="detention"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-1"
          title="လွတ်မြောက်လာသူ"
          :total="today.released"
          :count="released"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red"
          title="ရှောင်တိမ်းနေရသူ"
          :total="today.warrant"
          :count="warrant"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red lighten-1"
          title="ပြစ်ဒဏ်ချမှတ်ခံရသူ "
          :total="today.sentenced"
          :count="sentenced"
          :loading="loading"
        />
      </v-col>

      <v-col cols="12">
        <p class="text-center mm-font">
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { backDate, formatDate } from "@/functions/burmeseDate";
import StatisticCard from "../components/StatisticCard.vue";
import { getStatisticURL } from "../functions/database";

const components = {
  StatisticCard,
};

export default {
  name: "Home",
  components,
  data: () => ({
    loading: true,
    col: [6, 4, 3, 3, 3],
    today: {},
    yesterday: {},
    updatedAt: null,
  }),
  methods: {
    fetchTodayStatistic() {
      return this.axios(getStatisticURL()).then((res) => res.data);
    },
    fetchYesterdayStatistic() {
      return this.axios(getStatisticURL(1)).then((res) => res.data);
    },
    fetchDayBeforeYesterday() {
      return this.axios(getStatisticURL(2)).then((res) => res.data);
    },
    formatDate,
  },
  async beforeMount() {
    this.updatedAt = backDate(0);
    this.today = await this.fetchTodayStatistic();
    if (!this.today) {
      this.updatedAt = backDate(1);
      this.today = (await this.fetchYesterdayStatistic()) || {};
      this.yesterday = (await this.fetchDayBeforeYesterday()) || {};
    } else {
      this.yesterday = (await this.fetchYesterdayStatistic()) || {};
    }
    this.loading = false;
  },
  computed: {
    death() {
      return (
        parseInt(this.today.death || 0) - parseInt(this.yesterday.death || 0)
      );
    },
    arrestedToday() {
      return (
        parseInt(this.today.detention || 0) +
        parseInt(this.today.released || 0)
      );
    },
    arrestedYesterday() {
      return (
        parseInt(this.yesterday.detention || 0) +
        parseInt(this.yesterday.released || 0)
      );
    },
    detention() {
      return (
        parseInt(this.today.detention || 0) -
        parseInt(this.yesterday.detention || 0)
      );
    },
    released() {
      return (
        parseInt(this.today.released || 0) -
        parseInt(this.yesterday.released || 0)
      );
    },
    sentenced() {
      return (
        parseInt(this.today.sentenced || 0) -
        parseInt(this.yesterday.sentenced || 0)
      );
    },
    warrant() {
      return (
        parseInt(this.today.warrant || 0) -
        parseInt(this.yesterday.warrant || 0)
      );
    },
  },
};
</script>
