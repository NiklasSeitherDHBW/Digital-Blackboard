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
      @deleteAd="deleteAdClicked"
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
        @close-dialog="closeDialogEditAd"
    ></EditEventDialog>

    <EditInfoDialog
        v-if="item.category === 'Infos'"
        :item="item"
        @exit-dialog="exitDialogEditAd"
        @close-dialog="closeDialogEditAd"
    ></EditInfoDialog>

    <EditSeminarDialog
        v-if="item.category === 'Seminare'"
        :item="item"
        @exit-dialog="exitDialogEditAd"
        @close-dialog="closeDialogEditAd"
    ></EditSeminarDialog>
  </v-dialog>

  <v-snackbar v-model="snackbarCreate" :timeout="timeout">
    Ihr Inserat wurde erfolgreich geteilt!
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
  <v-snackbar v-model="snackbarDelete" :timeout="timeout">
    Ihr Inserat wurde erfolgreich gelöscht!
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
  <v-snackbar v-model="snackbarShare" :timeout="timeout">
    Ihr Inserat wurde erfolgreich geteilt!
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
</script>

<script>
import {doc, getDoc, setDoc} from "firebase/firestore"
import {db, deleteAd} from "@/db"

export default {
  props: {
    item: Object,
  },
  data() {
    return {
      snackbarCreate: false,
      snackbarDelete: false,
      snackbarShare: false,
      timeout: 3000,

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
    createShareLink() {
      const link = window.location.origin + '/events' + '?card=' + this.item.id + "&selectedCategory=" + this.item.category;
      navigator.clipboard.writeText(link);
      this.snackbarShare = true;
    },

    closeSnackbar() {
      this.snackbarCreate = false;
      this.snackbarDelete = false;
      this.snackbarShare = false;
    },

    async joinEvent(item) {
      const docRef = doc(db, "events-parties", item.id)
      const docSnap = await getDoc(docRef)

      const data = docSnap.data()
      data["joined"] = !data["joined"]
      if (data["joined"]) {
        data["members"] = data["members"] + 1
        this.snackbarJoin = true;
      } else {
        data["members"] = data["members"] - 1
        this.snackbarLeft = true;
      }

      await setDoc(docRef, data, {merge: true})

      this.$emit("itemChanged");
    },

    async likeEvent(item) {
      const docRef = doc(db, "events-parties", item.id)
      const docSnap = await getDoc(docRef)

      const data = docSnap.data()
      data["liked"] = !data["liked"]
      if (data["liked"]) {
        data["likes"] = data["likes"] + 1
      }
      else {
        data["likes"] = data["likes"] - 1
      }

      await setDoc(docRef, data, {merge: true})

      this.$emit("itemChanged")
    },

    editAdClicked() {
      this.showDialogEditAd = true
    },
    async exitDialogEditAd() {
      this.showDialogEditAd = false
    },
    closeDialogEditAd() {
      this.showDialogEditAd = false;
      this.snackbarCreate = true;
    },

    deleteAdClicked() {
      deleteAd("events-parties", this.item.id);
      this.snackbarDelete = true;
      this.$emit("itemsChanged")
    },
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
