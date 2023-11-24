<template>
  <v-app-bar color="white" height="100">
    <v-app-bar-title>
      <h2 style="color: #7C868DFF; display: inline-block; margin-right: 5px;">Dual</h2>
      <h2 style="color: #E0001BFF; display: inline-block;">Housing</h2>
    </v-app-bar-title>
  </v-app-bar>

  <v-container>
    <v-list>
      <v-list-item v-for="(appartment, index) in appartments" :key="index">
        <v-sheet class="mb-3 rounded pa-3">
          <v-row align="center">
            <v-col style="max-width: 300px">
              <v-list-item-avatar>
                <v-img
                    :src="appartment.image"
                    alt="Appartment Image"
                    style="width: 200px; height: 200px; max-width: 200px; max-height:200px"
                ></v-img>
              </v-list-item-avatar>
            </v-col>

            <v-col>
              <v-list-item-content>
                <v-list-item-title>{{ appartment.name }}</v-list-item-title>
                <v-divider style="width: 25%; min-width: 200px; margin-top: 10px; margin-bottom: 10px"/>
                <v-list-item-title>Kosten: {{ appartment.costs }}</v-list-item-title>
                <v-list-item-title>Verfügbar: {{ appartment.availability }}</v-list-item-title>
                <v-list-item-subtitle>
                  <p clas="text-wrap">
                    Anmerkung: {{ appartment.note }}
                  </p>
                </v-list-item-subtitle>
                <v-list-item-subtitle>Kontaktdaten: {{ appartment.contact }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
          </v-row>
        </v-sheet>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      appartments: [
        { name: "Campo Novo Frauen-WG-Zimmer (zur Untermiete)",
          costs: 530 ,
          availability: "20.12.23 – 31.03.24",
          note: "Hallo, ich suche für den Zeitraum Anfang Januar bis Ende März 2024 eine Untermieterin für mein WG-Zimmer im Campo Novo in Mannheim. Das Zimmer könnte ebenfalls für den Zeitraum Anfang Juli bis Ende September 2024 mit der Möglichkeit auf eine Übernahme ab Oktober 2024 untergemietet werden. Das Zimmer in der 2er-Frauen-WG befindet sich im 2. Stock (Aufzug vorhanden). Die Küche, das Bad sowie der Balkon stehen zur gemeinsamen Nutzung der Mieterinnen zur Verfügung. Wenn Du Fragen oder Interesse hast, melde Dich gerne bei mir!" ,
          contact: "Vanessa Zorn",
          image:"https://dualeswohnen.de/storage/apartments/OzwrZYxt3Nb0ESYNGLM8rFpSIVzI76vzrFpob3VRrDk7AnB6ZPygN2HnPtl71k7V/GLDSfPin7Clm4s6qZR22LCP85MxhUUE79ULGWBq-2023-10-25-14-47-07.jpeg"
        },

        { name: "Untermieter aus der B-Phase gesucht",
          costs: 540 ,
          availability: "22.06.24-04.10.24",
          note: "Ich suche einen Untermieter für mein WG-Zimmer in Mannheim Seckenheim. Das Zimmer sowie die Küche sind modern eingerichtet und möbliert. Vorteilhaft ist die Lage mit der Bahn bist du innerhalb von 10min an der DHBW. Highlight der Wohnung ist die riesige Balkonterrasse, auf welcher du bestimmt viel Zeit im Sommer verbringen wirst. Deine Zimmerfläche beträgt ~20qm. Dazu kommen nochmals ~30qm die du dir mit deinen Mitbewohner teilst. Waschmaschine und Spülmaschine sind auch vorhanden. Solltest du ein Putzmuffel sein habe ich noch etwas vorteilhaftes für dich, einmal die Woche wird die Wohnung von einer Putzkraft gereinigt. Die Miete beträgt 540€(warm), Nebenkosten gibt es keine (auch die wöchentliche Reinigung ist darin enthalten. Es wohnen noch 2 weitere DHBW-Student mit dir in der WG. Da ich noch eine ganze Weile studiere ist das WG-Zimmer nicht nur während einer B-Phase zu haben. Bei Interesse einfach anschreiben." ,
          contact: "Daniel Rothas",
          image:"https://dualeswohnen.de/storage/apartments/NxlPJnkOlofVm92pF7lsCQhO4Jfzoss1qp1Nmi6CCn6XldzVUtUQC79qdmzQa0Ii/3c7y9ZpILlIt0yArn0JGukd2m0sX1rwHLYMeGJK-2022-12-06-20-21-44.jpeg "
        },

        { name: "Suche Tauschpartner/in für eine Wohnung in Mannheim",
          costs: 450 ,
          availability: "01.01.24 – 31.03.24",
          note: "Hallo, ich heiße Xenia, bin 20 Jahre alt und werde ab dem 01.10.2023 in Mannheim, mit der Praxisphase meines Studiums beginnen. Ich werde aber schon im September, in Mannheim, mit einem einmonatigen Praktikum starten. Das Studium ist dual, das bedeutet ich bin ab dem 01.09.23-31.12.2023 in Mannheim (1.09 wegen dem Praktikum, sonst wäre es 1.10) und danach 3 Monate nicht mehr und dann 3 Monate wieder in Mannheim. Also ich bin alle 3 Monate für 3 Monate in Mannheim. Daher suche ich jemanden der genau im Gegensatz seine Praxisphase hat. Falls du Interesse hast, würde es mich freuen, wenn du dich meldest und wir gemeinsam eine Wohnung finden können :) " ,
          contact: "Xenia Frietsch",
          image:"https://dualeswohnen.de/storage/apartments/2KvNpOoDYKZkuHnIGnL4PhquPtvU1M8CfMYqUBGXjHxrTt7AdDGIErec1mtHLVCP/QWMy1j0ydvT9A1TYw98sO84bAp0FY615kOdYvtz-2023-04-02-18-25-41.jpeg"
        },

        { name: "Dualer Student DHBW/ Suche Wohnung für erste Theoriephase / Untermiete",
          costs: 450 ,
          availability: "01.04.24 – 28.06.24",
          note: "Hey ich studiere ab 1.10.23 an der DHBW in Mannheim Cyber Security. Ich suche eine Wohung als Untermieter für den Zeitraum 1.10.23 bis ca 31.12.23. " ,
          contact: "Maurice Mundi",
          image:"https://dualeswohnen.de/storage/apartments/wGqK6uRHtUbnWRXnGlEw4cqyERarvnooYpESq0bJKfAFDfYCFEoOorS8m02r8hoY/mOItDZ36msRkDJKKp1iFGW4XPNivFVwA9x3xpyE3-2023-04-03-09-05-50.jpg"
        },

        { name: "!SUCHE! Untermiete Wohnung in Mannheim",
          costs: 450 ,
          availability: "13.11.23 – 16.02.24",
          note: "Hallo, ich bin Adrien, 17 Jahre alt und suche eine Wohnung in Mannheim für folgende Zeitspannen: 13.11.2023 - 16.02.2024 22.04.2024 - 12.07.2024 02.09.2024 - 22.11.2024 27.01.2025 - 17.04.2025 22.09.2025 - 12.12.2025 07.04.2026 - 26.06.2026 Auch nur für einzelne Zeiträume würde ich eine Wohnung/WG mieten. Abweichende Zeitspannen (+-3 Tage) sind für mich teilweise auch möglich" ,
          contact: "Adrien Lucquiaud",
          image:"https://dualeswohnen.de/storage/apartments/XF81lEYXTmrv9vCULERAnFGDkWX7FpNQgDvc0on7NTiWnzKrNhy6yHQ4jC5yDBf0/rfSCw1LYQyyscrP69aoxsXRSXiy5RxUw7lF4lyXR-2023-05-16-18-14-52.jpg "
        },

        { name: "Dachgeschosswohnung im Altbauhaus",
          costs: 800,
          availability: "ab 15.09.23",
          note: "Unsere Dachgeschosswohnung in der Zähringer Str. 21 in Seckenheim wird zum 15.09.23 frei. Bei Bedarf ist ein Einzug zu einem späteren zeitpunkt möglich. Es handelt sich um ein Zweifamilienhaus aus den 20ern. … Die Kaltmiete beträgt 600 Euro, die Nebenkosten sind aufgrund der gestiegenen Energiepreise auf 200 Euro angesetzt, vermutlich aber geringer. Das Haus ist ein Nichtraucher-Haus und die Kaution beträgt zwei Monatsmieten." ,
          contact: "Rebekka Weitkamp, r.weitkamp@gmail.com",
          image : "",

        },

        { name: "WG – Wohnung (83m²) für 3 Studierende",
          costs: 1430,
          availability: "ab 01.03.23",
          note: "4 Zimmer Wohnung für WG Gründung. Nichtraucher! Große Wohnküche mit moderner EBK, voll möblierte Zimmer,… Südlich von Mannheim – Friedrichsfeld in der Alteichwaldsiedlung. Da es sich um eine Neugründung handelt, können sich Leute zusammenfinden, die sich schon kennen und gerne zusammen wohnen würden. Die Wohnung wird komplett möbliert vermietet.",
          contact: "D. Kassbaum, info@polsterwerkstatt.de",
          image : "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.bahnhit.de%2Fimages%2Fmh2encwg3rk-%2Fpanorama-von-mannheim-bahnhitde.jpg&tbnid=C_jUn_vLh6-iAM&vet=12ahUKEwiGl4Pf3NyCAxWG4AIHHe-HBGoQMygHegUIARCBAQ..i&imgrefurl=https%3A%2F%2Fwww.bahnhit.de%2Fblog%2F9-dinge-die-sie-in-mannheim-unbedingt-erleben-muessen&docid=MSmuLyNw_IFB9M&w=951&h=824&q=Mannheim%20&client=firefox-b-d&ved=2ahUKEwiGl4Pf3NyCAxWG4AIHHe-HBGoQMygHegUIARCBAQ",

        },
      ],
    };
  },
  methods: {
  },
};
</script>