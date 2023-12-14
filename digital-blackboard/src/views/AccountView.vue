<template>

  <AppBar
      titleRed="Dein"
      titleGrey="Account"
  ></AppBar>

  <v-container
      style="width: 90%;"
  >
    <div class="d-flex">

      <v-divider></v-divider>

      <v-card-title>Deine Kontaktinformationen</v-card-title>

      <v-divider></v-divider>

    </div>

    <p>Name: Rebekka Weitkamp</p>

    <p>Username: User1</p>

    <p>Weiter Infos...</p>

    <div class="d-flex mt-5">

      <v-divider></v-divider>

      <v-card-title>Deine Inserate</v-card-title>

      <v-divider></v-divider>

    </div>

    <v-tabs
        v-model="this.selectedAdType"
        bg-color="transparent"
        color="#E0001BFF"
        grow
    >
      <v-tab
          v-for="content in ['dualLiving', 'events', 'studyHub']"
          :key="content"
          :value="content"
      >
        <v-icon v-if="mobile">{{ icons[content] }}</v-icon>

        <p v-else>{{ content }}</p>

      </v-tab>

    </v-tabs>

    <v-container
        :fluid=true
    >
      <v-row>

        <v-col
            v-for="(item, index) in filteredAdvertisements"
            :key="index"
            sm="12"
            md="6"
            lg="6"
            xl="4"
            xxl="3"
        >
          <div
              :id="item.id"
              class="rounded"
              style="height: 100%;"
          >
            <DualLivingCard
                v-if="item.adType === 'dualLiving'"
                :item="item"
                @itemsChanged="this.fetchAds"
            ></DualLivingCard>

            <EventsPartiesCard
                v-if="item.adType === 'events'"
                :item="item"
                @itemsChanged="this.fetchAds"
            ></EventsPartiesCard>

            <StudyHubBuddyCard
                v-if="item.adType === 'studyHub' && item.category === 'buddy'"
                :item="item"
                @itemsChanged="this.fetchAds"
            ></StudyHubBuddyCard>

            <StudyHubGroupCard
                v-if="item.adType === 'studyHub' && item.category === 'group'"
                :item="item"
                @itemsChanged="this.fetchAds"
            ></StudyHubGroupCard>

          </div>

        </v-col>

      </v-row>

    </v-container>

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
      ></v-btn>

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

</template>


<script setup>
// Importing necessary components for the template setup.
import AppBar from "@/components/util/CustomAppBar.vue";
import EventsPartiesCard from "@/components/eventsParties/EventsPartiesCard.vue";
import DualLivingCard from "@/components/dualLiving/DualLivingCard.vue";
import StudyHubBuddyCard from "@/components/studyHub/StudyHubBuddyCard.vue";
import StudyHubGroupCard from "@/components/studyHub/StudyHubGroupCard.vue";

import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
// Importing functions to fetch advertisements from the database
import {fetchAdsDualLiving, fetchAdsEventsInfos, fetchAdsStudyHub} from '@/db'

export default {
  // Data properties for the component
  data: () => ({
    selectedAdType: null,
    advertisements: [],
    search: "",
    icons: {
      'dualLiving': 'mdi-domain',
      'events': 'mdi-calendar-clock',
      'studyHub': 'mdi-school',
    },
  }),
  /**
   * Vue.js component template for the user account page.
   * @typedef {Object} UserAccountComponent
   * @property {string} titleRed - The red-colored part of the app bar title.
   * @property {string} titleGrey - The grey-colored part of the app bar title.
   * @property {Array} filteredAdvertisements - The array of filtered advertisements based on user, type, and search term.
   * @property {string} selectedAdType - The currently selected advertisement type.
   * @property {Array} advertisements - The array of all advertisements.
   * @property {string} search - The search term for filtering advertisements.
   * @property {Object} icons - An object containing icon names for different advertisement types.
   * @property {boolean} mobile - A boolean indicating whether the display is in mobile mode.
   */
// Methods for the component
  methods: {
    scrollToCard() {
      const cardId = this.$route.query.card
      console.log(cardId)
      if (cardId) {
        const element = document.getElementById(cardId)
        console.log(element)
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
      }
    },
    // Method to fetch advertisements from the database
    async fetchAds() {
      console.log("fetchAds aufgerufen")
      let adsDualLiving = await fetchAdsDualLiving();
      let adsEventsInfos = await fetchAdsEventsInfos();
      let adsStudyHub = await fetchAdsStudyHub();

      // Concatenate advertisements from different types into a single array
      this.advertisements = adsDualLiving.concat(adsEventsInfos).concat(adsStudyHub)
    }
  },
  // Lifecycle hook: called after the component is mounted
  async mounted() {
    // Fetch advertisements and scroll to a specific card based on the route
    await this.fetchAds();
    this.scrollToCard()
  },
// Computed property for filtering advertisements based on user, type, and search term
  computed: {
    filteredAdvertisements() {
      let filteredAds = this.advertisements.filter(ad => {
        // Filter out advertisements not belonging to a specific user
        if (ad.userId !== 1) {
          return false
        }

        // Filter out advertisements based on the selected ad type
        if (ad.adType !== this.selectedAdType) {
          return false;
        }

        // Filter out advertisements based on the search term
        let keys = Object.keys(ad);
        let showItem = false;


        for (let key of keys) {
          if (String(ad[key]).toLowerCase().indexOf(this.search.toLowerCase()) !== -1) {
            showItem = true;
          }
        }

        return showItem;
      });

      // Add an "editable" property to each filtered advertisement
      filteredAds.forEach((ad) => {
        ad["editable"] = true;
      })

      return filteredAds
    },
  },
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