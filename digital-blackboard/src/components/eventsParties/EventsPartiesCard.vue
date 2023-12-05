<template>
  <CustomCard
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      action="Mitmachen"
      :customClick="createShareLink"
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
  methods: {
    createShareLink() {
      const link = window.location.origin + this.$route.path + '?card=' + this.item.id + "&selectedCategory=" + this.item.category;
      navigator.clipboard.writeText(link);

      alert(`Der Link zum Inserat wurde in deine Zwischenablage kopiert`);
    }
  },
};
</script>

<style>

</style>
