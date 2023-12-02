<template>
  <v-card>
    <v-row class="d-flex align-center ma-3">
      <v-card-title>
        Kontaktdaten
      </v-card-title>

      <v-btn
          class="button-round ml-auto mr-1"
          icon="mdi-close"
          @click="this.$emit('close-dialog')"
      ></v-btn>
    </v-row>

    <v-divider></v-divider>

    <v-row no-gutters>
      <v-col>
        <v-avatar size="100">
          <v-img :src="avatarSrc" alt="Avatar" cover></v-img>
        </v-avatar>
      </v-col>

      <v-col>
        <v-card-title class="text-h5 font-weight-medium mb-1">{{ name }}</v-card-title>
        <v-card-subtitle class="mb-2">{{ course }}</v-card-subtitle>
      </v-col>
    </v-row>

    <v-card-text class="mb-4">
      <v-row align="center" v-if="phone !== undefined && phone !== ''">
        <v-col class="d-flex">
          <v-icon small class="mr-2">mdi-phone</v-icon>
          <p>{{ phone }}</p>
        </v-col>
      </v-row>

      <v-row align="center" v-if="email !== undefined && email !== ''">
        <v-col class="d-flex">
          <v-icon small class="mr-2">mdi-email</v-icon>
          <p>{{ email }}</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    course: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    avatarSrc: {
      type: String,
      default: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740", // Default avatar URL
    },
  },
};
</script>

<style scoped>
</style>
