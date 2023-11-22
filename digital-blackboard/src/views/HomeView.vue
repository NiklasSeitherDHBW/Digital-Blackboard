<template>
  <NavBar />
  <BlackBoard />
</template>

<script>
import {defineComponent} from "vue";
import BlackBoard from "@/components/BlackBoard.vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: {
    BlackBoard,
    NavBar}
})
</script>
