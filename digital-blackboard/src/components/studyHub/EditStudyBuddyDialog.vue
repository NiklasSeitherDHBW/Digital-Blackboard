<template>
  <v-stepper
      v-model="step"
      alt-labels
  >
    <v-stepper-header class="fixed-header">
      <v-stepper-item
          :title="mobile ? '' : 'Angaben zum Buddy'"
          :icon="mobile ? 'mdi-text-box-outline' : ''"
          :value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          :title="mobile ? '' : 'Fotos'"
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

    <v-stepper-window>
      <v-card-title
          class="text-h6 font-weight-regular justify-space-between pa-2"
      >
        <span>
          {{ currentTitle }}
        </span>
      </v-card-title>

      <v-window
          v-model="step"
      >
        <v-window-item
            :value="1"
        >
          <v-form
              @submit.prevent>
            <v-card-text>
              <v-text-field
                  label="Titel des Buddys *"
                  variant="outlined"
                  class="mt-2"
                  maxlength="50"
                  v-model="buddyData.title"
                  :rules="titleRules"
                  counter
                  required
              ></v-text-field>

              <v-text-field
                  label="Beschreibung"
                  variant="outlined"
                  maxlength="200"
                  v-model="buddyData.description"
                  counter
              ></v-text-field>

              <v-text-field
                  label="Preis pro Stunde *"
                  prefix="€"
                  variant="outlined"
                  v-model="buddyData.price"
                  :rules="numRules"
              ></v-text-field>

              <v-text-field
                  label="Fächer *"
                  variant="outlined"
                  :rules="generalRules"
                  v-model="buddyData.subject"
              ></v-text-field>

              <v-text-field
                  label="Verfügbarkeit"
                  placeholder="Nach Absprache"
                  variant="outlined"
                  v-model="buddyData.availability"
              ></v-text-field>

            </v-card-text>
            <v-card-actions>
              <v-btn
                  color="red"
                  class="mr-2 mb-2"
                  variant="outlined"
                  @click="exitDialog()"
              >
                Schließen
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  color="red"
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
                color="red"
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
              <!--Nur sichtbar solange man sich auf der 3. Seite befindet, validiert den auf Seite 3 getätigten Input -->
              <v-btn
                  color="red"
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

        <v-window-item :value="4">
          <div
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
            >Danke, dass Sie das "Digital Blackboard" nutzen!</span>
          </div>

          <v-card
              class="ma-1"
              variant="outlined"
          >
            <v-card-title>Angaben zum Buddy</v-card-title>

            <v-card-text>
              <v-row
                  v-for="item in eventInfos"
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
            <!--Nur sichtbar solange man sich auf der letzten Seite befindet, übergibt die Inputdaten -->
            <v-btn
                color="red"
                class="float right"
                variant="outlined"
                type="submit"
                @click="closeDialog"
            >
              Inserat teilen
            </v-btn>
          </v-card-actions>
        </v-window-item>
      </v-window>
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
  data: () => ({
    step: 1,
    selectedImages: [],

    infosEvent: [
      "title", "description", "price", "subject", "availability"
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
      (value) => /\d+$/.test(value) ? true : 'Die angegebene Information darf nur Zahlen (0-9) beinhalten!',
    ],

    nameRules : [
      (value) => value ? true : 'Bitte gebe einen Vor- und Nachnamen an!',
      (value) => value.length >= 3 ? true : 'Der Name muss mindestens 3 Zeichen lang sein!',
    ],
    phoneRules : [
      (value) => value ? true : 'Bitte gebe eine Telefonnummer an!',
      // regel zum erzwingen von + und numerischen Werten von mindestlänge 5
      (value) => /^\+?\d+$/.test(value) ? true : 'Die Telefonnummer darf nur Zahlen und das Pluszeichen enthalten!',
      (value) => value.length >= 5 ? true : 'Die Telefonnummer muss mindestens 5 Zeichen lang sein!',
    ],
    emailRules : [
      (value) => value ? true : 'Bitte gebe eine E-Mail-Adresse an!',
      // regel zum erzwingen einer validen E-mail Adresse: aaa@bbb.ccc
      (value) => /\S+@\S+\.\S+/.test(value) ? true : 'Die E-Mail-Adresse ist ungültig!',
    ],

    buddyData: {
      title: '',
      description: '',
      price: '',
      subject: '',
      availability: '',
      category: 'buddy',
      rating: '',
      userId: 1,
    },

    contactData: {
      name: '',
      phone: '',
      email: '',
    },

    dictionary: {
      "title": "Titel:",
      "description": "Beschreibung:",
      "price": "Preis pro Stunde in €:",
      "subject": "Fächer:",
      "availability": "Verfügbarkeit:",
      "name": "Vor-/Nachname",
      "phone": "Telefon:",
      "email": "E-Mail",
    },
  }),

  methods: {
    validateDataForm() {
      // kritische Daten werden durch rules validiert, wenn alle felder richtig ausgefüllt werden kann die nächste seite erreich werden
      const isValid = this.validateFields([
        { value: this.buddyData.title, rules: this.titleRules },
        { value: this.buddyData.subject, rules: this.generalRules },
        { value: this.buddyData.price, rules: this.numRules },
      ]);  console.log(isValid)
      if (isValid) {
        return this.step++
      }
    },

    validateContactForm() {
      const isValid = this.validateFields([
        { value: this.contactData.name, rules: this.nameRules },
        { value: this.contactData.email, rules: this.emailRules },
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
    onFileChange() {
      this.selectedImages = this.selectedImages.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
    },
    deleteImage(index) {
      this.selectedImages.splice(index, 1);
    },
    uploadImages() {
      this.selectedImages.forEach((image) => {
        if (image.file instanceof Blob) {
          console.log('Uploading:', image.url);
        }
      });
    },
    exitDialog() {
      // der das Dialogfenster wird geschlossen, das close-Dialog Event des Parent wird ausgeführt, Nutzerdaten/ -bilder werden übergeben
      this.$emit("exit-dialog")
    },
    closeDialog() {
      // der das Dialogfenster wird geschlossen, das close-Dialog Event des Parent wird ausgeführt, Nutzerdaten/ -bilder werden übergeben
      this.$emit("close-dialog", this.$refs.uploadImagesForm.imagePreviews, this.buddyData, this.contactData)
    }
  },
  computed: {
    currentTitle () {
      // einzelnen Schritte des Steppers
      switch (this.step) {
        case 1: return 'Informationsangaben';
        case 2: return 'Fotos';
        case 3: return 'Kontaktdaten';
        case 4: return 'Zusammenfassung';
        default: return 'Information wurde erfolgreich geteilt!';
      }
    },
    eventInfos() {
      // iteriert über alle buddyData Attribute und deren titel aus dictionary um diese als Preview anzuzeigen
      let eventInfos = [];
      for (const attribute of this.infosEvent) {
        let value = this.buddyData[attribute];
        eventInfos.push({ label: this.dictionary[attribute], value: value });
      }
      return eventInfos;
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

    this.buddyData = {
      title: this.item.title,
      description: this.item.description,
      price: this.item.price,
      subject: this.item.subject,
      availability: this.item.availability,
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
