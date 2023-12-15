<template>

  <CustomCard
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      :action="item.joined ? 'Angefragt' : 'Mitmachen'"
      :actionBackground="item.joined ? '#7C868DFF' : '#eb1b2a'"
      :showActionButton="item.category !== 'Infos'"
      :customClick="createShareLink"
      @action-clicked="joinEvent(item)"
      @editAdClicked="editAdClicked"
      @deleteAd="showDialogConfirm=true"
  >
    <template v-slot:bottomBasicInfos>

      <div v-if="item.category !== 'Infos'"
           class="d-flex pt-2"
      >

        <v-btn
            variant="text"
            icon
            @click="likeEvent(item)"
        >

          <v-icon
              v-if="item.liked"
              color="#EB1B2A"
              size="30"
          >
            mdi-heart
          </v-icon>

          <v-icon
              v-if="!item.liked"
              color="#7C868DFF"
              size="30"
          >
            mdi-heart-outline
          </v-icon>

        </v-btn>

        <p class="pl-2">{{ item.likes }}</p>

      </div>

    </template>

  </CustomCard>

  <v-dialog
      v-model="showDialogEditAd"
      transition="dialog-bottom-transition"
      class="justify-center"
      :style="{ maxWidth: mobile ? '100%' : '60%' }"
  >

    <EditEventDialog
        v-if="item.category === 'Events'"
        :item="item"
        @exit-dialog="exitDialogEditAd"
        @close-dialog="closeDialogEditEvent"
    ></EditEventDialog>

    <EditInfoDialog
        v-if="item.category === 'Infos'"
        :item="item"
        @exit-dialog="exitDialogEditAd"
        @close-dialog="closeDialogEditInfo"
    ></EditInfoDialog>

    <EditSeminarDialog
        v-if="item.category === 'Seminare'"
        :item="item"
        @exit-dialog="exitDialogEditAd"
        @close-dialog="closeDialogEditSeminar"
    ></EditSeminarDialog>

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
import CustomCard from "@/components/util/CustomCard.vue"
import EditEventDialog from "@/components/eventsParties/EditEventDialog.vue";
import EditInfoDialog from "@/components/eventsParties/EditInfoDialog.vue";
import EditSeminarDialog from "@/components/eventsParties/EditSeminarDialog.vue";
import ConfirmDialog from "@/components/util/ConfirmDialog.vue";

import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<script>
import {doc, getDoc, setDoc} from "firebase/firestore"
import {db, deleteAd, editAdEvents, editAdInfo, editAdSeminar} from "@/db"

