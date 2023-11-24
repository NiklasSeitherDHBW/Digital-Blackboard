<template>
  <NavBar/>
  <BlackBoard />
</template>

<script>
import {defineComponent} from "vue";
import BlackBoard from "@/components/BlackBoard.vue";
import NavBar from "@/components/util/CustomNavBar.vue";

export default defineComponent({
  components: {
    BlackBoard,
    NavBar
  }
})
</script>
