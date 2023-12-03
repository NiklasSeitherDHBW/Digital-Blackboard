<template>
  <AppBar
      titleGrey="Study"
      titleRed="Hub"
  ></AppBar>

  <v-container
      :fluid=true
      align="center"
      style="width: 85%;"
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
        <StudyHubBuddyCard
            v-if="item.category === 'buddy'"
            :item="item"
        ></StudyHubBuddyCard>
        <StudyHubGroupCard
            v-if="item.category === 'group'"
            :item="item"
            @itemChanged="itemChanged"
        ></StudyHubGroupCard>
      </v-col>
    </v-row>
  </v-container>

  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ props: activatorProps }">
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
        <v-list-item @click="showDialogAddStudyBuddy = true">
          <v-list-item-title>Buddy</v-list-item-title>
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
      <AddStudyBuddyDialog @close-dialog="closeDialogAddStudyBuddy"></AddStudyBuddyDialog>
    </v-dialog>

    <v-dialog
        transition="dialog-bottom-transition"
        v-model="showDialogAddStudyHub"
        :style="{ maxWidth: mobile ? '100%' : '60%' }"
    >
      <AddStudyHubDialog @close-dialog="closeDialogAddStudyHub"></AddStudyHubDialog>
    </v-dialog>

  </div>
  <v-menu
      transition="slide-x-transition-reverse"
      location="start"
      :close-on-content-click="false"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          style="border-radius: 5px; background-color:#E0001BFF; color: white; position: fixed; right: 1rem; top: 7rem;"
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


