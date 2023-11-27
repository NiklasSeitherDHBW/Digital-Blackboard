<template>
    <NavBar/>
    <StudyBuddy/>
</template>

<script>
import {defineComponent} from "vue";
import StudyBuddy from "@/components/studyHub/StudyHubPage.vue";
import NavBar from "@/components/util/CustomNavBar.vue";

export default defineComponent({
  components: {StudyBuddy, NavBar}
})
</script>

<style>

</style>