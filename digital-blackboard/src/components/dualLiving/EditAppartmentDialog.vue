<template>
  <v-stepper
      v-model="step"
      alt-labels
  >
    <v-stepper-header class="fixed-header">
      <v-stepper-item
          :title="mobile ? '' : 'Angaben zu der Wohnung'"
          :icon="mobile ? 'mdi-text-box-outline' : ''"
          :value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          :title="mobile ? '' : 'Fotos des Objektes'"
          :subtitle="mobile ? '' : 'Optional'"
          :icon="mobile ? 'mdi-image-outline' : ''"
          :value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          :title="mobile ? '' : 'Kontaktdaten'"
          :value="3"
          :icon="mobile ? 'mdi-account-box' : ''"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          :title="mobile ? '' : 'Zusammenfassung'"
          :icon="mobile ? 'mdi-checkbox-marked-circle-outline' : ''"
          :value="4"
      ></v-stepper-item>
    </v-stepper-header>

    <v-stepper-window
        v-model="step"
    >
      <v-card-title
          class="text-h6"
      >
        <span>
          {{ currentTitle }}
        </span>
      </v-card-title>

      <v-window-item
          :value="1"
      >
        <v-form
            @submit.prevent
        >
          <!-- Form für den Input des Users -> v-model, und Eingabehinweise -> prefix, rules, placeholder -->
          <v-text-field
              class="mt-2"
              label="Titel des Inserats *"
              variant="outlined"
              v-model="formData.title"
              :rules="titleRules"
              maxlength="60"
              counter
              required
          ></v-text-field>

          <v-textarea
              label="Beschreibung"
              variant="outlined"
              v-model="formData.description"
              maxlength="300"
              counter
          ></v-textarea>

          <v-row>
            <v-col :cols="mobile ? '12' : '6'">
              <v-text-field
                  label="Von *"
                  placeholder="TT.MM.JJJJ"
                  type="date"
                  :min="new Date().toISOString().split('T')[0]"
                  :max="formData.availableTill"
                  v-model="formData.availableFrom"
                  :rules="dateRules"
                  variant="outlined"
                  required
              >
              </v-text-field>
            </v-col>
            <v-col :cols="mobile ? '12' : '6'">
              <v-text-field
                  label="Bis"
                  placeholder="TT.MM.JJJJ"
                  type="date"
                  :min="formData.availableFrom"
                  v-model="formData.availableTill"
                  :rules="dateRules"
                  variant="outlined"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-text-field
              label="Ort *"
              placeholder="Mannheim Neuostheim"
              variant="outlined"
              v-model="formData.location"
              :rules="generalRules"
              required
          ></v-text-field>

          <v-text-field
              label="monatliche Miete *"
              variant="outlined"
              prefix="€"
              v-model="formData.price"
              :rules="numRules"
              required
          ></v-text-field>

          <v-text-field
              label="Wohnfläche *"
              variant="outlined"
              prefix="m²"
              v-model="formData.area"
              :rules="numRules"
              required
          ></v-text-field>

          <v-text-field
              label="Anzahl Zimmer *"
              variant="outlined"
              v-model="formData.rooms"
              :rules="numRules"
              required
          ></v-text-field>

          <v-checkbox
              v-model="formData.furniture"
              label="möbliert"
          ></v-checkbox>

          <v-checkbox
              v-model="formData.community"
              label="WG"
          ></v-checkbox>

          <v-select
              v-if="formData.community"
              :rules="generalRules"
              required
              v-model="formData.selectedGender"
              variant="outlined"
              :items="['Jungs', 'Mädchen', 'Gemischt']"
              label="bevorzugtes Geschlecht *"
          ></v-select>

          <v-card-actions>
            <v-btn
                color="#eb1b2a"
                class="mr-2 mb-2"
                variant="outlined"
                @click="exitDialog()"
            >
              Schließen
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                color="#eb1b2a"
                class="mr-2 mb-2"
                type="submit"
                variant="outlined"
                @click="validateDataForm()"
            >
              Nächste
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-window-item>

      <v-window-item
          :value="2"
      >
        <UploadImagesStep
            ref="uploadImagesForm"
            :preloadImages="item.images"
        ></UploadImagesStep>
        <v-card-actions>
          <v-btn
              variant="outlined"
              @click="step--"
          >
            Zurück
          </v-btn>

          <v-spacer></v-spacer>
          <v-btn
              color="#eb1b2a"
              class="float right"
              type="submit"
              variant="outlined"
              @click="step++"
          >
            Nächste
          </v-btn>
        </v-card-actions>
      </v-window-item>

      <v-window-item
          :value="3"
      >
        <v-form
            @submit.prevent>
          <v-text-field
              label="Vor-/Nachname *"
              placeholder="Maxime Musterfrau"
              variant="outlined"
              class="mt-2"
              :rules="nameRules"
              v-model="contactData.name"
          ></v-text-field>

          <v-text-field
              label="Telefon"
              placeholder="+49123456789"
              variant="outlined"
              type="tel"
              :rules="phoneRules"
              v-model="contactData.phone"
          ></v-text-field>

          <v-text-field
              label="E-Mail *"
              placeholder="john@google.com"
              variant="outlined"
              type="email"
              :rules="emailRules"
              v-model="contactData.email"
          ></v-text-field>
          <span
              class="text-caption text-grey-darken-1"
          >
              Diese Daten werden Interessenten zur Verfügung gestellt um Kontakt aufzunehmen.
        </span>
          <v-card-actions>
            <v-btn
                variant="outlined"
                @click="step--"
            >
              Zurück
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                color="#eb1b2a"
                class="float right"
                type="submit"
                variant="outlined"
                @click="validateContactForm()"
            >
              Zusammenfassung
            </v-btn>
          </v-card-actions>
        </v-form>

      </v-window-item>

      <v-window-item
          :value="4"
      >
        <v-container
            class="pa-4 text-center"
        >
          <v-img
              class="mb-4"
              contain
              height="128"
              src="https://firebasestorage.googleapis.com/v0/b/digital-blackboard-dhbw.appspot.com/o/dhbw-logo-small.jpg?alt=media"
          ></v-img>
          <h3 class="text-h6 font-weight-light mb-2">
            Noch ein letzter Check das alles passt!
          </h3>
          <span
              class="text-caption text-grey"
          >
            Danke, dass Sie das "Digital Blackboard" nutzen!
          </span>
        </v-container>

        <v-card
            class="ma-1"
            variant="outlined"
        >
          <v-card-title>Immobilienangaben</v-card-title>

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
                <p
                    v-if="item && typeof item.value === 'boolean'"
                >
                  <v-icon>{{ item.value ? 'mdi-check' : 'mdi-close' }}</v-icon>
                </p>

                <p
                    v-else
                >
                  {{ item.value }}
                </p>

              </v-col>
            </v-row>
          </v-card-text>

          <v-divider
              style="width: 85%; margin: 10px;"
          ></v-divider>

          <v-card-title>Kontaktdaten</v-card-title>

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
        <v-card-actions>
          <v-btn
              variant="outlined"
              @click="step--"
          >
            Zurück
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
              color="#eb1b2a"
              class="float right"
              variant="outlined"
              type="submit"
              @click="closeDialog"
          >
            Inserat teilen
          </v-btn>
        </v-card-actions>
      </v-window-item>
    </v-stepper-window>
  </v-stepper>
