<template>
  <v-container class="mt-4 mb-6">
    <v-form ref="login" @submit.prevent>
      <v-card>
        <v-card-title>
        Log in to account
        </v-card-title>
        <v-card-text>
          <v-text-field
            type="text"
            label="Username"
            autocapitalize="off"
            outlined
          />
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "LogIn",
  data: () => ({}),
}
</script>
