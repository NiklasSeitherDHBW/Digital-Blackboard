<template>
  <CustomCard
      ref="customCard"
      :item="item"
      :basicInfos="basicInfos"
      :extraInfos="extraInfos"
      :action="item.joined ? 'Beigetreten' : 'Beitreten'"
      :actionBackground="item.joined ? 'grey' : 'red'"
      @action-clicked="joinGroup"
  ></CustomCard>
</template>

<script>
import CustomCard from "@/components/util/CustomCard.vue";

export default {
  components: { CustomCard },
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
        members: "Mitglieder",
        activities: "Aktivitäten",
        description: "Beschreibung",
        subject: "Studienrichtung",
      },
    };
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

  methods: {
    joinGroup() {
      let tmp_item = this.item;
      tmp_item.joined = !tmp_item.joined;

      this.$emit("itemChanged", this.item, tmp_item);
    },
  },
};
</script>

<style scoped>
</style>
