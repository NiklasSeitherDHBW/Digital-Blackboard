<template>
  <CustomCard
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      :action="item.joined ? 'Angefragt' : 'Mitmachen'"
      :actionBackground="item.joined ? '#7C868DFF' : '#eb1b2a'"
      @action-clicked="joinEvent"
  ></CustomCard>
</template>

<script setup>
import CustomCard from "@/components/util/CustomCard.vue"
</script>

<script>
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
    joinEvent() {
      let tmp_item = this.item;
      tmp_item.joined = !tmp_item.joined;

      this.$emit("itemChanged", this.item, tmp_item);
    },
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
  }
};
</script>

<style>

</style>
