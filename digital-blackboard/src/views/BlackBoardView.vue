<template>
    <AppBar
      titleRed="Digital"
      titleGrey="Blackboard"
      subtitle="Letzte Ereignisse"
  ></AppBar>

    <v-container
        style="width: 100%;"
    >

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
                style="height: 100%;"
            >
              <DualLivingCard
                  v-if="item.adType === 'dualLiving'"
                  :item="item"
              ></DualLivingCard>

              <EventsPartiesCard
                  v-if="item.adType === 'events'"
                  :item="item"
              ></EventsPartiesCard>

              <StudyHubBuddyCard
                  v-if="item.adType === 'studyHub' && item.category === 'buddy'"
                  :item="item"
              ></StudyHubBuddyCard>

              <StudyHubGroupCard
                  v-if="item.adType === 'studyHub' && item.category === 'group'"
                  :item="item"
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
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>

      <v-card min-width="300" >
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
    import AppBar from "@/components/util/CustomAppBar.vue";
    import EventsPartiesCard from "@/components/eventsParties/EventsPartiesCard.vue";
    import DualLivingCard from "@/components/dualLiving/DualLivingCard.vue";
    import StudyHubBuddyCard from "@/components/studyHub/StudyHubBuddyCard.vue";
    import StudyHubGroupCard from "@/components/studyHub/StudyHubGroupCard.vue";

    import {useDisplay} from "vuetify";

    const {mobile} = useDisplay()
  </script>

  <script>
    import {fetchAdsDualLiving, fetchAdsEventsInfos, fetchAdsStudyHub} from '@/db'

    export default {
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
      computed: {
        filteredAdvertisements() {
          const now = new Date();
          const fourteenDaysAgo = new Date(now);
          fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 3);

          return this.advertisements.filter(ad => {

            // Parse the date_created string into a Date object
            const adCreationDateParts = ad.date_created.split('.');
            const adCreationDate = new Date(
                adCreationDateParts[2], // Year
                adCreationDateParts[1] - 1, // Month (months are 0-indexed in JavaScript)
                adCreationDateParts[0] // Day
            );

            // Check if the ad was created less than 14 days ago
            if (adCreationDate < fourteenDaysAgo) {
              return false;
            }

            // Check if any property contains the search term
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
      async mounted() {
        let test = await fetchAdsDualLiving();
        let test2 = await fetchAdsEventsInfos();
        let test3 = await fetchAdsStudyHub();

        this.advertisements = test.concat(test2).concat(test3)
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
