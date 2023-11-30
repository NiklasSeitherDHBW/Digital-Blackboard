<template>
  <CustomCard
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      action="Beitreten"
  ></CustomCard>
</template>

<script>
import CustomCard from "@/components/util/CustomCard.vue";

export default {
  components: {CustomCard},
  props: {
    item: Object,
    action: String,
  },
  data() {
    return {
      showAll: false,
      showDialogImagesFullscreen: false,

      basicInfosKeywords: [
        "subject", "members"
      ],
      extraInfosKeywords: [
        "description", "activities"
      ],
      dictionary: {
        "members": "Mitglieder",
        "activities": "Aktivitäten",
        "description": "Beschreibung",
        "subject": "Studienrichtung",
      }
    };
  },
  computed: {
    basicInfos() {
      let basicInfos = [];
      for (const attribute of this.basicInfosKeywords) {
        let value = this.item[attribute]
        basicInfos.push({label: this.dictionary[attribute], value: value});
      }

      return basicInfos;
    },
    extraInfos() {
      let extraInfos = [];
      for (const attribute of this.extraInfosKeywords) {
        let value = this.item[attribute]
        extraInfos.push({label: this.dictionary[attribute], value: value});
      }

      return extraInfos;
    }
  }
};
</script>

<style scoped>
.button-round {
  background: white;
  color: #E0001BFF; /* TODO: Change to color-dhbw-red */
}

.button-default {
  background: #E0001BFF;
  color: white;
}
</style>