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
          <v-row no-gutters align="center">
            <v-col cols="2">
              <v-list-item-avatar>
                <v-img
                    :src="appartment.image"
                    alt="Appartment Image"
                    style="width: 200px; height: 200px;"
                ></v-img>
              </v-list-item-avatar>
            </v-col>

            <v-col>
              <v-list-item-content>

                <v-list-item-title>{{ appartment.name }}</v-list-item-title>
                <v-divider style="width: 25%"/>
                <v-list-item-title>Kosten: {{ appartment.costs }}</v-list-item-title>
                <v-list-item-title>Verfügbar: {{ appartment.availability }}</v-list-item-title>
                <v-list-item-subtitle>Anmerkung: {{ appartment.note }}</v-list-item-subtitle>
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
        { name: 'Mannheim HBF', costs: 0, availability: "immer", note: "Mädchen WG, keine stinkenden NIGGLS erwünscht", image: 'https://th.bing.com/th/id/OIP.pa7AwPHFqSsgTfdf0UF5HAHaFj?rs=1&pid=ImgDetMain'},
        { name: 'CAMPO NOVO MA', costs: 460, availability: "10.02.2024 - 08.05.2024", note: "Jungs WG", image: 'https://lh3.googleusercontent.com/p/AF1QipPXfKqY1uPB08p2ZOfytyjIA1YI0MJR-9xeXYze=s680-w680-h510'},
        { name: "Yannick Königstein", costs: "pegel abhängig", availability: "solange Freundin nicht da ist", image: "https://media.licdn.com/dms/image/D4E03AQEqErQPC1jgBQ/profile-displayphoto-shrink_800_800/0/1680527089493?e=2147483647&v=beta&t=roXOtGjzpjH8cKr5D9sh-N2SIF6VJNSrUbNAMPnG13A"},
      ],
    };
  },
  methods: {
  },
};
</script>