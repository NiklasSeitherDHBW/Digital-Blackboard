<template>
  <CustomAppBar
      titleRed="Events &amp;"
      titleGrey="Infos"
  ></CustomAppBar>

  <v-app>
    <v-container
        style="width: 85%;"
    >

      <v-tabs
          v-model="this.selectedCategory"
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
            <EventsPartiesCard
                :item="item"
                @itemChanged="refreshItems"
            ></EventsPartiesCard>
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
              :style="{ bottom: mobile ? '75px' : '20px' }"
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
          :style="{ maxWidth: mobile ? '100%' : '60%' }"
      >
        <AddEventDialog
            @exit-dialog="exitDialogAddEvent"
            @close-dialog="closeDialogAddEvent"
        ></AddEventDialog>
      </v-dialog>

      <v-dialog
          transition="dialog-bottom-transition"
          v-model="showDialogAddInfo"
          :style="{ maxWidth: mobile ? '100%' : '60%' }"
      >
        <AddInfoDialog
            @exit-dialog="exitDialogAddInfo"
            @close-dialog="closeDialogAddInfo"
        ></AddInfoDialog>
      </v-dialog>

      <v-dialog
          transition="dialog-bottom-transition"
          v-model="showDialogAddSeminar"
          :style="{ maxWidth: mobile ? '100%' : '60%' }"
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
  </v-app>
</template>

<script setup>
import CustomAppBar from "@/components/util/CustomAppBar.vue";
import EventsPartiesCard from "@/components/eventsParties/EventsPartiesCard.vue";
import AddEventDialog from "@/components/eventsParties/AddEventDialog.vue";
import AddInfoDialog from "@/components/eventsParties/AddInfoDialog.vue";
import AddSeminarDialog from "@/components/eventsParties/AddSeminarDialog.vue";

import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
import {createAdEvents, createAdInfo, createAdSeminar, fetchAdsEventsInfos} from "@/db";

export default {
  data() {
    return {
      snackbarVisible: false,
      timeout: 5000,

      showDialogAddEvent: false,
      showDialogAddInfo: false,
      showDialogAddSeminar: false,

      eventCategories: [
        "Events", "Infos", "Seminare"
      ],
      selectedCategory: null,

      advertisements: [],

      search: "",
    }
  },
  computed: {
    filteredAdvertisements() {
      return this.advertisements.filter(ad => {
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
  methods: {
    scrollToCard() {
      const cardCategory = this.$route.query.selectedCategory
      const cardId = this.$route.query.card
      if (cardId && cardCategory) {
        this.selectedCategory = cardCategory
        // Warten bis die DOM alle Elemente fertig geladen hat
        this.$nextTick(() => {
          const element = document.getElementById(cardId)
          if (element) {
            element.scrollIntoView({behavior: 'smooth'})
            // den Style zum hervorheben auswählen
            element.style.border = '5px solid red';
            // Timeout um das HErvorheben umzukehren
            setTimeout(() => {
              element.style.transition = 'border-width 0.5s ease, opacity 0.5s ease'; // Verzögerter Übergang in Originalzustand für Fade Effekt
              element.style.border = '5px solid red';
              element.style.borderWidth = '0';
            }, 6000);
          }
        });
      }
    },
    closeSnackbar() {
      this.snackbarVisible = false;
    },

    async exitDialogAddEvent() {
      this.showDialogAddEvent = false;
    },
    async closeDialogAddEvent(images, eventData) {
      this.showDialogAddEvent = false;
      this.snackbarVisible = true;

      await createAdEvents(images, eventData);

      this.refreshItems();
    },

    async exitDialogAddInfo() {
      this.showDialogAddInfo = false;
    },
    async closeDialogAddInfo(images, infoData) {
      this.showDialogAddInfo = false;
      this.snackbarVisible = true;

      await createAdInfo(images, infoData);

      await this.refreshItems();
    },

    async exitDialogAddSeminar() {
      this.showDialogAddSeminar = false;
    },
    async closeDialogAddSeminar(images, seminarData) {
      this.showDialogAddSeminar = false;
      this.snackbarVisible = true;

      await createAdSeminar(images, seminarData);

      await this.refreshItems();
    },

    async refreshItems() {
      this.advertisements = await fetchAdsEventsInfos();
    },
  },
  mounted() {
    this.refreshItems()
  }
}
</script>

<style scoped>
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
