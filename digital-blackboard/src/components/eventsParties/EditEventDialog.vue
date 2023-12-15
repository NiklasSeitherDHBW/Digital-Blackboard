<template>
  <v-stepper
      v-model="step"
      alt-labels
  >
    <v-stepper-header class="fixed-header">
      <v-stepper-item
          :title="mobile ? '' : 'Angaben zum Event'"
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
          :title="mobile ? '' : 'Zusammenfassung'"
          :icon="mobile ? 'mdi-checkbox-marked-circle-outline' : ''"
          :value="3"
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
            <!-- Form für den Input des Users -> v-model, und Eingabehinweise -> prefix, rules, placeholder -->
            <v-card-text>
              <v-text-field
                  label="Name des Events *"
                  variant="outlined"
                  class="mt-2"
                  maxlength="50"
                  v-model="eventData.title"
                  :rules="titleRules"
                  counter
                  required
              ></v-text-field>

              <v-text-field
                  label="Beschreibung"
                  variant="outlined"
                  maxlength="200"
                  v-model="eventData.description"
                  counter
              ></v-text-field>

              <v-text-field
                  label="Datum *"
                  placeholder="TT.MM.JJJJ"
                  variant="outlined"
                  type="date"
                  :rules="dateRules"
                  v-model="eventData.date"
              ></v-text-field>

              <v-text-field
                  label="Ort *"
                  placeholder="Coblitzallee 1-9, 68163 Mannheim"
                  variant="outlined"
                  :rules="generalRules"
                  v-model="eventData.location"
              ></v-text-field>

              <v-text-field
                  label="Zielgruppe *"
                  variant="outlined"
                  :rules="generalRules"
                  v-model="eventData.community"
              ></v-text-field>

              <v-text-field
                  label="Preis p.p. *"
                  variant="outlined"
                  prefix="€"
                  :rules="numRules"
                  v-model="eventData.price"
              ></v-text-field>

              <v-text-field
                  label="maximale Teilnehmeranzahl"
                  variant="outlined"
                  v-model="eventData.maxParticipantsLimit"
              ></v-text-field>
            </v-card-text>
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

        <v-window-item :value="3">
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
            <v-card-title>Angaben zum Event</v-card-title>
            <!-- Preview der angegebenen Informationen -->
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
                  color="#eb1b2a"
                  class="float right"
                  variant="outlined"
                  type="submit"
                  @click="closeDialog"
              >
                Event teilen
              </v-btn>
            </v-card-actions>
          </v-card>
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
      "title", "description", "date", "location", "price", "community", "maxParticipantsLimit"
    ],

    titleRules: [
      // es muss etwas ins Feld eingegeben werden, min länge 3 Zeichen
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
      // nur Zahlen werden erlaubt
      (value) => /\d+$/.test(value) ? true : 'Die angegebene Information darf nur Zahlen (0-9) beinhalten!',
    ],

    eventData: {
      title: '',
      description: '',
      date: '',
      location: '',
      price: '',
      community: '',
      maxParticipantsLimit: 1,
      category: 'Events',
      userId: 1,
    },

    dictionary: {
      "title": "Titel:",
      "description": "Beschreibung:",
      "date": "Wann:",
      "location": "Wo:",
      "price": "Preis in €:",
      "community": "Zielgruppe:",
      "maxParticipantsLimit": "Max. Anzahl Teilnehmer"
    },
  }),

  methods: {
    // kritische Eventdaten werden durch rules validiert, wenn alle felder richtig ausgefüllt werden kann die nächste seite erreich werden
    validateDataForm() {
      const isValid = this.validateFields([
        { value: this.eventData.title, rules: this.titleRules },
        { value: this.eventData.location, rules: this.generalRules },
        { value: this.eventData.date, rules: this.dateRules},
        { value: this.eventData.price, rules: this.numRules },
        { value: this.eventData.community, rules: this.generalRules },

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
      // der das Dialogfenster wird geschlossen, das exit-Dialog Event des Parent wird ausgeführt, Nutzerdaten/ -bilder werden übergeben
      this.$emit("exit-dialog")
    },
    // der das Dialogfenster wird geschlossen, das close-Dialog Event des Parent wird ausgeführt, Nutzerdaten/ -bilder werden übergeben
    closeDialog() {
      this.$emit("close-dialog", this.$refs.uploadImagesForm.imagePreviews, this.eventData)
    }
  },
  computed: {
    // einzelnen Schritte des Steppers
    currentTitle () {
      switch (this.step) {
        case 1: return 'Angaben zum Event';
        case 2: return 'Fotos';
        case 3: return 'Zusammenfassung';
        default: return 'Event wurde erfolgreich geteilt!';
      }
    },
    eventInfos() {
      // iteriert über alle eventData Attribute und deren titel aus dictionary um diese als Preview anzuzeigen
      let eventInfos = [];
      for (const attribute of this.infosEvent) {
        let value = this.eventData[attribute];
        eventInfos.push({ label: this.dictionary[attribute], value: value });
      }
      return eventInfos;
    },
  },
  mounted() {
    let partsFrom = this.item.date.split(".")

    this.eventData = {
      title: this.item.title,
      description: this.item.description,
      date: partsFrom[2] + "-" + partsFrom[1] + "-" + partsFrom[0],
      location: this.item.location,
      price: this.item.price,
      community: this.item.community,
      maxParticipantsLimit: this.item.max_participants_limit,
      images: this.item.images,
      date_created: this.item.date_created,
      userId: this.item.userId,
      likes: this.item.likes,
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

