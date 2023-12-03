<template>
  <v-card>
    <v-row
        class="d-flex align-center ma-3"
    >
      <v-card-title>
        Kontaktdaten
      </v-card-title>

      <v-btn
          class="button-round ml-auto mr-1"
          icon="mdi-close"
          @click="$emit('close-dialog')"
      ></v-btn>
    </v-row>

    <v-divider></v-divider>

    <v-row no-gutters>
      <v-col>
        <v-avatar size="100">
          <v-img :src="avatarSrc" alt="Avatar" cover></v-img>
        </v-avatar>
      </v-col>

      <v-card-text
          class="mb-4"
      >
        <v-row
            align="center"
            v-if="phone !== undefined && phone !== ''"
        >
          <v-col
              class="d-flex"
          >
            <v-icon
                small
                class="mr-3 ml-4"
            >
              mdi-phone
            </v-icon>

            <p>
              {{ phone }}
            </p>
          </v-col>
        </v-row>

        <v-row
            v-if="email !== undefined && email !== ''"
            align="center"
        >
          <v-col
              class="d-flex"
          >
            <v-icon
                small
                class="mr-3 ml-4"
            >
              mdi-email
            </v-icon>

            <p>
              {{ email }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