</template>

<script setup>
import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
import UploadImagesStep from "@/components/util/UploadImagesStep.vue";

export default {
  props: {
    item: Object,
  },
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
        "title", "description", "availableFrom", "availableTill", "location", "price", "rooms", "area", "furniture", "community", "selectedGender",
      ],
      infosContact: [
        "name", "phone", "email"
      ],
      // regeln zum validieren des Inputs
      titleRules: [
        (value) => value ? true : 'Bitte gebe einen Titel für dein Inserat an!',
        (value) => value.length >= 3 ? true : 'Der Name muss mindestens 3 Zeichen lang sein!',
      ],
      generalRules: [
        (value) => value ? true : 'Bitte gebe weitere Informationen an!'
      ],
      dateRules: [
        (value) => value ? true : 'Bitte wähle ein Datum aus!'
      ],
      numRules: [
        (value) => value ? true : 'Bitte gebe weitere Informationen an!',
        // regel zum erzwingen von numerischen Werten
        (value) => /\d+$/.test(value) ? true : 'Die angegebene Information darf nur Zahlen (0-9) beinhalten!',
      ],

      nameRules: [
        (value) => value ? true : 'Bitte gebe einen Vor- und Nachnamen an!',
        (value) => value.length >= 3 ? true : 'Der Name muss mindestens 3 Zeichen lang sein!',
      ],
      phoneRules: [
        (value) => value ? true : 'Bitte gebe eine Telefonnummer an!',
        // regel zum erzwingen von + und numerischen Werten
        (value) => /^\+?\d+$/.test(value) ? true : 'Die Telefonnummer darf nur Zahlen und das Pluszeichen enthalten!',
        (value) => value.length >= 5 ? true : 'Die Telefonnummer muss mindestens 5 Zeichen lang sein!',
      ],
      emailRules: [
        (value) => value ? true : 'Bitte gebe eine E-Mail-Adresse an!',
        // regel zum erzwingen einer validen E-mail Adresse: aaa@bbb.ccc
        (value) => /\S+@\S+\.\S+/.test(value) ? true : 'Die E-Mail-Adresse ist ungültig!',
      ],

      formData: {
        title: '',
        description: '',
        availableFrom: '',
        availableTill: '',
        location: '',
        price: '',
        area: '',
        furniture: false,
        community: false,
        rooms: '',
        selectedGender: '',
        images: [],
        date_created: '',
        userId: 1,
      },

      contactData: {
        name: '',
        phone: '',
        email: '',
      },

      dictionary: {
        "title": "Titel:",
        "availableFrom": "Von:",
        "availableTill": "Bis:",
        "area": "Wohnfläche in m²:",
        "price": "Warmmiete in €:",
        "description": "Beschreibung:",
        "location": "Ort / Stadtteil:",
        "furniture": "möbiliert:",
        "community": "WG-Zimmer:",
        "selectedGender": "WG-Typ:",
        "rooms": 'Zimmer:',

        "name": "Vor-/Nachname:",
        "phone": "Handynummer:",
        "email": "E-Mail:",
      },
    };
  },
  methods: {
    validateDataForm() {
      let validation_list = [
        {value: this.formData.title, rules: this.titleRules},
        {value: this.formData.location, rules: this.generalRules},
        {value: this.formData.availableFrom, rules: this.dateRules},
        {value: this.formData.availableTill, rules: this.dateRules},
        {value: this.formData.price, rules: this.numRules},
        {value: this.formData.area, rules: this.numRules},
        {value: this.formData.rooms, rules: this.numRules},
      ]

      if (this.formData.community) {
        validation_list.push({value: this.formData.selectedGender, rules: this.generalRules});
      }

      // kritische Daten werden durch rules validiert,
      // wenn alle felder richtig ausgefüllt werden kann die nächste seite erreich werden
      const isValid = this.validateFields(validation_list);

      if (isValid) {
        // Zu nächster Seite gehen wenn alle Felder valide sind
        return this.step++
      }
    },
    validateContactForm() {
      const isValid = this.validateFields([
        {value: this.contactData.name, rules: this.nameRules},
        {value: this.contactData.email, rules: this.emailRules},
      ]);
      if (isValid) {
        return this.step++
      }
    },
    validateFields(fields) {
      // Überprüfe jede Regel für jedes Feld
      for (const field of fields) {
        for (const rule of field.rules) {
          const isValid = rule(field.value);
          if (isValid !== true) {
            // Wenn die Regel nicht erfüllt ist, zeige die Fehlermeldung an
            console.error(isValid);
            return false;
          }
        }
      }
      return true; // Alle Regeln wurden erfüllt => nächste Seite
    },

    exitDialog() {
      // der das Dialogfenster wird geschlossen, das close-Dialog Event des Parent wird ausgeführt, Nutzerdaten/ -bilder werden übergeben
      this.$emit("exit-dialog")
    },

    closeDialog() {
      // der das Dialogfenster wird geschlossen, das close-Dialog Event des Parent wird ausgeführt, Nutzerdaten/ -bilder werden übergeben
      this.$emit("close-dialog", this.formData, this.$refs.uploadImagesForm.imagePreviews, this.contactData)
    },
  },
  computed: {
    currentTitle() {
      // einzelnen Schritte des Steppers
      switch (this.step) {
        case 1:
          return "Angaben zu der Wohnung";
        case 2:
          return "Fotos des Objektes";
        case 3:
          return "Deine Kontaktdaten";
        default:
          return "Inserat erstellt";
      }
    },
    basicInfos() {
      // iteriert über alle formData Attribute und deren titel aus dictionary um diese als Preview anzuzeigen
      let basicInfos = [];
      for (const attribute of this.infosAppartment) {
        let value = this.formData[attribute];
        basicInfos.push({label: this.dictionary[attribute], value: value});
      }
      return basicInfos;
    },
    extraInfos() {
      // iteriert über alle contactData Attribute und deren titel aus dictionary um diese als Preview anzuzeigen
      let extraInfos = [];
      for (const attribute of this.infosContact) {
        let value = this.contactData[attribute];
        extraInfos.push({label: this.dictionary[attribute], value: value});
      }
      return extraInfos;
    },
  },
  mounted() {
    let partsFrom = this.item.available_from.split(".")
    let partsTill = this.item.available_until.split(".")
    let communityParts = this.item.community.split(" - ")

    this.formData = {
      title: this.item.title,
      description: this.item.description,
      availableFrom: partsFrom[2] + "-" + partsFrom[1] + "-" + partsFrom[0],
      availableTill: partsTill[2] + "-" + partsTill[1] + "-" + partsTill[0],
      location: this.item.location,
      price: this.item.price,
      area: this.item.area,
      furniture: this.item.furniture === "Ja" ? true : false,
      community: communityParts.length > 1 ? true : false,
      rooms: this.item.rooms,
      selectedGender: communityParts.length > 1 ? communityParts[1] : "",
      images: this.item.images,
      date_created: this.item.date_created,
      userId: this.item.userId,
    }

    this.contactData = {
      name: this.item.name,
      phone: this.item.phone,
      email: this.item.email,
    }
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

<style scoped>
.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; /* Adjust the z-index as needed */
  background-color: white; /* Adjust the background color as needed */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better visibility */
  /* Additional styles as needed */
}

/* Add padding to the content below the fixed header */
.v-stepper-window {
  padding-top: 60px; /* Adjust the value based on the height of your fixed header */
}
</style>
