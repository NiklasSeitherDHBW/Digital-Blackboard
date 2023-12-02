<template>
  <AppBar
      titleGrey="Dual"
      titleRed="Living"
  ></AppBar>

  <v-container
      :fluid="true"
      style="width: 85%;"
      align="center"
  >
    <v-row>
      <v-col
          v-for="(item, index) in contents"
          :key="index"
          cols="12"
          sm="12"
          md="6"
          lg="6"
          xl="4"
          xxl="3"
      >
        <DualLivingCard
            :item="item"
        ></DualLivingCard>
      </v-col>
    </v-row>
  </v-container>

  <v-btn
      style="border-radius: 5px; background-color:#E0001BFF; color: white; position: fixed; right: 20px;"
      :style="{ bottom: mobile ? '75px' : '20px' }"
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
      ></AddApartment>
    </v-dialog>
  </v-btn>
</template>

<script>
export default {
  data: () => ({
    showDialogAddApartment: false,
    showDialogImages: false,
    showDialogsContact: false,
    selectedItem: null,
    contents: [
      {
        title: 'Sophies Rechner hebt ab!',
        description: 'Hauptsache er sah schön aus!!!.',
        location: "Mannheim Neuostheim",
        date_created: "08.11.2023",
        availability: "14.02.2023 - 15.05.2023",
        furniture: "Nein",
        community: "WG, 4 Jungs",
        price: "650",
        area: "120",
        images: ["https://beyond-real-estate.de/wp-content/uploads/2019/09/wohnung-inselstrasse-duesseldorf-1.jpg",],
        name: "Y",
        phone: "1",
        email: "y"
      },
      {
        title: "Suche Tauschpartner/in für eine Wohnung in Mannheim",
        date_created: "25.10.2023",
        price: 450,
        availability: "01.01.24 – 31.03.24",
        furniture: "Ja",
        description: "Hallo, ich heiße Xenia, bin 20 Jahre alt und werde ab dem 01.10.2023 in Mannheim, mit der Praxisphase meines Studiums beginnen. Ich werde aber schon im September, in Mannheim, mit einem einmonatigen Praktikum starten. Das Studium ist dual, das bedeutet ich bin ab dem 01.09.23-31.12.2023 in Mannheim (1.09 wegen dem Praktikum, sonst wäre es 1.10) und danach 3 Monate nicht mehr und dann 3 Monate wieder in Mannheim. Also ich bin alle 3 Monate für 3 Monate in Mannheim. Daher suche ich jemanden der genau im Gegensatz seine Praxisphase hat. Falls du Interesse hast, würde es mich freuen, wenn du dich meldest und wir gemeinsam eine Wohnung finden können :) ",
        contact: "Xenia Frietsch",
        area: "21",
        images: ["https://dualeswohnen.de/storage/apartments/2KvNpOoDYKZkuHnIGnL4PhquPtvU1M8CfMYqUBGXjHxrTt7AdDGIErec1mtHLVCP/QWMy1j0ydvT9A1TYw98sO84bAp0FY615kOdYvtz-2023-04-02-18-25-41.jpeg", "https://cf.bstatic.com/xdata/images/hotel/max1024x768/407682874.jpg?k=76a5b9c92a3f2a41f3d2f7a564722b27cb19fa06e74dc10539daf5f8f575f0dd&o=&hp=1", "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"],
        name: "Yannick Königstein",
        phone: "123",
        email: "ykoenigstein@deloitte.com"
      },
      {
        title: "Campo Novo Frauen-WG-Zimmer (zur Untermiete)",
        price: 530,
        availability: "20.12.23 – 31.03.24",
        description: "Hallo, ich suche für den Zeitraum Anfang Januar bis Ende März 2024 eine Untermieterin für mein WG-Zimmer im Campo Novo in Mannheim. Das Zimmer könnte ebenfalls für den Zeitraum Anfang Juli bis Ende September 2024 mit der Möglichkeit auf eine Übernahme ab Oktober 2024 untergemietet werden. Das Zimmer in der 2er-Frauen-WG befindet sich im 2. Stock (Aufzug vorhanden). Die Küche, das Bad sowie der Balkon stehen zur gemeinsamen Nutzung der Mieterinnen zur Verfügung. Wenn Du Fragen oder Interesse hast, melde Dich gerne bei mir!",
        contact: "Vanessa Zorn",
        images: ["https://dualeswohnen.de/storage/apartments/OzwrZYxt3Nb0ESYNGLM8rFpSIVzI76vzrFpob3VRrDk7AnB6ZPygN2HnPtl71k7V/GLDSfPin7Clm4s6qZR22LCP85MxhUUE79ULGWBq-2023-10-25-14-47-07.jpeg"]
      },
      {
        title: "Untermieter aus der B-Phase gesucht",
        price: 540,
        availability: "22.06.24-04.10.24",
        description: "Ich suche einen Untermieter für mein WG-Zimmer in Mannheim Seckenheim. Das Zimmer sowie die Küche sind modern eingerichtet und möbliert. Vorteilhaft ist die Lage mit der Bahn bist du innerhalb von 10min an der DHBW. Highlight der Wohnung ist die riesige Balkonterrasse, auf welcher du bestimmt viel Zeit im Sommer verbringen wirst. Deine Zimmerfläche beträgt ~20qm. Dazu kommen nochmals ~30qm die du dir mit deinen Mitbewohner teilst. Waschmaschine und Spülmaschine sind auch vorhanden. Solltest du ein Putzmuffel sein habe ich noch etwas vorteilhaftes für dich, einmal die Woche wird die Wohnung von einer Putzkraft gereinigt. Die Miete beträgt 540€(warm), Nebenkosten gibt es keine (auch die wöchentliche Reinigung ist darin enthalten. Es wohnen noch 2 weitere DHBW-Student mit dir in der WG. Da ich noch eine ganze Weile studiere ist das WG-Zimmer nicht nur während einer B-Phase zu haben. Bei Interesse einfach anschreiben.",
        contact: "Daniel Rothas",
        images: ["https://dualeswohnen.de/storage/apartments/NxlPJnkOlofVm92pF7lsCQhO4Jfzoss1qp1Nmi6CCn6XldzVUtUQC79qdmzQa0Ii/3c7y9ZpILlIt0yArn0JGukd2m0sX1rwHLYMeGJK-2022-12-06-20-21-44.jpeg"]
      },
      {
        title: "Dualer Student DHBW/ Suche Wohnung für erste Theoriephase / Untermiete",
        price: 450,
        availability: "01.04.24 – 28.06.24",
        description: "Hey ich studiere ab 1.10.23 an der DHBW in Mannheim Cyber Security. Ich suche eine Wohung als Untermieter für den Zeitraum 1.10.23 bis ca 31.12.23. ",
        contact: "Maurice Mundi",
        images: ["https://dualeswohnen.de/storage/apartments/wGqK6uRHtUbnWRXnGlEw4cqyERarvnooYpESq0bJKfAFDfYCFEoOorS8m02r8hoY/mOItDZ36msRkDJKKp1iFGW4XPNivFVwA9x3xpyE3-2023-04-03-09-05-50.jpg"]
      },
      {
        title: "!SUCHE! Untermiete Wohnung in Mannheim",
        price: 450,
        availability: "13.11.23 – 16.02.24",
        description: "Hallo, ich bin Adrien, 17 Jahre alt und suche eine Wohnung in Mannheim für folgende Zeitspannen: 13.11.2023 - 16.02.2024 22.04.2024 - 12.07.2024 02.09.2024 - 22.11.2024 27.01.2025 - 17.04.2025 22.09.2025 - 12.12.2025 07.04.2026 - 26.06.2026 Auch nur für einzelne Zeiträume würde ich eine Wohnung/WG mieten. Abweichende Zeitspannen (+-3 Tage) sind für mich teilweise auch möglich",
        contact: "Adrien Lucquiaud",
        images: ["https://dualeswohnen.de/storage/apartments/XF81lEYXTmrv9vCULERAnFGDkWX7FpNQgDvc0on7NTiWnzKrNhy6yHQ4jC5yDBf0/rfSCw1LYQyyscrP69aoxsXRSXiy5RxUw7lF4lyXR-2023-05-16-18-14-52.jpg "]
      },
      {
        title: "Dachgeschosswohnung im Altbauhaus",
        price: 800,
        availability: "ab 15.09.23",
        description: "Unsere Dachgeschosswohnung in der Zähringer Str. 21 in Seckenheim wird zum 15.09.23 frei. Bei Bedarf ist ein Einzug zu einem späteren zeitpunkt möglich. Es handelt sich um ein Zweifamilienhaus aus den 20ern. … Die Kaltmiete beträgt 600 Euro, die Nebenkosten sind aufgrund der gestiegenen Energiepreise auf 200 Euro angesetzt, vermutlich aber geringer. Das Haus ist ein Nichtraucher-Haus und die Kaution beträgt zwei Monatsmieten.",
        contact: "Rebekka Weitkamp, r.weitkamp@gmail.com",
        images: [""],

      },
      {
        title: "WG – Wohnung (83m²) für 3 Studierende",
        costs: 1430,
        availability: "ab 01.03.23",
        description: "4 Zimmer Wohnung für WG Gründung. Nichtraucher! Große Wohnküche mit moderner EBK, voll möblierte Zimmer,… Südlich von Mannheim – Friedrichsfeld in der Alteichwaldsiedlung. Da es sich um eine Neugründung handelt, können sich Leute zusammenfinden, die sich schon kennen und gerne zusammen wohnen würden. Die Wohnung wird komplett möbliert vermietet.",
        contact: "D. Kassbaum, info@polsterwerkstatt.de",
        images: ["https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.bahnhit.de%2Fimages%2Fmh2encwg3rk-%2Fpanorama-von-mannheim-bahnhitde.jpg&tbnid=C_jUn_vLh6-iAM&vet=12ahUKEwiGl4Pf3NyCAxWG4AIHHe-HBGoQMygHegUIARCBAQ..i&imgrefurl=https%3A%2F%2Fwww.bahnhit.de%2Fblog%2F9-dinge-die-sie-in-mannheim-unbedingt-erleben-muessen&docid=MSmuLyNw_IFB9M&w=951&h=824&q=Mannheim%20&client=firefox-b-d&ved=2ahUKEwiGl4Pf3NyCAxWG4AIHHe-HBGoQMygHegUIARCBAQ"],
        name: "Y",
        phone: "1",
        email: "y"
      },
    ],
  }),
  methods: {
    openDialogImagesFullscreen(item) {
      this.selectedItem = item;
      this.showDialogImages = true;
    },
    closeDialogAddAppartment(formData, images, contactData) {
      this.showDialogAddApartment = false;

      let new_item = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date_created: "29.11.2023",
        availability: `${formData.availabelFrom} - ${formData.availabelTill}`,
        furniture: formData.furniture ? "Ja" : "Nein",
        community: `${formData.community ? 'Ja -' : 'Nein'} ${formData.selectedGender}`,
        price: formData.price,
        area: formData.area,
        images: images,
        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,
      }

      this.contents.push(new_item);
    },
  },
};
</script>

<script setup>
import AppBar from "@/components/util/CustomAppBar.vue";

import AddApartment from "@/components/dualLiving/AddAppartmentDialog.vue"
import DualLivingCard from "@/components/dualLiving/DualLivingCard.vue";

import {useDisplay} from "vuetify";

const {mobile} = useDisplay()

</script>