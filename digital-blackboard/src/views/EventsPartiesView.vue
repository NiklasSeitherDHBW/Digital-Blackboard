<template>
  <CustomAppBar
      titleRed="Events &amp;"
      titleGrey="Infos"
  ></CustomAppBar>

  <v-app>
    <v-container
        style="width: 90%;"
    >

      <v-tabs
          v-if="this.selectedCategory" v-model="this.selectedCategory"
          bg-color="transparent"
          color="#E0001BFF"
          grow
      >
        <v-tab
            v-for="category in eventCategories"
            :key="category"
            :value="category"
        >
          {{ category }}
        </v-tab>
      </v-tabs>

      <!-- Display Events -->
      <v-container
          :fluid=true
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
              <EventsPartiesCard
                  :item="item"
                  @itemChanged="refreshItems"
              ></EventsPartiesCard>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <div
        class="text-center"
    >
      <v-menu>
        <template
            v-slot:activator="{ props: activatorProps }"
        >
          <v-btn
              v-bind="activatorProps"
              style="border-radius: 5px; color: #E0001BFF; position: fixed; right: 0.5rem; box-shadow: 10px 10px 10px rgba(0,0,0,0.5); border: 1px solid #E0001BFF"
              :style="{ bottom: ismobil() ? '65px' : '15px' }"
              icon="mdi-plus"
              text="+"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
              @click="showDialogAddEvent=true"
          >
            <v-list-item-title>
              Event
            </v-list-item-title>
          </v-list-item>

          <v-list-item
              @click="showDialogAddInfo=true"
          >
            <v-list-item-title>
              Information
            </v-list-item-title>
          </v-list-item>

          <v-list-item
              @click="showDialogAddSeminar=true"
          >
            <v-list-item-title>
              Seminar
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-dialog
          transition="dialog-bottom-transition"
          v-model="showDialogAddEvent"
          :style="{ maxWidth: ismobil() ? '100%' : '60%' }"
      >
        <AddEventDialog
            @exit-dialog="exitDialogAddEvent"
            @close-dialog="closeDialogAddEvent"
        ></AddEventDialog>
      </v-dialog>

      <v-dialog
          transition="dialog-bottom-transition"
          v-model="showDialogAddInfo"
          :style="{ maxWidth: ismobil() ? '100%' : '60%' }"
      >
        <AddInfoDialog
            @exit-dialog="exitDialogAddInfo"
            @close-dialog="closeDialogAddInfo"
        ></AddInfoDialog>
      </v-dialog>

      <v-dialog
          transition="dialog-bottom-transition"
          v-model="showDialogAddSeminar"
          :style="{ maxWidth: ismobil() ? '100%' : '60%' }"
      >
        <AddSeminarDialog
            @exit-dialog="exitDialogAddSeminar"
            @close-dialog="closeDialogAddSeminar"
        ></AddSeminarDialog>
      </v-dialog>
    </div>

    <v-menu
        transition="slide-x-transition-reverse"
        location="start"
        :close-on-content-click="false"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            style="border-radius: 5px; color: #E0001BFF; position: fixed; right: 0.5rem; top: 7rem; box-shadow: 10px 10px 10px rgba(0,0,0,0.5); border: 1px solid #E0001BFF"
            v-bind="props"
            :style="{ bottom: ismobil() ? '75px' : '20px' }"
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
  </v-app>
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

<script>
// Importing functions
import CustomAppBar from "@/components/util/CustomAppBar.vue";
// Importing functions from the database module
import {createAdEvents, createAdInfo, createAdSeminar, fetchAdsEventsInfos} from "@/db";
import AddInfoDialog from "@/components/eventsParties/AddInfoDialog.vue";
import AddSeminarDialog from "@/components/eventsParties/AddSeminarDialog.vue";
import EventsPartiesCard from "@/components/eventsParties/EventsPartiesCard.vue";
import AddEventDialog from "@/components/eventsParties/AddEventDialog.vue";
import {useDisplay} from "vuetify";

/**
 * Vue component definition for the events and parties component.
 * @typedef {Object} EventsPartiesComponent
 * @property {function} data - Data function returning initial component state.
 * @property {Object} computed - Computed properties for the component.
 * @property {function} methods - Methods for the component.
 * @property {function} mounted - Lifecycle hook called after the component is mounted.
 */
