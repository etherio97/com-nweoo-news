<template>
  <v-dialog max-width="500px">
    <template v-slot:activator="{ on, attr }">
      <v-btn v-on="on" v-bind="attr" color="error" class="pl-3 pr-4 ma-2">
        <v-icon class="mr-2">mdi-trash-can</v-icon>
        ချက်ချင်းဖျက်ရန်
      </v-btn>
    </template>
    <v-form @submit.prevent="instantDelete">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <p>ချက်ချင်းဖျက်ရန်အတွက် ပေးပို့ခဲ့သောဖုန်းနံပါတ်အားထည့်သွင်းပါ။</p>
          <v-text-field
            placeholder="09 XXXX XXXX"
            type="tel"
            outlined
            autofocus
            v-model="phone"
            :disabled="loading"
          ></v-text-field>
          <v-expand-transition>
            <v-alert type="error" v-show="error" class="font-weight-bold">
              {{ error }}
            </v-alert>
          </v-expand-transition>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" type="submit" :loading="loading" text>
            ဖျက်ရန်
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: "InstantDelete",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      error: null,
      loading: false,
      phone: "",
    };
  },
  methods: {
    instantDelete() {
      this.loading = true;
      this.axios
        .put(`${this.$root.api}/report/${this.id}`, {
          phone: this.phone,
        })
        .then(({ data }) => {
          if (data === null) {
            throw new Error(`ID#${this.id} does not exist.`);
          }
          if (this.phone !== data.phone) {
            throw new Error("Incorrect Phone Number");
          }
          this.$router.push("/?deleted=1");
        })
        .catch((err) => {
          this.error = err.message;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
