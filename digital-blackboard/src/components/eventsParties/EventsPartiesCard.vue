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
      max-width="1200px"
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
import CustomCard from "@/components/util/CustomCard.vue"
import EditEventDialog from "@/components/eventsParties/EditEventDialog.vue";
import EditInfoDialog from "@/components/eventsParties/EditInfoDialog.vue";
import EditSeminarDialog from "@/components/eventsParties/EditSeminarDialog.vue";
import ConfirmDialog from "@/components/util/ConfirmDialog.vue";

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
     * The custom link share function for events, due to different categories
     * the link consists of the base URL, the adType, the item Id and their category within the adType
     * The Link is copied to the User Clipboard
     */
    createShareLink() {
      const link = window.location.origin + '/events' + '?card=' + this.item.id + "&selectedCategory=" + this.item.category;
      navigator.clipboard.writeText(link);
      // The Snackbar is assigned a special Text and then called
      this.snackbarText = "Ihr Inserat wurde erfolgreich geteilt!"
      this.snackbar = true;
    },

    closeSnackbar() {
      this.snackbar = false;
    },

    async joinEvent(item) {
      const docRef = doc(db, "events-parties", item.id)
      const docSnap = await getDoc(docRef)

      const data = docSnap.data()
      data["joined"] = !data["joined"]
      if (data["joined"]) {
        data["members"] = data["members"] + 1
      } else {
        data["members"] = data["members"] - 1
      }

      await setDoc(docRef, data, {merge: true});
      this.$emit("itemChanged");
    },

    async likeEvent(item) {
      const docRef = doc(db, "events-parties", item.id)
      const docSnap = await getDoc(docRef)

      const data = docSnap.data()
      data["liked"] = !data["liked"]
      if (data["liked"]) {
        data["likes"] = data["likes"] + 1
      } else {
        data["likes"] = data["likes"] - 1
      }

      await setDoc(docRef, data, {merge: true})
      this.$emit("itemChanged")
    },

    editAdClicked() {
      this.showDialogEditAd = true
    },

    exitDialogEditAd() {
      this.showDialogEditAd = false
    },

    async closeDialogEditEvent(images, eventData) {
      this.showDialogEditAd = false;

      eventData["category"] = this.item.category;

      await editAdEvents(this.item.id, images, eventData)

      this.snackbarText = "Ihr Inserat wurde erfolgreich geändert!"
      this.snackbar = true;

      this.$emit("itemsChanged")
    },
    async closeDialogEditInfo(images, infoData) {
      this.showDialogEditAd = false;
      console.log(images)
      console.log(infoData)
      infoData["category"] = this.item.category;
      infoData["date"] = this.item.date;

      await editAdInfo(this.item.id, images, infoData)

      this.snackbarText = "Ihr Inserat wurde erfolgreich geändert!"
      this.snackbar = true;

      this.$emit("itemsChanged")
    },
    async closeDialogEditSeminar(images, seminarData) {
      this.showDialogEditAd = false;

      seminarData["category"] = this.item.category;

      await editAdSeminar(this.item.id, seminarData)

      this.snackbarText = "Ihr Inserat wurde erfolgreich ändert!"
      this.snackbar = true;

      this.$emit("itemsChanged")
    },

    async exitDialogConfirm() {
      this.showDialogConfirm = false;
    },

    async deleteAdClicked() {

      this.showDialogConfirm = false;
      await deleteAd("events-parties", this.item.id);

      this.snackbarText = "Ihr Inserat wurde erfolgreich gelöscht!"
      this.snackbar = true;

      this.$emit("itemsChanged")
    }
  },

  computed: {
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

    basicInfos() {
      return this.basicInfosKeywords.map((attribute) => ({
        label: this.dictionary[attribute],
        value: this.item[attribute],
      }));
    },

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
