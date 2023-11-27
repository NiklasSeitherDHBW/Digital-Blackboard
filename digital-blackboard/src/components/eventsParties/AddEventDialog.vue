<template>
  <v-stepper
      v-model="step"
      :editable=true
      alt-labels
      class="sticky-stepper"
  >
    <v-stepper-header
      class="sticky-stepper-header"
    >
      <v-stepper-item
          title="Angaben zum Event"
          :value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
          subtitle="Optional"
          title="Fotos"
          :value="2"
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
          <v-card-text>
            <v-text-field
                label="Email"
                placeholder="john@google.com"
            ></v-text-field>
            <span class="text-caption text-grey-darken-1">
            Das ist die Email, welche zur Kontaktaufnahme den Interesenten zur Verfügung gestellt wird!
          </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
                label="Password"
                type="password"
            ></v-text-field>
            <v-text-field
                label="Confirm Password"
                type="password"
            ></v-text-field>
            <span class="text-caption text-grey-darken-1">
            Please enter a password for your account
          </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div
              class="pa-4 text-center"
          >
            <v-img
                class="mb-4"
                contain
                height="128"
                src="https://yt3.googleusercontent.com/OHp7wtYIU-VBDoPxa66Vm-2NLB7_dyccu8LuXdVZ9KWQXzaHjU5jEMkBtAfCxN4plfX3VlyKQg=s900-c-k-c0x00ffffff-no-rj"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Ihr Event wurde erfolgreich geteilt
            </h3>
            <span
                class="text-caption text-grey"
            >
              Danke, dass du das Digital Blackboard nutzt!
            </span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
            v-if="step > 1 && step < 3"
            variant="text"
            @click="step--"
        >
          Zurück
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            v-if="step < 2"
            color="red"
            variant="flat"
            class="float right"
            @click="step++"
        >
          Nächste
        </v-btn>

        <v-btn
            v-if="step === 2"
            color="red"
            variant="flat"
            class="float right"
            @click="step++"
        >
          Event teilen
        </v-btn>

        <v-btn
            v-if="step === 3"
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


<script>
export default {
  data: () => ({
    step: 1,
    selectedImages: [],
  }),
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
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
  },
  computed: {
    currentTitle () {
      switch (this.step) {
        case 1: return 'Infos zum Event'
        case 2: return 'Fotos'
        default: return 'Event erfolgreich geteilt'
      }
    },
  },
};
</script>

<style>
.sticky-stepper {
  position: sticky;
  overflow: visible;
}

.sticky-stepper-header {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>