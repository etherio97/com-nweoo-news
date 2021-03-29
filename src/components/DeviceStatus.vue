<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ attr, on }">
      <v-chip class="mx-2" v-on="on" v-bind="attr" small dark>
        <v-icon :color="color" small class="mr-2">mdi-server</v-icon>
        {{ status }}
      </v-chip>
    </template>
    <span> {{ parseInt(battery_level) }}% </span>
    <code>
      ( {{ is_charging ? "Charging" : "Not Charging" }}, Last Synced
      {{ new Date(last_synced).toLocaleString() }})
    </code>
  </v-tooltip>
</template>

<script>
let _t;

export default {
  name: "DeviceStatus",
  data: () => ({
    is_online: null,
    last_synced: null,
    is_charging: null,
    battery_level: null,
  }),
  computed: {
    status() {
      if (this.last_synced === null) return "connecting";
      return this.is_online ? "online" : "offline";
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
        this.is_online = data.is_online;
        this.last_synced = data.last_synced;
        this.is_charging = data.is_charging;
        this.battery_level = data.battery_level;
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
