<template>
  <CustomAppBar
      titleRed="Digital"
      titleGrey="Blackboard"
      subtitle="Letzte Ereignisse"
  ></CustomAppBar>

  <v-data-iterator
      :items="contents"
      item-value="name"
  >
    <template
        v-slot:default="{ items , isExpanded, toggleExpand}"
    >
      <v-container
          fluid="true"
      >
        <v-row
            dense
        >
          <v-col
              v-for="item in items"
              :key="item.raw.name"
              :cols="item.raw.flex"
          >
            <v-card
                class="mx-auto"
            >

              <v-img
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  cover
                  :src="item.raw.src"
              >
                <v-card-title
                    class="d-flex align-center">
                  <v-icon
                      :color="item.raw.color"
                      :icon="item.raw.icon"
                      start
                      size="18"
                  ></v-icon>
                  <h4
                      style="color: white"
                  >
                    {{ item.raw.name }}
                  </h4>
                </v-card-title>
              </v-img>

              <v-list-item-subtitle
                  style="margin-top: 10px; margin-right: 10px"
              >
                {{ item.raw.date }}
              </v-list-item-subtitle>

              <v-card-text>
                {{ item.raw.description }}
              </v-card-text>

              <v-btn
                  :model-value="isExpanded(item)"
                  :icon="`${isExpanded(item) ? 'mdi-chevron-up' : 'mdi-chevron-down'}`"
                  density="compact"
                  inset
                  style="margin-bottom: 10px"
                  @click="() => toggleExpand(item)"
              ></v-btn>

              <v-spacer></v-spacer>

              <v-expand-transition>
                <v-container
                    v-if="isExpanded(item)"
                >
                  <v-divider></v-divider>

                  <v-list
                      density="compact"
                      :lines="false"
                  >
                    <v-list-item
                        :title="`🔥 Calories: ${item.raw.calories}`"
                        active
                    ></v-list-item>
                  </v-list>
                </v-container>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-iterator>
</template>

<script setup>
import CustomAppBar from "@/components/util/CustomAppBar.vue";
</script>

<script>
export default {
  data: () => ({
    show: false,

    categories: [
      {
        name: "Event",
        flex: 4,
        icon: "mdi-information-outline",
      },
      {
        name: "Housing",
        flex: 8,
        icon: "mdi-domain",
      },
      {
        name: "Buddy",
        flex: 4,
        icon: "mdi-school",
      }
    ],

    contents: [
      {
        name: 'Sophie`s Rechner hebt ab!',
        description: 'Hauptsache er sah schön aus!!!.',
        icon: 'mdi-ice-cream',
        color: '#6EC1E4',
        flex: 4,
        src: "https://media.licdn.com/dms/image/D4D03AQE1rqeodXQqtQ/profile-displayphoto-shrink_200_200/0/1691487446798?e=2147483647&v=beta&t=SeFrL8y5GMt4bNt8AHJgM1AXrQOmr5HdVZmMkuwMWbY",
        date: "08.11.2023",
        cat: "Event",
      },
      {
        name: 'Ice cream sandwich',
        description: 'A classic treat featuring a layer of creamy ice cream sandwiched between two cookies or cake layers. Ideal for those hot summer days when you can\'t decide between a cookie and ice cream.',
        icon: 'mdi-cookie',
        color: '#F4A261',
        flex: 8,
        src: 'https://media.licdn.com/dms/image/D4D03AQE1rqeodXQqtQ/profile-displayphoto-shrink_200_200/0/1691487446798?e=2147483647&v=beta&t=SeFrL8y5GMt4bNt8AHJgM1AXrQOmr5HdVZmMkuwMWbY',
        date: "08.11.2023",
        cat: "Housing",
      },

    ],
  }),
  methods: {
    getCategoryDetails(categoryName) {
      const category = this.categories.find(item => item.cat === categoryName);
      return {
        flex: category ? category.flex : 4, // Default flex value if not found
        icon: category ? category.icon : "mdi-help", // Default icon if not found
      };
    },
  },
}
</script>

<style scoped>

</style>