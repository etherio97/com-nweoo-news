<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ attr, on }">
      <v-chip class="mx-2" v-on="on" v-bind="attr" small dark>
        <v-icon :color="color" small class="mr-2">mdi-server</v-icon>
        {{ status }}
      </v-chip>
    </template>
    <span> {{ parseInt(battery_level) }}% </span>
    <code>({{ new Date(last_synced).toLocaleString() }})</code>
  </v-tooltip>
</template>

<script>
let _t;

export default {
  name: "DeviceStatus",
  data: () => ({
    last_synced: null,
    is_charnging: null,
    battery_level: null,
  }),
  computed: {
    status() {
      if (this.last_synced === null) {
        return "connecting";
      }
      if (new Date() - new Date(this.last_synced) < 70000) {
        return "online";
      }
      return "offline";
    },
    color() {
      switch (this.status) {
        case "online":
          return "success";

        case "offline":
          return "error";

        default:
          return "gray";
      }
    },
  },
  methods: {
    fetchStatus() {
      _t && clearTimeout(_t);
      _t = setTimeout(() => this.fetchStatus(), 15000);

      return this.axios.get(`${this.$root.api}/status`).then(({ data }) => {
        this.battery_level = data.battery_level;
        this.is_charnging = data.is_charnging;
        this.last_synced = data.last_synced;
      });
    },
  },
  beforeMount() {
    this.fetchStatus();
  },
  beforeDestroy() {
    clearTimeout(_t);
  },
};
</script>
