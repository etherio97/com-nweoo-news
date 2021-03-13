<template>
  <v-dialog max-width="500" min-width="100%">
    <template v-slot:activator="{ on, attr }">
      <v-btn color="primary" v-bind="attr" v-on="on">
        <v-icon>mdi-plus</v-icon>
        Add
      </v-btn>
    </template>
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-form ref="addFallenStar">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Name (In English)"
                v-model="nameEnglish"
                outlined
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Name (In Burmese)"
                v-model="nameBurmese"
                outlined
              />
            </v-col>
            <v-col cols="8">
              <v-combobox
                label="Case of Death"
                :items="caseOfDeaths"
                v-model="caseOfDeath"
                outlined
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Age"
                type="number"
                v-model="caseOfDeath"
                outlined
              />
            </v-col>
            <v-col cols="6">
              <v-text-field label="Date of Incident" type="date" outlined />
            </v-col>
            <v-col cols="6">
              <v-text-field label="Date of Death" type="date" outlined />
            </v-col>
            <v-col cols="6">
              <v-select
                label="Region/State"
                :items="regionsAndStates"
                outlined
              />
            </v-col>
            <v-col cols="6">
              <v-select
                label="City/District"
                :items="citiesAndDistricts"
                outlined
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { fetchRegionsAndStates } from "@/functions/fetcher";

export default {
  name: "AddFallenStar",
  data: () => ({
    age: "",
    nameEnglish: "",
    nameBurmese: "",
    caseOfDeath: "",
    dateOfIncident: "",
    dateOfDeath: "",
    caseOfDeaths: [],
    regionsAndStates: [],
    citiesAndDistricts: [],
  }),
  beforeMount() {
    fetchRegionsAndStates().then((regionsAndStates) => {
      this.regionsAndStates = Object.values(regionsAndStates).map(
        ({ alt, abbr }) => `${alt} (${abbr})`
      );
    });
  },
};
</script>
