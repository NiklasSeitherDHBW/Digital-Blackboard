<template>
  <CustomAppBar titleGrey="Events &amp;" title-red="Feiern"/>
  <v-app>
    <v-container
        style="width: 85%;">
      <v-row>
        <v-col v-for="(category, index) in this.eventCategories"
               :key="index"
               cols="12"
               md="4"
        >
          <v-card @click="this.selectedCategory = category;" :color="category === this.selectedCategory ? '#E0001BFF' : '#FFFFFF'"
                  :style="{ width: category === this.selectedCategory ? '100%' : 'auto', 'font-size': category === this.selectedCategory ? '20px' : '16px' }"
          >
            <v-card-title class="text-center transition-swing" :style="{ fontSize: category === this.selectedCategory ? '22px' : '16px' }">
              {{ category }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <!-- Display Events -->
      <v-container
        :fluid=true
      >
        <v-row>
          <v-col
            v-for="(item, index) in getEventsByCategory(this.selectedCategory)"
            :key="index"
          >
            <EventsPartiesCard
              :item="item"
            ></EventsPartiesCard>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-btn
        style="border-radius: 5px; background-color:#E0001BFF; color: white; position: fixed; right: 20px;"
        :style="{ bottom: mobile ? '75px' : '20px' }"
        icon="mdi-plus"
        text="+">
      <v-icon>
        mdi-plus
      </v-icon>
      <v-dialog
          transition="dialog-bottom-transition"
          v-model="showDialogAddApartment"
          activator="parent"
          :style="{ maxWidth: mobile ? '100%' : '60%' }"
      >
        <AddEventDialog @close-dialog="closeDialogAddAppartment"></AddEventDialog>
      </v-dialog>
    </v-btn>
  </v-app>
</template>

<script setup>
import CustomAppBar from "@/components/util/CustomAppBar.vue";
import EventsPartiesCard from "@/components/eventsParties/EventsPartiesCard.vue";
import AddEventDialog from "@/components/eventsParties/AddEventDialog.vue";
import {useDisplay} from "vuetify";

const { mobile } = useDisplay()
</script>

<script>
export default {
  data() {
    return {
      showDialogAddApartment: false,
      eventCategories: ["Events", "Feiern", "Seminare"],
      events: [
        {
          title: 'Dualer Master',
          category: 'Events',
          date: '2023-01-15',
          date_created: "08.01.2023",
          description: 'Wie kannst du einen Dualen Master überleben.',
          price: "Kostenlos",
          availability: "51 / 72",
          location: "Raum 069C",
          community: "Free for all",
          images: ["https://www.uni-frankfurt.de/94543088.jpg"]
        },
        {
          title: 'Seminar für Artificial Intelligence',
          category: 'Seminare',
          date: '2023-02-20',
          date_created: "09.02.2023",
          description: 'Explore the advancements in AI technology.',
          price: "3 €",
          availability: "51 / 72",
          location: "Raum 069C",
          community: "Free for all",
          images: []
        },
        {
          title: 'Erstsemester Party',
          category: 'Feiern',
          date: '2023-03-10',
          date_created: "10.11.2023",
          description: 'Dance until the Sun comes up.',
          price: "Kostenlos",
          availability: "51 / 72",
          location: "Raum 069C",
          community: "Partymäuse",
          images: []
        },
        {
          title: "Unser letzter Wille, immer mehr Promille!",
          category: "Feiern",
          date: "Jeden Freitag und Samstag, manchmal auch Dienstag :)",
          date_created: "01.01.2023",
          description: "Name ist Programm",
          price: "4,99 € / Flasche, besser geht nicht",
          availability: "Komm in die Gruppe",
          location: "Überall",
          community: "Jeder ist willkommen",
          images: ["https://i.ebayimg.com/images/g/qEsAAOSwJ3Rath0G/s-l1200.webp"],
        },
      ],
      selectedCategory: null
    }
  },
  methods: {
    getEventsByCategory(category) {
      return this.events.filter(event => event.category === category);
    },

    closeDialogAddAppartment() {
      this.showDialogAddApartment = false;
    },
    setDefaultImages() {
      this.events.forEach(event => {
        if (event.images.length === 0) {
          if (event.category === "Events") {
            event.images.push("https://th.bing.com/th/id/OIP.4yTkUC3EzS64VKlszOiukQHaBl?rs=1&pid=ImgDetMain");
          }
          else if (event.category === "Seminare") {
            event.images.push("https://www.frankfurt-school.de/.imaging/mte/fs-theme/stage-content-MQ2/dam/News/2022/Dezember/Graduation/Graduation-Ceremony-2022-Header-1266x321.jpg/jcr:content/Graduation%20Ceremony%202022%20Header%201266x321.jpg");
          }
          else if (event.category === "Feiern") {
            event.images.push("https://images.bild.de/5d415fba73cf6900016c8002/e35d695972ab704197e0a736aa3515c8,3a0a2df3?w=992");
          }
        }
      })
    },
  },
  mounted() {
    this.setDefaultImages();
  }
}
</script>

<style>
</style>
