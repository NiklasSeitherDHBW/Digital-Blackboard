<template>

  <CustomCard
      ref="customCard"
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      :action="item.joined ? 'Beigetreten' : 'Beitreten'"
      :actionBackground="item.joined ? '#7C868DFF' : '#eb1b2a'"
      @action-clicked="joinGroup(item)"
      :customClick="createShareLink"
      @editAdClicked="openDialogEditAd"
      @deleteAd="showDialogConfirm=true"

  ></CustomCard>

  <v-dialog
      v-model="showDialogEditAd"
      transition="dialog-bottom-transition"
      class="justify-center"
  >
    <EditStudyHubDialog
        :item="item"
        @exit-dialog="exitDialogEditAd"
        @close-dialog="closeDialogEditAd"
    ></EditStudyHubDialog>

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
          color="red"
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
import EditStudyHubDialog from "@/components/studyHub/EditStudyHubGroup.vue";
import ConfirmDialog from "@/components/util/ConfirmDialog.vue";
</script>

<script>
import {db, deleteAd} from "@/db";
import {doc, getDoc, setDoc} from "firebase/firestore";
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
      showDialogEditAd: false,

      basicInfosKeywords: [
          "subject", "members"
      ],

      extraInfosKeywords: [
          "description", "activities"
      ],

      dictionary: {
        members: "Mitglieder",
        activities: "Aktivitäten",
        description: "Beschreibung",
        subject: "Was erwartet dich?",
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
      this.snackbarText = "Ihr Inserat wurde erfolgreich geteilt!"
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
     * Asynchronously joins or leaves a study group based on the current safed state of the button.
     *
     * @method
     * @param {Object} item - The study group item to join or leave.
     * @property {string} item.id - The unique identifier of the study group.
     */
    async joinGroup(item) {
      // Creating a reference to the document in the "study-hub" collection with the provided item's ID.
      const docRef = doc(db, "study-hub", item.id)
      // Retrieving the document snapshot asynchronously.
      const docSnap = await getDoc(docRef)

      // Extracting data from the document snapshot.
      const data = docSnap.data()
      // Toggling the "joined" property in the data.
      data["joined"] = !data["joined"]

      // Adjusting the "members" count based on whether the user joined or left the study group.
      if (data["joined"]) {
        data["members"] = data["members"] + 1
      } else {
        data["members"] = data["members"] - 1
      }

      // Overwriting the current value of the document with the updated data.
      await setDoc(docRef, data, {merge: true})

      // Emitting an event to trigger Event that the items are reloaded.
      this.$emit("itemChanged");
    },

    /**
     * Method to open the edit ad dialog.
     *
     * @method
     */
    openDialogEditAd() {
      console.log(this.item);
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
    async closeDialogEditAd() {
      this.showDialogAddStudyHub = false;
      this.snackbarText = "Ihr Inserat wurde erfolgreich erstellt!"
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
     * and emits an event to trigger the items to reload after change.
     *
     * @method
     */
    async deleteAdClicked() {
      this.showDialogConfirm = false;
      await deleteAd("study-hub", this.item.id);
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
