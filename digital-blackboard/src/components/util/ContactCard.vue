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

    <v-card
        :title="name"
        :subtitle="course"
        variant="flat"
    >
      <template v-slot:prepend>
        <v-avatar
            size="120"
        >
          <v-img
              :src="avatarSrc"
              alt="Avatar"
              cover
          ></v-img>
        </v-avatar>
      </template>

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
    name: String,
    course: String,
    phone: String,
    email: String,
    avatarSrc: {
      type: String,
      default:
          "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740", // Default avatar URL
    },
  },
};
</script>

<style scoped>
.button-round {
  color: #E0001BFF;
  border: 1px solid #E0001BFF
}
</style>
