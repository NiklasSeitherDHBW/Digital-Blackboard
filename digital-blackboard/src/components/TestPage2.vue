<template>
  <v-stepper
      v-model="step"
      alt-labels
      style="width: 80%;"
  >
    <v-stepper-header>
      <v-stepper-item
        title="Angaben zur Wohnung"
        :value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Foto(s) des Objektes"
        subtitle="Optional"
        :value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Deine Kontaktdaten"
        :value="3"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Zusammenfassung"
        :value="4"
      ></v-stepper-item>
    </v-stepper-header>

    <v-stepper-window v-model="step">
      <v-card-title class="text-h6">
        <span>
          {{ currentTitle }}
        </span>
      </v-card-title>

      <v-window-item
          :value="1"
      >
        <v-form
            ref="form"
            @submit="submitForm"
        >
          <v-text-field
            class="mt-2"
            label="Titel des Inserats"
            variant="outlined"
            :rules="notEmptyRules"
            v-model="formData.title"
            required
          ></v-text-field>

          <v-text-field
              label="Beschreibung"
              variant="outlined"
              v-model="formData.description"
          ></v-text-field>

          <v-text-field
              label="Zeitraum"
              placeholder="TT.MM.JJJJ - TT.MM.JJJJ"
              :rules="notEmptyRules"
              v-model="formData.availability"
              variant="outlined"
          ></v-text-field>

          <v-text-field
              label="Ort"
              placeholder="Mannheim Neuostheim"
              variant="outlined"
              v-model="formData.location"
          ></v-text-field>

          <v-text-field
              label="Monatliche Miete in €"
              variant="outlined"
              v-model="formData.price"
          ></v-text-field>

          <v-text-field
              label="Wohnfläche in m²"
              variant="outlined"
              v-model="formData.area"
          ></v-text-field>

          <v-checkbox
              value="mdi-check"
              label="Möbliert"
              type="checkbox"
              v-model="formData.furniture"
          ></v-checkbox>

          <v-checkbox
            v-model="formData.community"
            label="WG"
          ></v-checkbox>

          <v-select
              v-if="formData.community"
              v-model="formData.selectedGender"
              variant="outlined"
              :items="['Jungs', 'Mädchen', 'Gemischt']"
              label="Select Gender"
          ></v-select>
        </v-form>
      </v-window-item>

      <v-window-item :value="2">
        <UploadImagesStep></UploadImagesStep>
      </v-window-item>

      <v-window-item :value="3">
        <v-form ref="form" @submit="submitContact">
          <v-text-field
              label="Vor- & Nachname *"
              placeholder="Maxime Musterfrau"
              variant="outlined"
              class="mt-2"
              v-model="contactData.name"
          ></v-text-field>

          <v-text-field
              label="Mobil"
              placeholder="+49123456789"
              variant="outlined"
              v-model="contactData.mobil"
          ></v-text-field>

          <v-text-field
              label="E-Mail *"
              placeholder="john@google.com"
              variant="outlined"
              v-model="contactData.email"
          ></v-text-field>
        </v-form>
        <span class="text-caption text-grey-darken-1">
              Das ist die Email, welche den Interesenten zur Kontaktaufnahme zur Verfügung gestellt wird!
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
                <p v-if="item && item.value && item.value.startsWith('mdi-')">
                  <v-icon>{{ item.value }}</v-icon>
                </p>
                <p v-else>
                  {{ item.value }}
                </p>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <div>
          <v-card
              class="ma-2"
              title="Kontakt angaben">

            <v-row
                v-for="item in extraInfos"
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
    </v-stepper-window>

    <v-card-actions>
      <v-btn
          v-if="step > 1 && step < 5"
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
          type="submit"
          @click="moveToNextStep"
      >
        Nächste
      </v-btn>
      <v-btn
          v-if="step === 3"
          color="red"
          variant="flat"
          class="float right"
          type="submit"
          @click="step++; submitForm"
      >
        Inserat fertigstellen
      </v-btn>
      <v-btn
          v-if="step === 4"
          color="red"
          variant="flat"
          class="float right"
          @click="'dumb donkey'"
      >
        Schließen
      </v-btn>
    </v-card-actions>
  </v-stepper>
</template>

<script>
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";

export default {
  components: {UploadImagesStep},
  data() {
    return {
      selectedGender: null,
      isCommunityLiving: false,
      step: 1,

      basicInfosKeywords: [
        "title", "description", "availability", "location", "price", "area", "furniture", "community"
      ],
      extraInfosKeywords: [
        "name", "mobil", "email"
      ],

      formData: {
        title: '',
        description: '',
        availability: '',
        location: '',
        price: '',
        area: '',
        furniture: '',
        community: '',
        selectedGender: ''
      },

      contactData: {
        name: '',
        mobil: '',
        email: '',
      },

      dictionary: {
        "title": "Titel:",
        "availability": "Zeitraum:",
        "area": "Wohnfläche in m²:",
        "price": "Warmmiete in €:",
        "description": "Beschreibung:",
        "location": "Ort / Stadtteil:",
        "furniture": "Möbiliert:",
        "community": "WG Zimmer:",

        "name": "Vor- & Nachname:",
        "mobil": "Handynummer:",
        "email": "E-Mail:",
      },

      notEmptyRules: [
          value => {
            return value ? true : "You must enter something"
          }
      ]
    };
  },
  methods: {
    async validate() {
      const valid = await this.$refs.form.validate();
      return valid;
    },
    submitContact() {
      // Handle form submission, you can access the data using this.contactData
      console.log(this.contactData);
    },
    submitForm() {
      // Handle form submission, you can access the data using this.contactData
      console.log(this.formData);
    },
    async moveToNextStep() {
      const valid = await this.validate();
      if (valid) {
        this.step++;
      } else {
        // Display an error message or take appropriate action
        // For example, you can show a snackbar or tooltip
        this.$toaster.error('Please fill out the required fields.');
      }
    }
  },
  computed: {
      currentTitle() {
        switch (this.step) {
          case 1:
            return "Angaben zur Wohnung";
          case 2:
            return "Foto(s) des Objektes";
          case 3:
            return "Deine Kontaktdaten";
          default:
            return "Inserat erstellt";
        }
      },
      basicInfos() {
        let basicInfos = [];
        for (const attribute of this.basicInfosKeywords) {
          let value = this.formData[attribute];
          basicInfos.push({ label: this.dictionary[attribute], value: value });
        }
        return basicInfos;
      },
      extraInfos() {
        let extraInfos = [];
        for (const attribute of this.extraInfosKeywords) {
          let value = this.contactData[attribute];
          extraInfos.push({ label: this.dictionary[attribute], value: value });
        }
        return extraInfos;
      },
    },
    watch: {
      isCommunityLiving(value) {
        // If the checkbox is unchecked, clear the selection
        if (!value) {
          this.formData.selectedGender = "";
        }
      },
    },
};
</script>