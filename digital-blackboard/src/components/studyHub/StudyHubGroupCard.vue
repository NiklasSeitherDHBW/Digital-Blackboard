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
import {db, deleteAd, editAdStudyGroup} from "@/db";
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
     * Is the custom link share function for StudyHub, do to different categories
     * the link consists of the base URL, the adType, the items Id and their category within the adType
     * The Link is copied to the User Clipboard
     *
     */
    createShareLink() {
      const link = window.location.origin + '/studyhub' + '?card=' + this.item.id + "&selectedCategory=" + this.item.categories;
      navigator.clipboard.writeText(link);
      // The Snackbar is assigned a special Text and then called
      this.snackbarText = "Ihr Inserat wurde erfolgreich geteilt!"
      this.snackbar = true;
    },

    closeSnackbar() {
      this.snackbar = false;
    },

    async joinGroup(item) {
      const docRef = doc(db, "study-hub", item.id)
      const docSnap = await getDoc(docRef)

      const data = docSnap.data()
      data["joined"] = !data["joined"]
      if (data["joined"]) {
        data["members"] = data["members"] + 1
      } else {
        data["members"] = data["members"] - 1
      }

      await setDoc(docRef, data, {merge: true})

      this.$emit("itemChanged");
    },

    openDialogEditAd() {
      console.log(this.item)
      this.showDialogEditAd = true
    },

    async exitDialogEditAd() {
      this.showDialogEditAd = false;
    },

    async closeDialogEditAd(images, hubData) {
      this.showDialogEditAd = false;

      hubData["joined"] = this.item.joined;
      hubData["members"] = this.item.members;

      await editAdStudyGroup(this.item.id, hubData, images)

      this.snackbarText = "Ihr Inserat wurde erfolgreich geändert!"
      this.snackbar = true;
      this.$emit("itemsChanged")
    },

    async exitDialogConfirm() {
      this.showDialogConfirm = false;
    },

    async deleteAdClicked() {
      this.showDialogConfirm = false;
      await deleteAd("study-hub", this.item.id);
      this.snackbarText = "Ihr Inserat wurde erfolgreich gelöscht!"
      this.snackbar = true;
      this.$emit("itemsChanged")
    },
  },

  computed: {
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

<style scoped>
</style>
