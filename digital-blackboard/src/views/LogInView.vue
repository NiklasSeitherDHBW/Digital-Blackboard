<template>
  <NavBar/>
  <LogIn/>
</template>

<script>
import {defineComponent} from "vue";
import LogIn from "@/components/LogIn.vue";
import NavBar from "@/components/util/CustomNavBar.vue";

export default defineComponent({
  components: {LogIn, NavBar}
})
</script>


