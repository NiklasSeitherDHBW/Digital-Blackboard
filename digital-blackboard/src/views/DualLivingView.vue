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
          :id = "item.id"
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
      :style="{ bottom: mobile ? '130px' : '15px' }"
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
</template>

<script setup>
import AppBar from "@/components/util/CustomAppBar.vue";
import AddApartment from "@/components/dualLiving/AddAppartmentDialog.vue";
import DualLivingCard from "@/components/dualLiving/DualLivingCard.vue";

import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
import {createAdDualLiving, fetchAdsDualLiving} from '@/db'

export default {
  data: () => ({
    snackbarVisible: false,
    timeout: 3000,

    showDialogAddApartment: false,
    showDialogImages: false,
    showDialogsContact: false,
    direction: 'left',

    selectedItem: null,
    advertisements: [],
    advertisements_old: [
      {
        title: 'Attraktive Studentenwohnung: Ab Januar 2024',
        description: 'Ich biete einem Tauschpartner meine Wohnung im Drei-Monats-Wechsel, da ich an der DHBW studiere und alle drei Monate für drei Monate in meiner Heimat in der Praxisphase bin. Falls du genau in die entgegengesetzten Phasen passt, würde ich mich sehr über eine kurze Nachricht freuen! ',
        location: "Mannheim Neuostheim",
        date_created: "08.11.2023",
        availability: "14.01.2023 - 15.04.2023",
        furniture: "Nein",
        community: "WG, 4 Jungs",
        price: "650",
        area: "120",
        images: ["https://beyond-real-estate.de/wp-content/uploads/2019/09/wohnung-inselstrasse-duesseldorf-1.jpg",],
        name: "Ava Lindner",
        phone: "0123 456789",
        email: "ava-lin@web.de"
      },
      {
        title: "Wohnung in Mannheim",
        date_created: "25.10.2023",
        price: 450,
        availability: "01.01.24 – 31.03.24",
        furniture: "Ja",
        community: "-",
        location: "Mannheim-Viernheim",
        description: "Hallo, ich heiße Xenia, bin 25 Jahre alt und werde ab dem 01.10.2023 meine Wohnung in Mannheim aufgeben. Ich suche jemanden, der Interesse hat, eine kleine, nette Wohnung mit EBK zu übernehmen und diese regelmäßig zu putzen und mit Liebe zu behandlen. Melde dich bei Interesse bei mir :) ",
        contact: "Xenia Frietsch",
        area: "21",
        images: ["https://dualeswohnen.de/storage/apartments/2KvNpOoDYKZkuHnIGnL4PhquPtvU1M8CfMYqUBGXjHxrTt7AdDGIErec1mtHLVCP/QWMy1j0ydvT9A1TYw98sO84bAp0FY615kOdYvtz-2023-04-02-18-25-41.jpeg", "https://cf.bstatic.com/xdata/images/hotel/max1024x768/407682874.jpg?k=76a5b9c92a3f2a41f3d2f7a564722b27cb19fa06e74dc10539daf5f8f575f0dd&o=&hp=1", "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"],
        name: "Xenia Frietsch",
        phone: "0782 5793030885",
        email: "xenia-frietsch@web.de"
      },
      {
        title: "Campo Novo Frauen-WG-Zimmer (zur Untermiete)",
        date_created: "20.11.2023",
        price: 530,
        availability: "20.12.23 – 31.03.24",
        description: "Hallo, ich biete für den Zeitraum Anfang Januar bis Ende März 2024 ein WG-Zimmer im Campo Novo in Mannheim. Das Zimmer könnte ebenfalls für den Zeitraum Anfang Juli bis Ende September 2024 mit der Möglichkeit auf eine Übernahme ab Oktober 2024 gemietet werden. Das Zimmer in der 2er-Frauen-WG befindet sich im 2. Stock (Aufzug vorhanden). Die Küche, das Bad sowie der Balkon stehen zur gemeinsamen Nutzung der Mieterinnen zur Verfügung. Wenn Du Fragen oder Interesse hast, melde Dich gerne bei mir!",
        contact: "Vanessa Zorn",
        area: "21",
        location: "Mannheim-Käfertal",
        furniture: "Ja",
        community: "Frauen-WG",
        images: ["https://dualeswohnen.de/storage/apartments/OzwrZYxt3Nb0ESYNGLM8rFpSIVzI76vzrFpob3VRrDk7AnB6ZPygN2HnPtl71k7V/GLDSfPin7Clm4s6qZR22LCP85MxhUUE79ULGWBq-2023-10-25-14-47-07.jpeg"],
        name: "Vanessa Zorn",
        phone: "0189 528432834",
        email: "zorn.v@gmail.com"
      },
      {
        title: "Du bist aus der B-Phase?",
        price: 540,
        date_created: "03.09.2023",
        area: "15",
        availability: "22.06.24-04.10.24",
        description: "Ich biete jemanden aus der B-Phase mein WG-Zimmer in Mannheim Seckenheim. Das Zimmer sowie die Küche sind modern eingerichtet und möbliert. Vorteilhaft ist die Lage, denn mit der Bahn bist du innerhalb von 10min an der DHBW. Highlight der Wohnung ist die riesige Balkonterrasse, auf welcher du bestimmt viel Zeit im Sommer verbringen wirst. Deine Zimmerfläche beträgt ~20qm. Dazu kommen nochmals ~30qm die du dir mit deinen Mitbewohner teilst. Waschmaschine und Spülmaschine sind auch vorhanden. Solltest du ein Putzmuffel sein habe ich noch etwas vorteilhaftes für dich - einmal die Woche wird die Wohnung von einer Putzkraft gereinigt. Die Miete beträgt 540€(warm), Nebenkosten gibt es keine (auch die wöchentliche Reinigung ist darin enthalten. Es wohnen noch 2 weitere DHBW-Student mit dir in der WG. Da ich noch eine ganze Weile studiere ist das WG-Zimmer nicht nur während einer B-Phase zu haben. Bei Interesse einfach anschreiben.",
        contact: "Daniel Rothas",
        location: "Mannheim-Seckenheim",
        furniture: "Ja",
        community: "-",
        images: ["https://dualeswohnen.de/storage/apartments/NxlPJnkOlofVm92pF7lsCQhO4Jfzoss1qp1Nmi6CCn6XldzVUtUQC79qdmzQa0Ii/3c7y9ZpILlIt0yArn0JGukd2m0sX1rwHLYMeGJK-2022-12-06-20-21-44.jpeg"],
        name: "Daniel Rothas",
        phone: "0176 9354826492",
        email: "daniel.rothas@outlook.de"
      },
      {
        title: "Wohnung in Ludwigshafen",
        price: 450,
        area: "30",
        date_created: "06.12.2023",
        availability: "01.10.23 - 8.06.24",
        description: "Hey, ich bin ab 1.10.23 an der DHBW in Mannheim mit dem Bachelor in Cyber Security fertig. Daher vermiete ich meine Wohung ab dem 1.10.23 ",
        contact: "Maurice Mundi",
        location: "Ludwigshafen",
        furniture: "-",
        community: "-",
        images: ["https://dualeswohnen.de/storage/apartments/wGqK6uRHtUbnWRXnGlEw4cqyERarvnooYpESq0bJKfAFDfYCFEoOorS8m02r8hoY/mOItDZ36msRkDJKKp1iFGW4XPNivFVwA9x3xpyE3-2023-04-03-09-05-50.jpg"],
        name: "Maurice Mundi",
        phone: "0179 1967672",
        email: "mm@gmx.net"
      },
      {
        title: "!BIETE! Tausch-Wohnung in Mannheim",
        price: 450,
        area: "10-30",
        date_created: "01.08.2023",
        availability: "13.11.23 – 16.02.24",
        description: "Hallo, ich bin Adrien, 17 Jahre alt und biete eine Wohnung in Mannheim für folgende Zeitspannen: 13.11.2023 - 16.02.2024 22.04.2024 - 12.07.2024 02.09.2024 - 22.11.2024 27.01.2025 - 17.04.2025 22.09.2025 - 12.12.2025 07.04.2026 - 26.06.2026 Auch nur für einzelne Zeiträume würde ich eine Wohnung/WG anbieten. Abweichende Zeitspannen (+-3 Tage) sind teilweise auch möglich",
        contact: "Adrien Lucquiaud",
        location: "Mannheim",
        furniture: "Nein",
        community: "-",
        images: ["https://www.tipps.net/wp-content/uploads/2011/05/Wohnungstausch.jpg"],
        name: "Adrien Lucquiaud",
        phone: "0396 236280",
        email: "lucquiaud.a@email.fr"
      },
      {
        title: "Dachgeschosswohnung im Altbauhaus",
        price: 800,
        availability: "ab 15.09.23",
        area: "100",
        date_created: "17.11.2023",
        description: "Unsere Dachgeschosswohnung in der Zähringer Str. 21 in Seckenheim wird zum 15.09.23 frei. Bei Bedarf ist ein Einzug zu einem späteren zeitpunkt möglich. Es handelt sich um ein Zweifamilienhaus aus den 20ern. … Die Kaltmiete beträgt 600 Euro, die Nebenkosten sind aufgrund der gestiegenen Energiepreise auf 200 Euro angesetzt, vermutlich aber geringer. Das Haus ist ein Nichtraucher-Haus und die Kaution beträgt zwei Monatsmieten.",
        contact: "Rebekka Weitkamp",
        location: "Mannheim-Seckenheim",
        furniture: "Nein",
        community: "-",
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwT_I--H-kxaF8N85sCsxUUN93fXY5barCIw&usqp=CAU"],
        name: "Rebekka Weitkamp",
        phone: "0160 795840941",
        email: "r.weitkamp@gmail.com"
      },
      {
        title: "WG – Wohnung (83m²) für 3 Studierende",
        price: 1430,
        area: "83",
        date_created: "13.06.2023",
        availability: "ab 01.03.23",
        description: "4 Zimmer Wohnung für WG Gründung. Nichtraucher! Große Wohnküche mit moderner EBK, voll möblierte Zimmer,… Südlich von Mannheim – Friedrichsfeld in der Alteichwaldsiedlung. Da es sich um eine Neugründung handelt, können sich Leute zusammenfinden, die sich schon kennen und gerne zusammen wohnen würden. Die Wohnung wird komplett möbliert vermietet.",
        contact: "D. Kassbaum",
        location: "Mannheim-Friedrichsfeld",
        furniture: "Ja",
        community: "3er-WG",
        images: ["https://ms.immowelt.org/30a35194-f1bc-40fd-8c87-dbf984462d27/cd01a722-ab54-4119-a909-4c5c75689c5f/328x224.jpg"],
        name: "D. Kassbaum",
        phone: "0137 09509274",
        email: "info@polsterwerkstatt.de"
      },
    ], // TODO: Add to firebase database and delete here

    search: "",
  }),
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
  methods: {
    scrollToCard() {
      const cardId = this.$route.query.card
      if (cardId) {
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
      }
    },
    closeSnackbar() {
      this.snackbarVisible = false;
    },

    openDialogImagesFullscreen(item) {
      this.selectedItem = item;
      this.showDialogImages = true;
    },

    async exitDialogAddAppartment() {
      this.showDialogAddApartment = false;
    },

    async closeDialogAddAppartment(formData, images, contactData) {
      this.showDialogAddApartment = false;
      this.snackbarVisible = true;

      await createAdDualLiving(formData, images, contactData)

      await this.fetchAds();
    },
    async fetchAds() {
      this.advertisements = await fetchAdsDualLiving();
    },
  },
  async mounted() {
    await this.fetchAds();
    this.scrollToCard();
  }
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