export default {

  props: {
    item: Object,
  },

  data() {

    return {
      snackbar: false,
      snackbarText: "",
      timeout: 3000,

      showDialogConfirm: false,
      showDialogEditAd: false,

      dictionary: {
        "availability": "Anzahl Teilnehmer:",
        "price": "Preis p.p. in €:",
        "description": "Beschreibung:",
        "location": "Wo:",
        "community": "Zielgruppe:",
        "date": "Wann:",
      }
    };
  },

  methods: {
    /**
     * Creates a shareable link for the current item and copies it to the clipboard.
     * Also displays a Snackbar with a success message.
     *
     */
    createShareLink() {
      // Constructing the shareable link based on the current item's properties.
      const link =
          window.location.origin +
          '/events' +
          '?card=' +
          this.item.id +
          '&selectedCategory=' +
          this.item.category;

      // Copying the link to the clipboard.
      navigator.clipboard.writeText(link);

      // Assigning a success message to be displayed in the Snackbar.
      this.snackbarText = "Der Link wurde in deine Zwischenablage kopiert!";

      // Showing the Snackbar.
      this.snackbar = true;
    },
    /**
     * Closes the Snackbar.
     *
     */
    closeSnackbar() {
      // Hiding the Snackbar.
      this.snackbar = false;
    },
    /**
     * Asynchronously joins or leaves an event.
     *
     * @param {Object} item - The event item to join or leave.
     * @property {string} item.id - The unique identifier of the event.
     *
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async joinEvent(item) {
      // Creating a reference to the document in the "events-parties" collection with the provided item's ID.
      const docRef = doc(db, "events-parties", item.id);

      // Retrieving the document snapshot asynchronously.
      const docSnap = await getDoc(docRef);

      // Extracting data from the document snapshot.
      const data = docSnap.data();

      // Toggling the "joined" property in the data.
      data["joined"] = !data["joined"];

      // Adjusting the "members" count based on whether the user joined or left the event.
      if (data["joined"]) {
        data["members"] = data["members"] + 1;
      } else {
        data["members"] = data["members"] - 1;
      }

      // Overwriting the current value of the document with the updated data.
      await setDoc(docRef, data, { merge: true });

      // Emitting an event to trigger the items to reload after change.
      this.$emit("itemChanged");
    },

    /**
     * Asynchronously toggles the like status of an event and updates the database.
     *
     * @param {Object} item - The event item to like or unlike.
     * @property {string} item.id - The unique identifier of the event.
     *
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     * @method
     */
    async likeEvent(item) {
      // Creating a reference to the document in the "events-parties" collection with the provided item's ID.
      const docRef = doc(db, "events-parties", item.id);

      // Retrieving the document snapshot asynchronously.
      const docSnap = await getDoc(docRef);

      // Extracting data from the document snapshot.
      const data = docSnap.data();

      // Toggling the "liked" property in the data.
      data["liked"] = !data["liked"];

      // Adjusting the "likes" count based on whether the user liked or unliked the event.
      if (data["liked"]) {
        data["likes"] = data["likes"] + 1;
      } else {
        data["likes"] = data["likes"] - 1;
      }

      // Overwriting the current value of the document with the updated data.
      await setDoc(docRef, data, { merge: true });

      // Emitting an event to trigger the items to reload after change.
      this.$emit("itemChanged");
    },

    /**
     * Displays the edit ad dialog by setting the showDialogEditAd flag to true.
     * @method
     */
    editAdClicked() {
      this.showDialogEditAd = true
    },

    /**
     * Exits the edit ad dialog by setting the showDialogEditAd flag to false.
     * @method
     */
    exitDialogEditAd() {
      this.showDialogEditAd = false
    },

    async closeDialogEditEvent(images, eventData) {
      this.showDialogEditAd = false;

      eventData["category"] = this.item.category;
      eventData["likes"] = this.item.likes;
      eventData["liked"] = this.item.liked;
      eventData["joined"] = this.item.joined;
      eventData["members"] = this.item.members;

      await editAdEvents(this.item.id, images, eventData)

      this.snackbarText = "Ihr Inserat wurde erfolgreich geändert!"
      this.snackbar = true;

      this.$emit("itemsChanged")
    },
    async closeDialogEditInfo(images, infoData) {
      this.showDialogEditAd = false;

      infoData["category"] = this.item.category;
      infoData["date"] = this.item.date;

      await editAdInfo(this.item.id, images, infoData)

      this.snackbarText = "Ihr Inserat wurde erfolgreich geändert!"
      this.snackbar = true;

      this.$emit("itemsChanged")
    },

    /**
     * Closes the edit ad dialog, displays a success message in a Snackbar, and sets the Snackbar to confirm completion.
     * @method
     */
    async closeDialogEditSeminar(images, seminarData) {
      this.showDialogEditAd = false;

      seminarData["category"] = this.item.category;
      seminarData["likes"] = this.item.likes;
      seminarData["liked"] = this.item.liked;
      seminarData["joined"] = this.item.joined;
      seminarData["members"] = this.item.members;

      await editAdSeminar(this.item.id, images, seminarData)

      this.snackbarText = "Ihr Inserat wurde erfolgreich ändert!"
      this.snackbar = true;

      this.$emit("itemsChanged")
    },

    /**
     * Exits the confirm dialog by setting the showDialogConfirm flag to false.
     * @method
     */
    async exitDialogConfirm() {
      this.showDialogConfirm = false;
    },

    /**
     * Deletes the ad, hides the confirm dialog, displays a success message in a Snackbar,
     * and emits an event to trigger the items to reload after change.
     * @method
     */
    async deleteAdClicked() {

      this.showDialogConfirm = false;
      await deleteAd("events-parties", this.item.id);

      this.snackbarText = "Ihr Inserat wurde erfolgreich gelöscht!"
      this.snackbar = true;

      this.$emit("itemsChanged")
    }
  },

  computed: {
    /**
     * Computes an array of basic information keywords based on the item's category.
     *
     * @returns {string[]} - An array of the basic information keywords.
     * @computed
     */
    basicInfosKeywords() {
      if (this.item.category === "Events") {
        return ["date", "price", "community"]
      } else if (this.item.category === "Infos") {
        return ["date", "community"]
      } else if (this.item.category === "Seminare") {
        return ["date", "price", "community"]
      }

      return []
    },

    /**
     * Computes an array of extra information keywords based on the item's category.
     *
     * @returns {string[]} - An array of the extra information keywords.
     * @computed
     */
    extraInfosKeywords() {
      if (this.item.category === "Events") {
        return ["description", "location", "availability"]
      } else if (this.item.category === "Infos") {
        return ["description", "location"]
      } else if (this.item.category === "Seminare") {
        return ["description", "location", "availability"]
      }

      return []
    },

    /**
     * Computes an array of basic information objects for display.
     *
     * @returns {Object[]} - An array of basic information objects with label and value properties.
     * @computed
     */
    basicInfos() {
      return this.basicInfosKeywords.map((attribute) => ({
        label: this.dictionary[attribute],
        value: this.item[attribute],
      }));
    },

    /**
     * Computes an array of extra information objects for display.
     *
     * @returns {Object[]} - An array of extra information objects with label and value properties.
     * @computed
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