<script>
export default {
  data: () => ({
    showDialogAddStudyHub: false,
    showDialogAddStudyBuddy: false,
    showDialogImages: false,

    selectedItem: null,
    advertisements: [
      {
        title: "Korrektur von Hausarbeiten, Bachelor- oder Masterarbeiten",
        images: ["https://media.licdn.com/dms/image/C4D03AQFeRA_eM_cKJg/profile-displayphoto-shrink_800_800/0/1613511035989?e=2147483647&v=beta&t=N8yoITebVYvJzeeFtH8CTXZGy5MmTwj-rnwNh1W3Ivw"],
        date_created: "25.11.2023",
        subject: "alle Fächer",
        description: "Ich bin Claudia Schneider,Volkswirtin, und habe einige Jahre als Journalistin/PR-Referentin gearbeitet. Ich schreibe und redigiere sehr gerne und habe daher vor rund eineinhalb Jahren begonnen, Bachelor- und Masterarbeiten aus unterschiedlichen Fachbereichen Korrektur zu lesen. Ich erhalte ein Word-Dokument und schicke eine Version mit sichtbaren Korrekturen und Anmerkungen zurück. Ich berechne kein Zeilen- oder Seitenhonorar. Da jede Arbeit einen unterschiedlich hohen Aufwand verlangt, berechne ich ein Stundenhonorar.",
        price: "Stundenhonorar",
        rating: 4,
        contact: "cschneider2@web.de",
        category: "buddy",
        availability: "Jederzeit"
      },
      {
        title: "MATHE Nachhilfe",
        date_created: "25.10.2018",
        subject: "Mathe, Statistik, Physik & Informatik",
        description: "Prüfung bestehen oder die Hälfte des GELDES zurück! Ich gebe seit 14 Jahren professionelle Mathe, Statistik, Physik & Informatik Nachhilfe.",
        images: ['https://www.juz-zoom.de/media/www.juz-zoom.de/media/med_513212/564258_mathe_nachhilfe.jpg'],
        price: "25,-",
        rating: 3,
        category: "buddy",
        availability: "Verfügbar",
        contact: "mathetutorium@outlook.com"
      },
      {
        title: "New Students Network (NSN)",
        subject: "Lerne neue Leute kennen und tausche dich in entspannter Atmosphäre aus!",
        date_created: "27.11.2024",
        category: "group",
        members: 10,
        joined: true,
        images: ['https://www.peoplegrove.com/wp-content/uploads/2022/07/networking-hero.png'],
        description: "Einmal in der Woche treffen sich alle Ersti´s, um sich gemeinsam kennen zu lernen, Fragen zu stellen und neue Freunde zu finden! Wenn du neu an der DHBW bist, dann sei dabei - wir freuen uns auf dich!",
        activities: "Restaurantbesuche, Kneipentouren, Treffen an der DHBW, gemeinsam in die Kantine gehen, ..."
      },
      {
        title: "Die Campus-Code-Genies",
        images: ["https://prompti.ai/wp-content/uploads/2023/07/pcboi2.png"],
        date_created: "29.11.2023",
        subject: "Programmiert gemeinsam und tauscht euch über eure Fähigkeiten aus - teilt eure Tipps und Tricks!",
        category: "group",
        members: 16,
        description: "Einmal wöchentlich habt ihr die Möglichkeit, im Raum 069C gemeinsam um 16 Uhr euer Expertenwissen im Programmieren zu teilen und unter Beweis zu stellen. Wir haben bereits tolle Projekte durchgeführt und viele Apps entwickelt. Sei dabei!",
        activities: "Code-Wettbewerbe, gemeinsame Coding-Projekte, Weiterbildungen, Fragen und Antworten"
      },
      {
        title: "Die Campus-Runners",
        images: ["https://campus-asyl.de/wp-content/uploads/2015/11/Jogging.jpg"],
        date_created: "29.11.2023",
        members: 36,
        subject: "Gemeinsam laufen wir und steigern uns Woche für Woche!",
        description: "Wenn du Schwierigkeiten hast dich zu motivieren, schließe dich gerne an und lass dich von anderen mitziehen.",
        activities: "30-120 min. Joggen gehen",
        category: "group"
      },
      {
        title: "Billiard-Battle",
        images: ["https://img2.tapimg.net/post/etag/FgT6VN6OGWu3uP02wkTKbBayj8yH.jpeg?imageMogr2/thumbnail/720x9999%3E/quality/80/format/jpg/interlace/1/ignore-error/1"],
        date_created: "29.11.2023",
        members: 6,
        subject: "Du bist gut im Billiard? Stelle dein Können unter Beweis!",
        description: "Alle zwei Wochen findet im großen Billiard-Raum im Gebäude C der DHBW ein Billiard-Turnier statt. Es gibt tolle Preise zu gewinnen.",
        activities: "Billiardturniere",
        category: "group"
      },
      {
        title: "Nachhilfe in Programmieren",
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwmFOCR3PftLIKjrzcpAcvHVq5RUbo1U8Q7A&usqp=CAU"],
        date_created: "29.11.2023",
        subject: "Java, Python, C++, R",
        price: "12,-",
        availability: "Verfügbar",
        description: "Du brauchst Hilfe in Programmieren und völlig am verzweifeln? Kein Problem - bei mir lernst du Schritt für Schritt zu coden.",
        contact: "06180-478392",
        category: "buddy"
      },
      {
        title: "EXPLORE: Mannheim",
        images: ["data:image/jpeg;base64,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"],
        date_created: "29.11.2023",
        members: 8,
        subject: "Die Stadt Mannheim gemeinsam erkunden",
        description: "Du bist neu in der Stadt? Schließe dich gerne unserer Gruppe an und probiere neue Bars, Restaurant und nette Locations aus.",
        activities: "Essen, Trinken, Clubbing",
        category: "group"
      },
    ],
    search: "",
  }),
  computed : {
    filteredAdvertisements() {
      return this.advertisements.filter(ad => {
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
    openDialogImagesFullscreen(item) {
      this.selectedItem = item;
      this.showDialogImages = true;
    },

    closeDialogAddStudyBuddy(images, buddyData, contactData) {
      this.showDialogAddStudyBuddy = false;

      let new_item = {
        title: buddyData.title,
        date_created: new Date().toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit' }), // TODO: needs to be changed: Push date obejct to database and convert it to string when retrieving data
        description: buddyData.description,
        price: buddyData.price,
        subject: buddyData.subject,
        category: buddyData.category,
        images: images,
        rating: buddyData.rating,
        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,
      }

      this.advertisements.push(new_item);
    },
    closeDialogAddStudyHub(images, hubData) {
      this.showDialogAddStudyHub = false;

      let new_item = {
        title: hubData.title,
        date_created: new Date().toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit' }), // TODO: needs to be changed: Push date obejct to database and convert it to string when retrieving data
        description: hubData.description,
        subject: hubData.subject,
        category: hubData.category,
        activities: hubData.activities,
        images: images,
        availability: hubData.availability,
        members: hubData.members,
        joined: hubData.joined,

      }

      this.advertisements.push(new_item);
    },

    itemChanged(oldItem, newItem) {
      for(let i = 0; i < this.advertisements.length; i++) {
        if (this.advertisements[i] === oldItem) {
          this.advertisements[i] = newItem;
        }
      }
    },
  },
};
</script>

<script setup>
import AppBar from "@/components/util/CustomAppBar.vue";
import AddStudyHubDialog from "@/components/studyHub/AddStudyHubDialog.vue";
import AddStudyBuddyDialog from "@/components/studyHub/AddStudyBuddyDialog.vue";
import StudyHubBuddyCard from "@/components/studyHub/StudyHubBuddyCard.vue";
import StudyHubGroupCard from "@/components/studyHub/StudyHubGroupCard.vue";

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