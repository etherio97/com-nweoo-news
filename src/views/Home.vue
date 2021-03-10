<template>
  <v-container>
    <v-row class="mt-3">
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-4"
          title="သေဆုံးသူ"
          :total="today.death"
          :count="death"
          :to="{ name: 'Deaths' }"
          :loading="loading"
        />
      </v-col>
      <!-- <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="yellow darken-4"
          title="ဒဏ်ရာရရှိသူ"
          total="0"
          count="0"
          :loading="loading"
        />
      </v-col> -->
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
          title="လက်ရှိဖမ်းခံထားသူ"
          :total="today.detention"
          :count="detention"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-1"
          title="ပြန်လွတ်မြောက်သူ"
          :total="today.released"
          :count="released"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red"
          title="တိမ်းရှောင်နေရသူ"
          :total="today.warrant"
          :count="warrant"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red lighten-1"
          title="ပြစ်ဒဏ်ချမှတ်ခံရသူ"
          :total="today.sentenced"
          :count="sentenced"
          :loading="loading"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
  },
  async beforeMount() {
    this.today = await this.fetchTodayStatistic();
    if (!this.today) {
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
        parseInt(this.today.sentenced || 0) +
        parseInt(this.today.released || 0)
      );
    },
    arrestedYesterday() {
      return (
        parseInt(this.yesterday.detention || 0) +
        parseInt(this.yesterday.sentenced || 0) +
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
