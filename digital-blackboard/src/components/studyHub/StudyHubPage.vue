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
        ></StudyHubBuddyCard>
        <StudyHubGroupCard
            v-if="item.category === 'group'"
            :item="item"
            @itemChanged="itemChanged"
        ></StudyHubGroupCard>
      </v-col>
    </v-row>
  </v-container>

  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            style="border-radius: 5px; background-color:#E0001BFF; color: white; position: fixed; right: 20px;"
            :style="{ bottom: mobile ? '75px' : '20px' }"
            icon="mdi-plus"
            text="+"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="showDialogAddStudyBuddy = true">
          <v-list-item-title>Buddy</v-list-item-title>
        </v-list-item>

        <v-list-item @click="showDialogAddStudyHub = true">
          <v-list-item-title>Gruppe</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog
        transition="dialog-bottom-transition"
        v-model="showDialogAddStudyBuddy"
        :style="{ maxWidth: mobile ? '100%' : '60%' }"
    >
      <AddStudyBuddyDialog @close-dialog="closeDialogAddStudyBuddy"></AddStudyBuddyDialog>
    </v-dialog>

    <v-dialog
        transition="dialog-bottom-transition"
        v-model="showDialogAddStudyHub"
        :style="{ maxWidth: mobile ? '100%' : '60%' }"
    >
      <AddStudyHubDialog @close-dialog="closeDialogAddStudyHub"></AddStudyHubDialog>
    </v-dialog>

  </div>
</template>


<script>
export default {
  data: () => ({
    showDialogAddStudyHub: false,
    showDialogAddStudyBuddy: false,
    showDialogImages: false,
    selectedItem: null,
    contents: [
      {
        title: "IBM Udo",
        images: [],
        date_created: "25.11.2023",
        subject: "IBM, Windoofs",
        description: "Ich fahr das besde Audo der Welt und damit mein ich net so nen doofen Tesla",
        price: "alles nur Abzocke",
        rating: 5,
        category: "buddy",
        availability: "Wenn die IBM nicht schon wieder rumgepfuscht hat",
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
        joined: true,
      },
      {
        title: "Die wilden Mäuschen 2",
        date_created: "25.10.2018",
        description: '"Immer voll bei der Sache"',
        subject: "Web Programmierung, Statistik",
        activities: "Trinken bis die Sonne wieder untergeht",
        images: ['https://th.bing.com/th/id/OIP.ZNCLp5fUZ3UDs2Q1KGsuSgHaE7?w=244&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'],
        category: "group",
        members: 4,
        joined: false,
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
    closeDialogAddStudyBuddy(images, buddyData, contactData) {
      this.showDialogAddStudyBuddy = false;

      let new_item = {
        title: buddyData.title,
        date_created: new Date().toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit' }), // TODO: needs to be changed: Push date obejct to database and convert it to string when retrieving data
        description: buddyData.description,
        price: buddyData.price,
        subject: buddyData.subject,
        category: buddyData.category,
        images: images,
        rating: buddyData.rating,
        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,
      }

      this.contents.push(new_item);
    },

    closeDialogAddStudyHub(images, hubData) {
      this.showDialogAddStudyHub = false;

      let new_item = {
        title: hubData.title,
        date_created: new Date().toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit' }), // TODO: needs to be changed: Push date obejct to database and convert it to string when retrieving data
        description: hubData.description,
        subject: hubData.subject,
        category: hubData.category,
        activities: hubData.activities,
        images: images,
        availability: hubData.availability,
        members: hubData.members,
        joined: hubData.joined,

      }

      this.contents.push(new_item);
    },

    itemChanged(oldItem, newItem) {
      for(let i = 0; i < this.contents.length; i++) {
        if (this.contents[i] === oldItem) {
          this.contents[i] = newItem;
        }
      }
    }
  },
};
</script>

<script setup>
import AppBar from "@/components/util/CustomAppBar.vue";
import AddStudyHubDialog from "@/components/studyHub/AddStudyHubDialog.vue";
import AddStudyBuddyDialog from "@/components/studyHub/AddStudyBuddyDialog.vue";
import StudyHubBuddyCard from "@/components/studyHub/StudyHubBuddyCard.vue";
import StudyHubGroupCard from "@/components/studyHub/StudyHubGroupCard.vue";

import {useDisplay} from "vuetify";

const {mobile} = useDisplay()

</script>