export default {
  components: {AddEventDialog, EventsPartiesCard, AddSeminarDialog, AddInfoDialog, CustomAppBar},
  // Component's data properties
  data() {
    return {
      snackbarVisible: false,
      timeout: 3000,
      // Dialog visibility properties
      showDialogAddEvent: false,
      showDialogAddInfo: false,
      showDialogAddSeminar: false,
      // Event categories and selected category
      eventCategories: [
        "Events", "Infos", "Seminare"
      ],

      selectedCategory: "Events",

      advertisements: [],
// Search term
      search: "",
    }
  },
  /**
   * Vue.js methods for the component.
   * @type {Object}
   * @property {function} scrollToCard - Method to scroll to a specific card on component load.
   * @property {function} closeSnackbar - Method to close the snackbar.
   * @property {function} exitDialogAddEvent - Method to handle exiting the 'Add Event' dialog.
   * @property {function} closeDialogAddEvent - Method to handle submission and closing of the 'Add Event' dialog.
   * @property {function} exitDialogAddInfo - Method to handle exiting the 'Add Info' dialog.
   * @property {function} closeDialogAddInfo - Method to handle submission and closing of the 'Add Info' dialog.
   * @property {function} exitDialogAddSeminar - Method to handle exiting the 'Add Seminar' dialog.
   * @property {function} closeDialogAddSeminar - Method to handle submission and closing of the 'Add Seminar' dialog.
   * @property {function} refreshItems - Method to refresh displayed items by fetching from the database.
   */
  methods: {
    ismobil() {
      const display = useDisplay();
      return display.mobile.value;
    },
    // Method to scroll to a specific card on component load
    scrollToCard() {
      // Log the value of the 'card' parameter in the route query
      let query = this.$route.query
      // Check if there are no parameters in the query
      if (Object.keys(query).length === 0) {
        return
      }
      // Check if both 'card' and 'selectedCategory' parameters are present in the query
      if (query.card && query.selectedCategory) {
        const cardCategory = this.$route.query.selectedCategory
        const cardId = this.$route.query.card
        // Set the component's 'selectedCategory' to the value from the query
        this.selectedCategory = cardCategory

        // Wait for the DOM to finish loading all elements
        this.$nextTick(() => {
          // Get the DOM element with the specified 'cardId'
          const element = document.getElementById(cardId)
          // Check if the element exists
          if (element) {
            // Scroll to the selected card with a smooth behavior
            element.scrollIntoView({behavior: 'smooth'})

            // Apply a red border to highlight the selected card
            element.style.border = '5px solid red';

            // Timeout to revert the highlighting effect after 6 seconds
            setTimeout(() => {
              // Apply transition for a fade effect when reverting the border
              element.style.transition = 'border-width 0.5s ease, opacity 0.5s ease'; // Verzögerter Übergang in Originalzustand für Fade Effekt
              element.style.border = '5px solid red';
              element.style.borderWidth = '0';
            }, 6000);
          }
        });
      }
    },
// Method to close the snackbar
    closeSnackbar() {
      this.snackbarVisible = false;
    },
// Method to handle exiting the 'Add Event' dialog
    async exitDialogAddEvent() {
      this.showDialogAddEvent = false;
    },
// Method to handle submission and closing of the 'Add Event' dialog
    async closeDialogAddEvent(images, eventData) {
      this.showDialogAddEvent = false;
      this.snackbarVisible = true;
      // Call the createAdEvents function to add the event data to the database
      await createAdEvents(images, eventData);
// Refresh the displayed items by fetching from the database
      await this.refreshItems();
    },
// Method to handle exiting the 'Add Info' dialog
    async exitDialogAddInfo() {
      this.showDialogAddInfo = false;
    },
    // Method to handle submission and closing of the 'Add Info' dialog
    async closeDialogAddInfo(images, infoData) {
      this.showDialogAddInfo = false;
      this.snackbarVisible = true;

      await createAdInfo(images, infoData);

      await this.refreshItems();
    },

    // Method to handle exiting the 'Add Seminar' dialog
    async exitDialogAddSeminar() {
      this.showDialogAddSeminar = false;
    },

    // Method to handle submission and closing of the 'Add Seminar' dialog
    async closeDialogAddSeminar(images, seminarData) {
      this.showDialogAddSeminar = false;
      this.snackbarVisible = true;

      // Call the createAdSeminar function to add the seminar data to the database
      await createAdSeminar(images, seminarData);

      // Refresh the displayed items by fetching from the database
      await this.refreshItems();
    },

    // Method to refresh displayed items by fetching from the database
    async refreshItems() {
      this.advertisements = await fetchAdsEventsInfos();
    },
  },

  // Lifecycle hook called after the component is mounted
  async mounted() {
    // Refresh displayed items by fetching from the database
    await this.refreshItems()
    // Scroll to a specific card on component load
    this.scrollToCard()

    await this.refreshItems().then(() => {
      this.scrollToCard()
    })
  },
// Computed property for filtering advertisements based on category and search

  computed: {
    filteredAdvertisements() {
      return this.advertisements.filter(ad => {
        if (!ad.category || !this.selectedCategory) {
          return
        }
        if (ad.category !== this.selectedCategory) {
          return false;
        }

        let keys = Object.keys(ad);
        let showItem = false;

        for (let key of keys) {
          if (String(ad[key]).toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
            showItem = true;
          }
        }

        return showItem;
      });
    },
  },
};
</script>

<style>
.search-bar {
  width: 85%;
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
