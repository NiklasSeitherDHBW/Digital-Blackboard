<template>
  <v-stepper editable alt-labels v-model="step">
    <v-stepper-header>
      <v-stepper-item
          title="Angaben zur Wohnung"
          :value="1"
      >
      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          subtitle="Optional"
          title="Fotos des Objektes"
          :value="2"
      >

      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          title="Deine Kontaktdaten"
          :value="3"
      >
      </v-stepper-item>

    </v-stepper-header>
    <v-stepper-window>
      <v-card-title class="text-h6 font-weight-regular justify-space-between pa-2">
        <span>{{ currentTitle }}</span>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">

          <v-text-field
              outlined
              label="Titel des Inserats"
              v-model="formData.title"
          ></v-text-field>

          <v-text-field
              label="Beschreibung"
              v-model="formData.description"
          ></v-text-field>

          <v-text-field
              label="Zeitraum"
              placeholder="TT.MM.JJJJ - TT.MM.JJJJ"
              v-model="formData.availability"
          ></v-text-field>

          <v-text-field
              label="Ort"
              placeholder="Mannheim Neuostheim"
              v-model="formData.location"
          ></v-text-field>

          <v-text-field
              label="Monatliche Miete in €"
              placeholder="450"
              v-model="formData.price"
          ></v-text-field>

          <v-text-field
              label="Wohnfläche in m²"
              placeholder="17"
              v-model="formData.area"
          ></v-text-field>


          <v-checkbox
              label="Möbliert"
              v-model="formData.furniture"
          ></v-checkbox>

          <v-checkbox-btn
              v-model="enabled"
              label="WG"
              class="pe-2"
          ></v-checkbox-btn>
          <v-combobox
              :disabled="!enabled"
              :items="['Jungs', 'Mädchen', 'Gemischt']"
          ></v-combobox>


        </v-window-item>

        <v-window-item :value="2">
          <UploadImagesStep></UploadImagesStep>
        </v-window-item>

        <v-window-item :value="3">
          <v-text-field
              label="Vor- & Nachname *"
              placeholder="Maxime Musterfrau"
              variant="outlined"
          ></v-text-field>

          <v-text-field
              label="Mobil"
              placeholder="+49123456789"
              variant="outlined"
          ></v-text-field>

          <v-text-field
              label="Email *"
              placeholder="john@google.com"
              variant="outlined"
          ></v-text-field>

          <span class="text-caption text-grey-darken-1">
              Das ist die Email, welche zur Kontaktaufnahme den Interesenten zur Verfügung gestellt wird!
          </span>

        </v-window-item>

        <v-window-item :value="4">
          <div class="pa-4 text-center">
            <v-img
                class="mb-4"
                contain
                height="128"
                src="https://yt3.googleusercontent.com/OHp7wtYIU-VBDoPxa66Vm-2NLB7_dyccu8LuXdVZ9KWQXzaHjU5jEMkBtAfCxN4plfX3VlyKQg=s900-c-k-c0x00ffffff-no-rj"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Ihr Inserat wurde erfolgreich erstellt
            </h3>
            <span class="text-caption text-grey">Danke das sie das Digital Blackboard nutzen!</span>
          </div>
          <div>
            <v-card
                class="ma-1"
                title="Angaben zur Wohnung">

              <v-row
                  v-for="item in basicInfos"
                  :key="item.label"
                  no-gutters
              >
                <v-col>
                  <h4>
                    {{ item.label }}
                  </h4>
                </v-col>
                <v-col>
                  <p>
                    {{ item.value }}
                  </p>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
            v-if="step > 1 && step < 4"
            variant="text"
            @click="step--"
        >
          Zurück
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            v-if="step < 3"
            color="red"
            variant="flat"
            class="float right"
            @click="step++; saveFormData"
        >
          Nächste
        </v-btn>
        <v-btn
            v-if="step === 3"
            color="red"
            variant="flat"
            class="float right"
            @click="step++"
        >
          Inserat fertigstellen
        </v-btn>
        <v-btn
            v-if="step === 4"
            color="red"
            variant="flat"
            class="float right"
            @click="closeDialog"
        >
          Schließen
        </v-btn>
      </v-card-actions>
    </v-stepper-window>
  </v-stepper>
</template>

<script setup>
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";
</script>

<script>
export default {
  data: () => ({
    step: 1,
    enabled: false,
    formData: {
      title: "",
      description: "",
      availability: "",
      location: "",
      price : "",
      area: "",
      furniture: "",
      community: "",
    },
    contactData: {

    },

    basicInfosKeywords: [
      "title", "description", "availability", "location", "price", "area", "furniture", "community"
    ],
    contactKeywords: [
      "name"
    ],

    dictionary: {
      "title": "Titel",
      "availability": "Zeitraum",
      "area": "Wohnfläche in m²",
      "price" : "Monatliche Miete in €",
      "description": "Beschreibung",
      "location": "Ort / Stadtteil",
      "furniture": "Möbiliert",
      "community": "WG Zimmer",
    }
  }),
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
    saveFormData() {
      // Here you can save or use the formData object as needed
      console.log('Form Data saved:', this.formData);
    },
  },
    computed: {
      currentTitle() {
        switch (this.step) {
          case 1:
            return 'Angaben zur Wohnung'
          case 2:
            return 'Fotos des Objektes'
          case 3:
            return 'Deine Kontaktdaten'
          default:
            return 'Inserat erfolgreich erstellt'
        }
      },
      basicInfos() {
        console.log("Ich werde aufgerufen")
        let basicInfos = [];
        for (const attribute of this.basicInfosKeywords) {
          let value = this.formData[attribute]
          basicInfos.push({label: this.dictionary[attribute], value: value});
        }
        console.log(basicInfos)
        return basicInfos;
      },

    },
};
</script>



<style>

</style>