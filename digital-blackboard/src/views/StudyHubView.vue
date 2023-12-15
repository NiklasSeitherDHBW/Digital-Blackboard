<template>

  <CustomAppBar
      titleRed="Study"
      titleGrey="Hub"
  ></CustomAppBar>

  <v-app>

    <v-container
        v-if="this.selectedCategory"
        style="width: 90%;"
    >

      <v-tabs
          v-model="this.selectedCategory"
          bg-color="transparent"
          color="#E0001BFF"
          grow
      >
        <v-tab
            v-for="category in studyhubCategories"
            :key="category"
            :value="category"
        >
          {{ category }}
        </v-tab>

      </v-tabs>

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
              align="left"
          >
            <div
                :id="item.id"
                class="rounded"
                style="height: 100%;"
            >
              <StudyHubBuddyCard
                  v-if="item.category === 'buddy'"
                  :item="item"
                  @itemChanged="itemChanged"
              ></StudyHubBuddyCard>

              <StudyHubGroupCard
                  v-if="item.category === 'group'"
                  :item="item"
                  @itemChanged="itemChanged"
              ></StudyHubGroupCard>

            </div>

          </v-col>

        </v-row>

      </v-container>

    </v-container>

    <div class="text-center">

      <v-menu>

        <template v-slot:activator="{ props: activatorProps }">

          <v-btn
              v-bind="activatorProps"
              style="border-radius: 5px; color: #E0001BFF; position: fixed; right: 0.5rem; box-shadow: 10px 10px 10px rgba(0,0,0,0.5); border: 1px solid #E0001BFF"
              :style="{ bottom: mobile ? '65px' : '15px' }"
              icon="mdi-plus"
              text="+"
          >
            <v-icon>
              mdi-plus
            </v-icon>

          </v-btn>

        </template>

        <v-list>

          <v-list-item @click="showDialogAddStudyBuddy = true">

            <v-list-item-title>Nachhilfe</v-list-item-title>

          </v-list-item>

          <v-list-item @click="showDialogAddStudyHub = true">

            <v-list-item-title>Gruppe</v-list-item-title>

          </v-list-item>

        </v-list>

      </v-menu>

      <v-dialog
          transition="dialog-bottom-transition"
          v-model="showDialogAddStudyBuddy"
          :style="{ maxWidth: mobile ? '100%' : '60%' }"
      >
        <AddStudyBuddyDialog
            @close-dialog="closeDialogAddStudyBuddy"
            @exit-dialog="exitDialogAddStudyBuddy">
        </AddStudyBuddyDialog>

      </v-dialog>

      <v-dialog
          transition="dialog-bottom-transition"
          v-model="showDialogAddStudyHub"
          :style="{ maxWidth: mobile ? '100%' : '60%' }"
      >
        <AddStudyHubDialog
            @close-dialog="closeDialogAddStudyHub"
            @exit-dialog="exitDialogAddStudyHub">
        </AddStudyHubDialog>

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

  </v-app>

</template>

<script>
import {createAdStudyBuddy, createAdStudyGroup, fetchAdsStudyHub} from '@/db'
import StudyHubBuddyCard from "@/components/studyHub/StudyHubBuddyCard.vue";
import StudyHubGroupCard from "@/components/studyHub/StudyHubGroupCard.vue";
import AddStudyBuddyDialog from "@/components/studyHub/AddStudyBuddyDialog.vue";
import AddStudyHubDialog from "@/components/studyHub/AddStudyHubDialog.vue";
import CustomAppBar from "@/components/util/CustomAppBar.vue";
export default {
  components: {AddStudyHubDialog, AddStudyBuddyDialog, StudyHubGroupCard, StudyHubBuddyCard, CustomAppBar},
  data: () => ({
    snackbarVisible: false,
    timeout: 3000,
    showDialogAddStudyHub: false,
    showDialogAddStudyBuddy: false,
    showDialogImages: false,

    studyhubCategories: [
        "Nachhilfe", "Gruppe"
    ],

    selectedCategory: "Nachhilfe",

    selectedItem: "",
    advertisements: [],

    search: "",
  }),

  methods: {
    scrollToCard() {
      if(!this.$route.query){
        return
      }
      if (this.$route.query.card && this.$route.query.selectedCategory) {
      const cardCategory = this.$route.query.selectedCategory
      const cardId = this.$route.query.card
        this.selectedCategory = cardCategory
        // Warten bis die DOM alle Elemente fertig geladen hat
        this.$nextTick(() => {
          const element = document.getElementById(cardId)
          if (element) {
            // zu ausgewählter Karte scrollen
            element.scrollIntoView({behavior: 'smooth'})
            // den Style zum hervorheben auswählen
            element.style.border = '5px solid red';
            // Timeout um das hervorheben umzukehren
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

    openDialogImagesFullscreen(item) {
      this.selectedItem = item;
      this.showDialogImages = true;
    },

    async exitDialogAddStudyBuddy() {
      this.showDialogAddStudyBuddy = false;
    },

    async closeDialogAddStudyBuddy(images, buddyData, contactData) {
      this.showDialogAddStudyBuddy = false;
      this.snackbarVisible = true;

      await createAdStudyBuddy(buddyData, images, contactData)

      await this.itemChanged()

    },

    async exitDialogAddStudyHub() {
      this.showDialogAddStudyHub = false;
    },

    async closeDialogAddStudyHub(images, hubData) {
      this.showDialogAddStudyHub = false;
      this.snackbarVisible = true;

      await createAdStudyGroup(hubData, images)

      await this.itemChanged()
    },

    async itemChanged() {
      this.advertisements = await fetchAdsStudyHub()
    }
  },

  async mounted() {
    this.advertisements = await fetchAdsStudyHub()
    this.scrollToCard()
  },

  computed : {

    filteredAdvertisements() {
      return this.advertisements.filter(ad => {
        if (!ad.categories || !this.selectedCategory){
          return
        }
        if (ad.categories !== this.selectedCategory) {
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

<script setup>
import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
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