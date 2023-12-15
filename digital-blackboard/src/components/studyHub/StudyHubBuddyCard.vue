<template>

  <CustomCard
      class="text-left"
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      action="Kontaktieren"
      @action-clicked="showDialogContactInfo=true"
      @editAdClicked="openDialogEditAd"
      :customClick="createShareLink"
      @deleteAd="showDialogConfirm=true"

  >
    <template v-slot:bottomBasicInfos>

      <div v-if="item.category !== 'group'">

        <v-rating
            readonly
            color="#7C868DFF"
            active-color="#eb1b2a"
            density="comfortable"
            class="pt-2"
            :model-value="item.rating"
        >
        </v-rating>

      </div>

    </template>

  </CustomCard>

  <v-dialog
      v-model="showDialogContactInfo"
      transition="dialog-bottom-transition"
      max-width="1200px"
      class="justify-center"
  >
    <ContactCard
        :name="item.name"
        :course="item.subject"
        :phone="item.phone"
        :email="item.email"
        @close-dialog="showDialogContactInfo=false"
    ></ContactCard>

  </v-dialog>

  <v-dialog
      v-model="showDialogEditAd"
      transition="dialog-bottom-transition"
      class="justify-center"
      :style="{ maxWidth: mobile ? '100%' : '60%' }"
  >
    <EditStudyBuddyDialog
        :item="item"
        @exit-dialog="exitDialogEditAd"
        @close-dialog="closeDialogEditAd"
    ></EditStudyBuddyDialog>

  </v-dialog>

  <v-dialog
      v-model="showDialogConfirm"
      transition="dialog-bottom-transition"
      class="justify-center"
      max-width="500px"
  >
    <ConfirmDialog
        :title="item.title"
        @confirmedDeletion="deleteAdClicked"
        @cancelDeletion="exitDialogConfirm"
    ></ConfirmDialog>

  </v-dialog>

  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ snackbarText }}

    <template v-slot:actions>

      <v-btn
          color="#eb1b2a"
          variant="text"
          float-right
          size="small"
          class="mr-1"
          @click="closeSnackbar"
      >
        Schließen
      </v-btn>

    </template>

  </v-snackbar>

</template>

<script setup>
import CustomCard from "@/components/util/CustomCard.vue";
import EditStudyBuddyDialog from "@/components/studyHub/EditStudyBuddyDialog.vue";
import ContactCard from "@/components/util/ContactCard.vue"
import ConfirmDialog from "@/components/util/ConfirmDialog.vue";

import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
import {deleteAd, editAdStudyBuddy} from "@/db";

export default {

  props: {
    item: Object,
    action: String,
  },

  data() {
    return {
      snackbarText: "",
      snackbar: false,
      timeout: 3000,

      showAll: false,
      showDialogConfirm: false,
      showDialogImagesFullscreen: false,
      showDialogContactInfo: false,
      showDialogEditAd: false,

      basicInfosKeywords: [
        "price", "subject"
      ],

      extraInfosKeywords: [
        "description", "availability",
      ],

      dictionary: {
        "availability": "Verfügbarkeit",
        "price": "Preis pro Stunde in €",
        "description": "Beschreibung",
        "subject": "Fächer",
      },
    };
  },
  methods: {
    /**
     * Is the custom link share function for StudyHub. Due to different categories,
     * the link consists of the base URL, the adType, the item's Id, and their category within the adType.
     * The link is copied to the user's clipboard.
     *
     * @method
     */
    createShareLink() {
      const link = window.location.origin + '/studyhub' + '?card=' + this.item.id + "&selectedCategory=" + this.item.categories;
      // Copy the link to the clipboard
      navigator.clipboard.writeText(link);
      // The Snackbar is assigned a special Text and then called
      this.snackbarText = "Der Link wurde in deine Zwischenablage kopiert!";
      this.snackbar = true;
    },

    /**
     * Method to close the Snackbar.
     *
     * @method
     */
    closeSnackbar() {
      this.snackbar = false;
    },

    /**
     * Method to open the edit ad dialog.
     *
     * @method
     */
    openDialogEditAd() {
      this.showDialogEditAd = true;
    },

    /**
     * Asynchronously exits the edit ad dialog.
     *
     * @method
     */
    async exitDialogEditAd() {
      this.showDialogEditAd = false;
    },

    /**
     * Asynchronously closes the edit ad dialog, displays a success message in a Snackbar,
     * and emits an event to trigger the items to reload after change.
     *
     * @method
     */
    async closeDialogEditAd(buddyData, images, contactData) {
      this.showDialogEditAd = false;

      buddyData["category"] = this.item.category;
      buddyData["rating"] = this.item.rating;

      await editAdStudyBuddy(this.item.id, buddyData, images, contactData)

      this.snackbarText = "Ihr Inserat wurde erfolgreich geändert!"

      this.snackbar = true;
      this.$emit("itemsChanged")
    },

    /**
     * Asynchronously exits the confirm dialog.
     *
     * @method
     */
    async exitDialogConfirm() {
      this.showDialogConfirm = false;
    },

    /**
     * Asynchronously deletes the ad, hides the confirm dialog, displays a success message in a Snackbar,
     * and emits an event to trigger the items to reload after change..
     *
     * @method
     */
    async deleteAdClicked() {
      this.showDialogConfirm = false;

      await deleteAd("study-hub", this.item.id)

      this.snackbarText = "Ihr Inserat wurde erfolgreich gelöscht!"
      this.snackbar = true;
      this.$emit("itemsChanged")
    },
  },

  computed: {
    /**
     * Computed property that generates an array of basic information objects for display.
     *
     * @computed
     * @returns {Object[]} - An array of basic information objects with label and value properties.
     */
    basicInfos() {
      return this.basicInfosKeywords.map((attribute) => ({
        label: this.dictionary[attribute],
        value: this.item[attribute],
      }));
    },

    /**
     * Computed property that generates an array of extra information objects for display.
     *
     * @computed
     * @returns {Object[]} - An array of extra information objects with label and value properties.
     */
    extraInfos() {
      return this.extraInfosKeywords.map((attribute) => ({
        label: this.dictionary[attribute],
        value: this.item[attribute],
      }));
    },
  },
};
</script>

<style>

</style>