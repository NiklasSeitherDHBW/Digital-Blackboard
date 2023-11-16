<template>
    <NavBar/>
    <StudyBuddy/>
</template>

<script>
import {defineComponent} from "vue";
import StudyBuddy from "@/components/StudyBuddy.vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: {StudyBuddy, NavBar}
})
</script>

<style>

</style>