<template>
  <NavBar/>
  <Account/>
</template>

<script>
import {defineComponent} from "vue";
import Account from "@/components/Account/AccountPage.vue";
import NavBar from "@/components/util/CustomNavBar.vue";

export default defineComponent({
  components: {Account, NavBar}
})
</script>


