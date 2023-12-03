<template>
  <CustomAppBar
      titleGrey="Events &amp;"
      title-red="Veranstaltungen"
  ></CustomAppBar>

  <v-app>
    <v-container
        style="width: 85%;"
    >
      <v-row>
        <v-col
            v-for="(category, index) in this.eventCategories"
            :key="index"
            cols="12"
            md="4"
        >
          <v-card
              :color="category === this.selectedCategory ? '#E0001BFF' : '#FFFFFF'"
              :style="{ width: category === this.selectedCategory ? '100%' : 'auto', 'font-size': category === this.selectedCategory ? '20px' : '16px' }"
              @click="this.selectedCategory = category;"
          >
            <v-card-title
                class="text-center transition-swing"
                :style="{ fontSize: category === this.selectedCategory ? '22px' : '16px' }"
            >
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
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="4"
              xxl="3"
          >
            <EventsPartiesCard
                :item="item"
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
              style="border-radius: 5px; background-color:#E0001BFF; color: white; position: fixed; right: 20px;"
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
            @close-dialog="closeDialogAddEvent"
        ></AddEventDialog>
      </v-dialog>

      <v-dialog
          transition="dialog-bottom-transition"
          v-model="showDialogAddInfo"
          :style="{ maxWidth: mobile ? '100%' : '60%' }"
      >
        <AddInfoDialog
            @close-dialog="closeDialogAddInfo"
        ></AddInfoDialog>
      </v-dialog>

      <v-dialog
          transition="dialog-bottom-transition"
          v-model="showDialogAddSeminar"
          :style="{ maxWidth: mobile ? '100%' : '60%' }"
      >
        <AddSeminarDialog
            @close-dialog="closeDialogAddSeminar"
        ></AddSeminarDialog>
      </v-dialog>
    </div>
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
export default {
  data() {
    return {
      showDialogAddEvent: false,
      showDialogAddInfo: false,
      showDialogAddSeminar: false,

      eventCategories: [
        "Events", "Informationen", "Seminare"
      ],
      selectedCategory: null,

      events: [
        {
          title: 'Dualer Master',
          category: 'Informationen',
          date: '2023-01-15',
          date_created: "08.01.2023",
          description: 'Wie kannst du einen Dualen Master überleben?',
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
          category: 'Events',
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
          category: "Events",
          date: "Jeden Freitag und Samstag, manchmal auch Dienstag :)",
          date_created: "01.01.2023",
          description: "Name ist Programm",
          price: "4,99 / Flasche, besser geht nicht",
          availability: "Komm in die Gruppe",
          location: "Überall",
          community: "Jeder ist willkommen",
          images: ["https://i.ebayimg.com/images/g/qEsAAOSwJ3Rath0G/s-l1200.webp"],
        },
      ],
    }
  },
  methods: {
    getEventsByCategory(category) {
      return this.events.filter(event => event.category === category);
    },

    closeDialogAddEvent(images, eventData) {
      this.showDialogAddEvent = false;

      let new_item = {
        title: eventData.title,
        date_created: new Date().toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit' }), // TODO: needs to be changed: Push date obejct to database and convert it to string when retrieving data
        description: eventData.description,
        price: eventData.price,
        date: eventData.date,
        category: eventData.category,
        images: images,
        location: eventData.location,
        availability: eventData.availability,
        community: eventData.community,
      }
      this.events.push(new_item);
    },

    closeDialogAddInfo(images, infoData) {
      this.showDialogAddInfo = false;

      let new_item = {
        title: infoData.title,
        description: infoData.description,
        category: infoData.category,
        date_created: "29.11.2023",
        images: images,
        location: infoData.location,
        community: infoData.community,
      }

      this.events.push(new_item);
    },

    closeDialogAddSeminar(images, seminarData) {
      this.showDialogAddSeminar = false;

      let new_item = {
        title: seminarData.title,
        description: seminarData.description,
        category: seminarData.category,
        date: seminarData.date,
        date_created: "29.11.2023",
        price: seminarData.price,
        images: images,
        location: seminarData.location,
        community: seminarData.community,
        availability: seminarData.availability,
      }
      this.events.push(new_item);
    },

    setDefaultImages() {
      this.events.forEach(event => {
        if (event.images.length === 0) {
          if (event.category === "Events") {
            event.images.push("https://th.bing.com/th/id/OIP.4yTkUC3EzS64VKlszOiukQHaBl?rs=1&pid=ImgDetMain");
          } else if (event.category === "Seminare") {
            event.images.push("https://www.frankfurt-school.de/.imaging/mte/fs-theme/stage-content-MQ2/dam/News/2022/Dezember/Graduation/Graduation-Ceremony-2022-Header-1266x321.jpg/jcr:content/Graduation%20Ceremony%202022%20Header%201266x321.jpg");
          } else if (event.category === "Feiern") {
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
