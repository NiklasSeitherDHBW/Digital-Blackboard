<template>
  <v-stepper
      v-model="step"
      alt-labels
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
              maxlength="60"
              counter
              required
          ></v-text-field>

          <v-text-field
              label="Beschreibung"
              variant="outlined"
              v-model="formData.description"
              maxlength="300"
              counter
          ></v-text-field>

          <v-text-field
              label="Von"
              placeholder="TT.MM.JJJJ"
              :rules="notEmptyRules"
              type="date"
              v-model="formData.availabelFrom"
              :max="formData.availabelTill"
              variant="outlined"
          ></v-text-field>

          <v-text-field
              label="Bis"
              placeholder="TT.MM.JJJJ"
              :rules="notEmptyRules"
              type="date"
              :min="formData.availabelFrom"
              v-model="formData.availabelTill"
              variant="outlined"
          ></v-text-field>

          <v-text-field
              label="Ort"
              placeholder="Mannheim Neuostheim"
              variant="outlined"
              v-model="formData.location"
          ></v-text-field>

          <v-text-field
              label="Monatliche Miete"
              variant="outlined"
              prefix="€"
              v-model="formData.price"
          ></v-text-field>

          <v-text-field
              label="Wohnfläche"
              variant="outlined"
              prefix="m²"
              v-model="formData.area"
          ></v-text-field>

          <v-checkbox
              v-model="formData.furniture"
              label="Möbliert"
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
              label="Welches Geschlecht"
          ></v-select>
        </v-form>
      </v-window-item>

      <v-window-item :value="2">
        <UploadImagesStep></UploadImagesStep>
      </v-window-item>

      <v-window-item :value="3">
        <v-form ref="form">
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
              type="tel"
              v-model="contactData.mobil"
          ></v-text-field>

          <v-text-field
              label="E-Mail *"
              placeholder="john@google.com"
              variant="outlined"
              type="email"
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

        <v-card
            class="ma-1"
            variant="outlined"
        >
          <v-card-title>Wohnungsdaten</v-card-title>

          <v-card-text>
            <v-row
                v-for="item in basicInfos"
                :key="item.label"
                no-gutters
                class="mt-1"
            >
              <v-col>
                <p>
                  {{ item.label }}
                </p>
              </v-col>

              <v-col>
                <p v-if="item && typeof item.value === 'boolean'">
                  <v-icon>{{ item.value ? 'mdi-check' : 'mdi-close' }}</v-icon>
                </p>
                <p v-else>
                  {{ item.value }}
                </p>

              </v-col>
            </v-row>
          </v-card-text>

          <v-divider style="width: 85%; margin: auto; margin-top: 10px; margin-bottom: 10px;"></v-divider>

            <v-card-title>Kontakdaten</v-card-title>

            <v-card-text>
              <v-row
                  v-for="item in extraInfos"
                  :key="item.label"
                  no-gutters
                  class="mt-1"
              >
                <v-col>
                  <p>
                    {{ item.label }}
                  </p>
                </v-col>
                <v-col>
                  <p>
                    {{ item.value }}
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
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
          class="float right"
          type="submit"
          @click="moveToNextStep"
      >
        Nächste
      </v-btn>
      <v-btn
          v-if="step === 3"
          color="red"
          class="float right"
          type="submit"
          @click="submitForm"
      >
        Inserat fertigstellen
      </v-btn>
      <v-btn
          v-if="step === 4"
          color="red"
          class="float right"
          @click="closeDialog()"
      >
        Schließen
      </v-btn>
    </v-card-actions>
  </v-stepper>
</template>

<script>
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";

export default {
  components: {
    UploadImagesStep
  },
  data() {
    return {
      step: 1,
      selectedGender: null,
      isCommunityLiving: false,
      selectedDate: null,

      infosAppartment: [
        "title", "description", "availabelFrom", "availabelTill","location", "price", "area", "furniture", "community", "selectedGender"
      ],
      infosContact: [
        "name", "mobil", "email"
      ],

      formData: {
        title: '',
        description: '',
        availabelFrom: '',
        availabelTill: '',
        location: '',
        price: '',
        area: '',
        furniture: false,
        community: false,
        selectedGender: '',
      },

      contactData: {
        name: '',
        mobil: '',
        email: '',
      },

      dictionary: {
        "title": "Titel:",
        "availabelFrom": "Von:",
        "availabelTill": "Bis:",
        "area": "Wohnfläche in m²:",
        "price": "Warmmiete in €:",
        "description": "Beschreibung:",
        "location": "Ort / Stadtteil:",
        "furniture": "Möbiliert:",
        "community": "WG Zimmer:",
        "selectedGender": "WG-Typ:",

        "name": "Vor- & Nachname:",
        "mobil": "Handynummer:",
        "email": "E-Mail:",
      },
    };
  },
  methods: {
    submitForm() {
      this.step++
    },
    moveToNextStep() {
      this.step++
    },
    closeDialog() {
      this.$emit("close-dialog", this.formData)
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
      for (const attribute of this.infosAppartment) {
        let value = this.formData[attribute];
        basicInfos.push({ label: this.dictionary[attribute], value: value });
      }
      return basicInfos;
    },
    extraInfos() {
      let extraInfos = [];
      for (const attribute of this.infosContact) {
        let value = this.contactData[attribute];
        extraInfos.push({ label: this.dictionary[attribute], value: value });
      }
      return extraInfos;
    },
  },
  watch: {
    isCommunityLiving(value) {
      // Clear the selection if the community living checkbox is unchecked
      if (!value) {
        this.formData.selectedGender = "";
      }
    },
  },
};
</script>