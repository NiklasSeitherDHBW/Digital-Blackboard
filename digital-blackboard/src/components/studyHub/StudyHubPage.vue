<template>
  <AppBar
      titleGrey="Study"
      titleRed="Hub"
  ></AppBar>
  <v-container
      :fluid=true
      style="width: 85%; display: flex; flex-wrap: wrap;"
  >
    <v-row class="w-100">
      <v-col
          v-for="(item, index) in contents"
          :key="index"
          sm="6"
          class="d-flex"
      >
        <div class="w-100">
          <StudyHubBuddyCard
              v-if="item.category === 'buddy'"
              :item="item"
              :action="item.category === 'group' ? 'Beitreten' : 'Kontaktieren'"
          ></StudyHubBuddyCard>
          <StudyHubGroupCard
              v-if="item.category === 'group'"
              :item="item"
              :action="item.category === 'group' ? 'Beitreten' : 'Kontaktieren'"
          ></StudyHubGroupCard>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-btn
      v-if="mobile"
      style="border-radius: 5px; background-color:#E0001BFF; color: white; position: fixed; bottom: 75px; right: 20px;"
      icon="mdi-plus"
      text="+"
  >
    <v-icon>
      mdi-plus
    </v-icon>
    <v-dialog
        v-model="showDialogAddApartment"
        activator="parent"
        width="auto"
    >
      <AddApartment></AddApartment>
    </v-dialog>
  </v-btn>

  <v-btn
      v-if="!mobile"
      style="border-radius: 5px; background-color:#E0001BFF; color: white; position: fixed; bottom: 20px; right: 20px;"
      icon="mdi-plus"
      text="+"
  >
    <v-icon>
      mdi-plus
    </v-icon>
    <v-dialog
        v-model="showDialogAddApartment"
        activator="parent"
        width="auto"
    >
      <AddApartment></AddApartment>
    </v-dialog>
  </v-btn>
</template>


<script>
export default {
  data: () => ({
    showDialogAddApartment: false,
    showDialogImages: false,
    selectedItem: null,
    contents: [
      {
        title: "IBM Udo",
        images: ["https://cdn.discordapp.com/attachments/685223087133949963/1178108774339330079/PHOTO-2023-05-16-14-04-46.jpg?ex=6574f24c&is=65627d4c&hm=13fa9470ec2efde5e2a0279156b394143c5f6f3c346fc8cb2ba9eb9c7f66df32&"],
        date_created: "25.11.2023",
        subject: "IBM, Windoofs",
        description: "Ich fahr das besde Audo der Welt und damit mein ich net so nen doofen Tesla",
        price: "alles nur Abzocke",
        rating: 5,
        category: "buddy"
      },
      {
        title: "Niggl",
        date_created: "25.10.2018",
        description: '"Nenn mich einfach Meister oder Sensei"',
        subject: "Web Programmierung, Statistik",
        images: ['https://media.licdn.com/dms/image/D4D03AQE1rqeodXQqtQ/profile-displayphoto-shrink_200_200/0/1691487446798?e=2147483647&v=beta&t=SeFrL8y5GMt4bNt8AHJgM1AXrQOmr5HdVZmMkuwMWbY'],
        price: "250 €",
        rating: 1,
        category: "buddy",
        availability: "Niemals, immer busy"
      },
      {
        title: "Die wilden Mäuschen",
        date_created: "25.10.2018",
        description: '"Immer voll bei der Sache"',
        subject: "Web Programmierung, Statistik",
        activities: "Trinken bis die Sonne wieder untergeht",
        images: ['https://th.bing.com/th/id/OIP.ZNCLp5fUZ3UDs2Q1KGsuSgHaE7?w=244&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'],
        category: "group",
        members: 4,
      },
      {
        title: "IBM Udo",  images: ["https://cdn.discordapp.com/attachments/685223087133949963/1178105743782727700/PHOTO-2023-06-13-13-47-51.jpg?ex=6574ef79&is=65627a79&hm=f242fbcb8e4b87fba84c3dfa6222177ec3109c39bff02d2620af0ba8750f6df5&"],
        date_created: "25.11.2023",
        subject: "IBM, Windoofs",
        description: "Ich fahr das besde Audo der Welt und damit mein ich net so nen doofen Tesla",
        price: "alles nur Abzocke",
        rating: 5,
        category: "buddy"
      },
      {
        title: "Niggl",
        date_created: "25.10.2018",
        description: '"Nenn mich einfach Meister oder Sensei"',
        subject: "Web Programmierung, Statistik",
        images: ['https://media.licdn.com/dms/image/D4D03AQE1rqeodXQqtQ/profile-displayphoto-shrink_200_200/0/1691487446798?e=2147483647&v=beta&t=SeFrL8y5GMt4bNt8AHJgM1AXrQOmr5HdVZmMkuwMWbY'],
        price: "250 €",
        rating: 1,
        category: "buddy",
      },
      {
        title: "Die wilden Mäuschen",
        date_created: "25.10.2018",
        description: '"Immer voll bei der Sache"',
        subject: "Web Programmierung, Statistik",
        activities: "Trinken bis die Sonne wieder untergeht",
        images: ['https://th.bing.com/th/id/OIP.ZNCLp5fUZ3UDs2Q1KGsuSgHaE7?w=244&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'],
        category: "group",
      },
    ],
  }),
  methods: {
    openDialogImagesFullscreen(item) {
      this.selectedItem = item;
      this.showDialogImages = true;
    },
  },
};
</script>

<script setup>
import AppBar from "@/components/util/CustomAppBar.vue";
import AddApartment from "@/components/dualLiving/AddAppartmentDialog.vue";
import StudyHubBuddyCard from "@/components/studyHub/StudyHubBuddyCard.vue";
import StudyHubGroupCard from "@/components/studyHub/StudyHubGroupCard.vue";

import { useDisplay } from "vuetify";

const { mobile } = useDisplay()

</script>