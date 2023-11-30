<template>
  <AppBar
      titleGrey="Study"
      titleRed="Hub"
  ></AppBar>

  <v-container
      :fluid="true"
      style="width: 85%;"
      align="center"
  >
    <v-row
        align="stretch"
    >
      <v-col
          v-for="(item, index) in contents"
          :key="index"
          cols="12"
          sm="12"
          md="6"
          lg="6"
          xl="4"
          xxl="3"
          align="left"
      >
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
      </v-col>
    </v-row>
  </v-container>

  <v-btn
      style="border-radius: 5px; background-color:#E0001BFF; color: white; position: fixed; right: 20px;"
      :style="{ bottom: mobile ? '75px' : '20px' }"
      icon="mdi-plus"
      text="+">
    <v-icon>
      mdi-plus
    </v-icon>
    <v-dialog
        transition="dialog-bottom-transition"
        v-model="showDialogAddApartment"
        activator="parent"
        :style="{ maxWidth: mobile ? '100%' : '60%' }"
    >
      <AddStudyHubDialog @close-dialog="closeDialogAddAppartment"></AddStudyHubDialog>
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
        images: ["https://cvws.icloud-content.com/B/ASG0FtYSz5P1i-zXvBDsx2z-xEWvAcNtrvHn98IZMSSsHzYLJBMxxDVU/IMG_8689.JPEG?o=AntLSYFD5EzbSI_KS8SQj8B8Ugbb1Z0Q1vDrw_2kYUiY&v=1&x=3&a=CAogKw2z8pt8Tn3HoHOG3GXwr6jJMaX0DHfhWlut6SJNMqcSbRCJ-ImswTEYidXlrcExIgEAUgT-xEWvWgQxxDVUaia7rzt5-krMiP7QdS3VPxRlxVZb7W3735AleF5FmoOQg0FNfX97THImyq7AqG7MIEDk2QlapHiXMf2HZwEM-8wz8LmUZDg9nvA_mRJAk8I&e=1701171522&fl=&r=2f33463a-1037-4aa4-b22d-62cd19f4d34d-1&k=PoSmDVI1R_5GYT9HFSc1nQ&ckc=com.apple.photos.cloud&ckz=CMM-E23D3B38-BFFC-42D2-83DA-7CC404967CEC&y=1&p=119&s=BNDUO01nUerky_no9VDNiEKm9SQ"],
        date_created: "25.11.2023",
        subject: "IBM, Windoofs",
        description: "Ich fahr das besde Audo der Welt und damit mein ich net so nen doofen Tesla",
        price: "alles nur Abzocke",
        rating: 5,
        category: "buddy",
        availability: "Wenn die IBM nicht schon wieder rumgepfuscht hat"
      },
      {
        title: "Niggl",
        date_created: "25.10.2018",
        description: '"Nenn mich einfach Meister oder Sensei"',
        subject: "Kann eigentlich nichts",
        images: ['https://media.licdn.com/dms/image/D4D03AQE1rqeodXQqtQ/profile-displayphoto-shrink_200_200/0/1691487446798?e=2147483647&v=beta&t=SeFrL8y5GMt4bNt8AHJgM1AXrQOmr5HdVZmMkuwMWbY'],
        price: "250",
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
    ],
  }),
  methods: {
    openDialogImagesFullscreen(item) {
      this.selectedItem = item;
      this.showDialogImages = true;
    },
    closeDialogAddAppartment() {
      this.showDialogAddApartment = false;
    }
  },
};
</script>

<script setup>
import AppBar from "@/components/util/CustomAppBar.vue";
import AddStudyHubDialog from "@/components/studyHub/AddStudyHubDialog.vue";
import StudyHubBuddyCard from "@/components/studyHub/StudyHubBuddyCard.vue";
import StudyHubGroupCard from "@/components/studyHub/StudyHubGroupCard.vue";

import {useDisplay} from "vuetify";

const {mobile} = useDisplay()

</script>