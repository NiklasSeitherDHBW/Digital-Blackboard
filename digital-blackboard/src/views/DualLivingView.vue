<template>
  <AppBar
      titleRed="Dual"
      titleGrey="Living"
  ></AppBar>

  <v-container
      :fluid="true"
      style="width: 90%;"
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
        <div
            :id="item.id"
            class="rounded"
            style="height: 100%;">
          <DualLivingCard
              :item="item"
          ></DualLivingCard>
        </div>
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
      :style="{ bottom: mobile ? '65px' : '15px' }"
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
          color="#eb1b2a"
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
// Importing functions needed for creating and fetching dual living ads from the database.
import AppBar from "@/components/util/CustomAppBar.vue";
import AddApartment from "@/components/dualLiving/AddAppartmentDialog.vue";
import DualLivingCard from "@/components/dualLiving/DualLivingCard.vue";

import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
import {createAdDualLiving, fetchAdsDualLiving} from '@/db'

/**
 * Vue component definition for the dual living ads component.
 * @typedef {Object} DualLivingAdsComponent
 * @property {function} data - Data function returning initial component state.
 * @property {Object} computed - Computed properties for the component.
 * @property {function} methods - Methods for the component.
 * @property {function} mounted - Lifecycle hook called after the component is mounted.
 */
export default {
  data: () => ({
    // Data properties for the component.
    snackbarVisible: false,
    timeout: 3000,

    showDialogAddApartment: false,
    showDialogImages: false,
    showDialogsContact: false,
    direction: 'left',

    selectedItem: null,
    advertisements: [],

    search: "", // Search term for filtering advertisements.
    /**
     * Vue.js computed properties for the component.
     * @type {Object}
     * @property {Array} filteredAdvertisements - Computed property to filter advertisements based on the search term.
     */
  }),
  /**
   * Vue.js methods for the component.
   * @type {Object}
   * @property {function} scrollToCard - Method to scroll to a specific card on component load.
   * @property {function} closeSnackbar - Method to close the snackbar.
   * @property {function} openDialogImagesFullscreen - Method to open the dialog for displaying images in fullscreen.
   * @property {function} exitDialogAddAppartment - Method to exit the add apartment dialog.
   * @property {function} closeDialogAddAppartment - Method to close the add apartment dialog and trigger ad creation.
   * @property {function} fetchAds - Method to fetch dual living ads.
   */
  methods: {
    // Method to scroll to a specific card on component load.
    scrollToCard() {
      const cardId = this.$route.query.card
      if (cardId) {
        const element = document.getElementById(cardId)
        if (element) {
          element.scrollIntoView({behavior: 'smooth'})
          // Select the style for highlighting
          element.style.border = '5px solid red';
          // Timeout to reverse the highlighting.
          setTimeout(() => {
            element.style.transition = 'border-width 0.5s ease, opacity 0.5s ease'; // Verzögerter Übergang in Originalzustand für Fade Effekt
            element.style.border = '5px solid red';
            element.style.borderWidth = '0';
          }, 6000);
        }
      }
    },
    // Method to close the snackbar.
    closeSnackbar() {
      this.snackbarVisible = false;
    },
// Method to open the dialog for displaying images in fullscreen.
    openDialogImagesFullscreen(item) {
      this.selectedItem = item;
      this.showDialogImages = true;
    },
// Method to exit the add apartment dialog.
    async exitDialogAddAppartment() {
      this.showDialogAddApartment = false;
    },
// Method to close the add apartment dialog and trigger ad creation
    async closeDialogAddAppartment(formData, images, contactData) {
      this.showDialogAddApartment = false;
      this.snackbarVisible = true;
// Method to fetch dual living ads.
      await createAdDualLiving(formData, images, contactData)

      await this.fetchAds();
    },

    async fetchAds() {
      this.advertisements = await fetchAdsDualLiving();
    },
  },
  // Lifecycle hook to execute logic after the component is mounted
  async mounted() {
    await this.fetchAds();
    this.scrollToCard();
  },

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