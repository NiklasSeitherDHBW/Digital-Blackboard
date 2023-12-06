<template>
  <CustomCard
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      :action="item.joined ? 'Angefragt' : 'Mitmachen'"
      :actionBackground="item.joined ? '#7C868DFF' : '#eb1b2a'"
      @action-clicked="joinEvent(item)"
  >
    <template v-slot:bottomBasicInfos>
      <div v-if="item.category !== 'Informationen'"
        class="d-flex pt-2"
      >
        <v-icon
          :color="item.liked ? '#eb1b2a' : '#7C868DFF'"
        >
          mdi-heart
        </v-icon>
        <p class="pl-2">{{ item.likes }}</p>
      </div>
    </template>
  </CustomCard>
</template>

<script setup>
import CustomCard from "@/components/util/CustomCard.vue"
</script>

<script>
import { doc, getDoc, setDoc } from "firebase/firestore"
import {db} from "@/db"

export default {
  props: {
    item: Object,
  },
  data() {
    return {
      dictionary: {
        "availability": "Anzahl Teilnehmer",
        "price": "Preis",
        "description": "Beschreibung",
        "location": "Wo",
        "community": "Zielgruppe",
        "date": "Wann",
      }
    };
  },
  methods: {
    async joinEvent(item) {
      const docRef = doc(db, "events-parties", item.id)
      const docSnap = await getDoc(docRef)

      const data = docSnap.data()
          data["joined"] = !data["joined"]
          if (data["joined"]) {
            data["members"] = data["members"] + 1
          }
          else {
            data["members"] = data["members"] - 1
          }

      await setDoc(docRef, data, {merge: true})

      this.$emit("itemChanged");
    },
    createShareLink() {
      const link = window.location.origin + this.$route.path + '?card=' + this.item.id + "&selectedCategory=" + this.item.category;
      navigator.clipboard.writeText(link);

      alert(`Der Link zum Inserat wurde in deine Zwischenablage kopiert`);
    }
  },
  computed: {
    basicInfosKeywords() {
      if (this.item.category === "Events") {
        return ["date", "price", "community"]
      } else if (this.item.category === "Informationen") {
        return ["date", "community"]
      } else if (this.item.category === "Seminare") {
        return ["date", "price", "community"]
      }

      return []
    },
    extraInfosKeywords() {
      if (this.item.category === "Events") {
        return ["description", "location", "availability"]
      } else if (this.item.category === "Informationen") {
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
