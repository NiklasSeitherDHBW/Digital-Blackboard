<template>
  <AppBar
      titleRed="Dual"
      titleGrey="Living"
  ></AppBar>

  <v-container
      :fluid="true"
      style="width: 85%;"
      align="center"
  >
    <v-row>
      <v-col
          v-for="(item, index) in filteredAdvertisements"
          :key="index"
          cols="12"
          sm="12"
          md="6"
          lg="6"
          xl="4"
          xxl="3"
      >
        <DualLivingCard
            :item="item"
        ></DualLivingCard>
      </v-col>
    </v-row>
  </v-container>

  <v-menu
      transition="slide-x-transition-reverse"
      location="start"
      :close-on-content-click="false"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          style="border-radius: 5px; color: #E0001BFF; position: fixed; right: 0.5rem; top: 7rem; box-shadow: 10px 10px 10px rgba(0,0,0,0.5); border: 1px solid #E0001BFF"
          v-bind="props"
          :style="{ bottom: mobile ? '75px' : '20px' }"
          text="Suche"
          icon="mdi-magnify"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <v-card min-width="300">
      <v-text-field
          v-model="search"
          hide-details
          prepend-inner-icon="mdi-magnify"
          class="search-bar my-5 mx-auto"
          placeholder="Suche..."
      ></v-text-field>
    </v-card>
  </v-menu>

  <v-btn
      style="border-radius: 5px; color:#E0001BFF; position: fixed; right:0.5rem; box-shadow: 10px 10px 10px rgba(0,0,0,0.5); border: 1px solid #E0001BFF"
      :style="{ bottom: mobile ? '75px' : '20px' }"
      icon="mdi-plus"
      text="+"
  >
    <v-icon>
      mdi-plus
    </v-icon>

    <v-dialog
        transition="dialog-bottom-transition"
        v-model="showDialogAddApartment"
        activator="parent"
        :style="{ maxWidth: mobile ? '100%' : '60%' }"
    >
      <AddApartment
          @close-dialog="closeDialogAddAppartment"
          @exit-dialog="exitDialogAddAppartment"
      ></AddApartment>
    </v-dialog>
  </v-btn>
  <v-snackbar v-model="snackbarVisible" :timeout="timeout">
    Ihr Inserat wurde erfolgreich geteilt!
    <template v-slot:actions>
      <v-btn
          color="red"
          variant="text"
          float-right
          size="small"
          class="mr-1"
          @click="closeSnackbar"
      >
        Schließen
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import AppBar from "@/components/util/CustomAppBar.vue";
import AddApartment from "@/components/dualLiving/AddAppartmentDialog.vue";
import DualLivingCard from "@/components/dualLiving/DualLivingCard.vue";

import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
import {createAdDualLiving, fetchAdsDualLiving} from '@/db'

export default {
  data: () => ({
    snackbarVisible: false,
    timeout: 5000,

    showDialogAddApartment: false,
    showDialogImages: false,
    showDialogsContact: false,
    direction: 'left',

    selectedItem: null,
    advertisements: [],

    search: "",
  }),
  computed: {
    filteredAdvertisements() {
      return this.advertisements.filter(p => {
        let keys = Object.keys(p);
        let showItem = false;

        for (let key of keys) {
          if (String(p[key]).toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
            showItem = true;
          }
        }

        return showItem;
      });
    }
  },
  methods: {
    closeSnackbar() {
      this.snackbarVisible = false;
    },
    openDialogImagesFullscreen(item) {
      this.selectedItem = item;
      this.showDialogImages = true;
    },
    async exitDialogAddAppartment() {
      this.showDialogAddApartment = false;
    },

    async closeDialogAddAppartment(formData, images, contactData) {
      this.showDialogAddApartment = false;
      this.snackbarVisible = true;

      await createAdDualLiving(formData, images, contactData)

      await this.fetchAds();
    },
    async fetchAds() {
      this.advertisements = await fetchAdsDualLiving();
    },
  },
  async mounted() {
    await this.fetchAds();
  }
};
</script>

<style scoped>
.search-bar {
  width: 85%;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.search-bar input {
  padding: 10px;
}

.search-bar:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>