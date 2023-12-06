<template>
  <CustomAppBar
      titleRed="Events &amp;"
      titleGrey="Veranstaltungen"
  ></CustomAppBar>

  <v-app>
    <v-container
        style="width: 90%;"
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
import {addDoc, collection, getDocs, Timestamp} from "firebase/firestore";
import { db } from "@/db";

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

      advertisements: [],
      advertisements_old: [
        {
          title: 'Dualer Master',
          category: 'Informationen',
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
          images: ["https://media.geeksforgeeks.org/wp-content/uploads/20230911173805/What-is-Artiificial-Intelligence(AI).webp"]
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
          images: ["https://majers-weinscheuer.de/wp-content/uploads/2021/01/Mathaisemarkt-at-home-majers-weinscheuer-schriesheim.jpg"]
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
        {
          title: "DHBW Kneipentour",
          category: "Events",
          date: "2023-11-8",
          date_created: "01.01.2023",
          description: "Euch erwartet ein feuchtfröhlicher Abend, in dessen Verlauf Ihr, begleitet von unseren charmanten Guides, mehrere Mannheimer (Szene-)Kneipen von innen kennenlernen und " +
              "deren reichhaltiges Getränkeangebot testen werdet. Ihr habt auf der Tour natürlich die Möglichkeit, über Euren Kurs hinaus Kontakte zu anderen Studierenden zu knüpfen. Vor diesem Hintergrund möchten wir Euch auch schon einmal darauf hinweisen, dass wir die Gruppen bei der Einteilung etwas bunter durcheinander mischen. " +
              "Spätestens zur großen After-Kneipentour-Party im Chaplin Club werdet Ihr die Euch bekannten Gesichter auch wieder finden und gemeinsam bis zur Vorlesung am nächsten Morgen durchfeiern!",
          price: "12,00",
          availability: "Komm in die Gruppe",
          location: "Jungbusch",
          community: "Alle dualen StudentInnen der DHBW Mannheim",
          images: ["https://stuv-mannheim.de/wp-content/uploads/2022/11/pexels-clam-lo-3355400-scaled.jpg"],
        },
        {
          title: "Auslandstudium und -Praxis",
          category: "Informationen",
          date: "2023-11-27",
          date_created: "01.01.2023",
          description: "Studierende, die 2024 im Ausland studieren wollen, aufgepasst: Hier bekommen Sie alle wichtigen Infos rund um das Thema Beratung zu Gebührenprogrammen an der VIU, Kanada, oder dem ICMS, Australien.",
          price: "ab 999",
          availability: "Anmeldung via E-Mail",
          location: "023B",
          community: "An alle Entdecker",
          images: ["https://www.medienmaster.de/wp-content/uploads/2019/10/Weltkugel_efks_Fotolia_65482539_S.jpg"],
        },
        {
          title: "Literaturverwaltung mit Zotero",
          category: "Informationen",
          date: "2023-11-29",
          date_created: "01.01.2023",
          description: "Lernen Sie in diesem Online- Vortrag, wie Sie das Literaturverwaltungsprogramm Zotero effektiv nutzen können und profitieren Sie somit von Tipps & Tricks für Ihre Studienzeit ..",
          price: "Kostenlos",
          availability: "Anmeldung via E-Mail",
          location: "Online",
          community: "An alle StudentInnen der DHBW Mannheim ",
          images: ["https://www.uni-bamberg.de/fileadmin/_processed_/6/5/csm_Hand_Buecherhaufen_COLOURBOX31689433_b33c18717c.webp"],
        },
        {
          title: "Mein Weg in den deutschen Arbeitsmarkt",
          category: "Seminare",
          date: "2023-12-05",
          date_created: "01.01.2023",
          description: "Die Teilnehmenden lernen, den deutschen Arbeitsmarkt sowie seine Besonderheiten und Vormalitäten besser kennen. Weiterhin sollen sie befähigt werden, eine persönliche Vorgehensweise bezüglich der Jobsuche zu entwickeln, um eine ihren Fähigkeiten entsprechende Arbeitsstelle zu finden. Die Dozentin Frauke Fischmann hat mehrjährige Erfahrung in der Arbeit und Beratung von Akademiker:innen mit Fluchterfahrung mit dem Ziel der Arbeitsmarktintegration sowie umfassende Kenntnisse des deutschen Bildungssystems und Arbeitsmarktes sowie der deutschen Hochschullandschaft. ",
          price: "Kostenlos",
          availability: "Anmeldung via E-Mail",
          location: "Online",
          community: "An alle StudentInnen der DHBW Mannheim ",
          images: ["https://i.ebayimg.com/images/g/qEsAAOSwJ3Rath0G/s-l1200.webp"],
        },
        {
          title: 'Präsentationstraining',
          category: 'Seminare',
          date: '2024-05-23',
          date_created: "10.11.2023",
          description: "Die Teilnehmenden erhalten einen Einblick in verschiedene Präsentationstechniken, bekommen praktische Tipps zur Gestaltung von PowerPoint-Präsentationen und erarbeiten konkrete Ansatzpunkte für die nächste Präsentation. Dabei werden Techniken zur effektiven Vorbereitung vermittelt, ebenso wie der Umgang mit Nervosität. Das Ziel ist es zu lernen, wie man Präsentationen gestaltet, die den Inhalt verständlich und überzeugend vermitteln. Die Dozentin Dr. Johanna Fernández Castro ist interkulturelle Trainerin und freiberufliche Lehrbeauftragte an verschiedenen Universitäten",
          price: "20,99",
          availability: "Anmeldung ",
          location: "Raum 012C",
          community: "Alle",
          images: ["https://www.ime-seminare.de/wp-content/uploads/praesentationstraining_1275x750.jpg"]
        },
        {
          title: 'Netzwerken – Vitamin B für deine Bewerbung',
          category: 'Seminare',
          date: '2024-02-07',
          date_created: "10.11.2023",
          description: 'Netzwerken ist das A und O, vor allem in der Berufswelt. Im Seminar Netzwerken\n' +
              '– Vitamin B für ihre Bewerbung erlernen die Teilnehmenden, wie man erfolgreich persönlich und digital Kontakte knüpft. An vier Tagen erfahren sie Grundlagen, machen Übungen für eine selbstbewusste Kontaktaufnahme und widmen sich der digitalen Vernetzung. Am letzten Tag entwickeln sie eine konkrete Strategie, wie sie das Gelernte umsetzen und somit ein breites Netzwerk aufbauen und damit leichter einen Job finden können. ',
          price: "29,99",
          availability: "Anmeldung über bahdja.fix@dhbw-mannheim.de",
          location: "DHBW Mannheim Raum offen",
          community: "Whole community",
          images: ["https://www.wirtschaftsforum.de/fileadmin/_processed_/0/1/csm_Netzwerken_2_1_16ef9efc24.jpg"]
        },
      ],

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
    async closeDialogAddEvent(images, eventData) {
      this.showDialogAddEvent = false;

      // Split date by every component to create a date object for firebase
      let dateParts = eventData.date.split("-")

      let new_item = {
        images: images,

        title: eventData.title,
        date_created: Timestamp.fromDate(new Date()),

        date: Timestamp.fromDate(new Date(dateParts[0], dateParts[1] - 1, dateParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        price: eventData.price,
        community: eventData.community,

        description: eventData.description,
        location: eventData.location,
        members: 0,
        max_participants_limit: eventData.maxParticipantsLimit,

        category: eventData.category,
      }

      await addDoc(collection(db, "events-parties"), new_item);

      this.fetchData();
    },

    async closeDialogAddInfo(images, infoData) {
      this.showDialogAddInfo = false;

      let dateParts = infoData.date.split("-")

      let new_item = {
        images: images,

        title: infoData.title,
        date_created: Timestamp.fromDate(new Date()),

        date: Timestamp.fromDate(new Date(dateParts[0], dateParts[1] - 1, dateParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        community: infoData.community,

        description: infoData.description,
        location: infoData.location,

        category: infoData.category,
      }

      await addDoc(collection(db, "events-parties"), new_item);

      this.fetchData();
    },

    async closeDialogAddSeminar(images, seminarData) {
      this.showDialogAddSeminar = false;

      let dateParts = seminarData.date.split("-")

      let new_item = {
        images: images,

        title: seminarData.title,
        date_created: Timestamp.fromDate(new Date()),

        date: Timestamp.fromDate(new Date(dateParts[0], dateParts[1] - 1, dateParts[2])), // parts[1] - 1 because JavaScript counts months from 0 (January - 1, Februaray - 2, etc.)
        price: seminarData.price,
        community: seminarData.community,

        description: seminarData.description,
        location: seminarData.location,

        members: 0,
        max_participants_limit: seminarData.maxParticipantsLimit,

        category: seminarData.category,
      }

      await addDoc(collection(db, "events-parties"), new_item);

      this.fetchData();
    },

    setDefaultImages() {
      this.advertisements.forEach(event => {
        if (event.images.length === 0) {
          if (event.category === "Events") {
            event.images.push("https://th.bing.com/th/id/OIP.4yTkUC3EzS64VKlszOiukQHaBl?rs=1&pid=ImgDetMain");
          } else if (event.category === "Seminare") {
            event.images.push("https://www.frankfurt-school.de/.imaging/mte/fs-theme/stage-content-MQ2/dam/News/2022/Dezember/Graduation/Graduation-Ceremony-2022-Header-1266x321.jpg/jcr:content/Graduation%20Ceremony%202022%20Header%201266x321.jpg");
          } else if (event.category === "Informationen") {
            event.images.push("https://images.bild.de/5d415fba73cf6900016c8002/e35d695972ab704197e0a736aa3515c8,3a0a2df3?w=992");
          }
        }
      })
    },
    async fetchData() {
      const querySnapshot = await getDocs(collection(db, "events-parties"));

      // Convert the QueryDocumentSnapshots into an array of dictionaries
      const transformedData = querySnapshot.docs.map((doc) => {
        let tmp = doc.data();

        // Prepare data for displaying in card
        // assign document id as unique identifier for reading a specific advertisement
        tmp["id"] = doc.id;

        // Display dates in format TT.MM.YYYY
        tmp["date_created"] = new Date(tmp["date_created"].seconds * 1000).toLocaleDateString("de-DE", {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });

        tmp["date"] = new Date(tmp["date"].seconds * 1000).toLocaleDateString("de-DE", {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });

        tmp["availability"] = tmp["members"] + " / " + tmp["max_participants_limit"];

        return tmp;
      });

      this.advertisements = transformedData;
    }
  },
  mounted() {
    this.fetchData();
    this.setDefaultImages();
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
