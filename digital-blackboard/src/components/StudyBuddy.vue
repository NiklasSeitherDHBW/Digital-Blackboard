<template>
  <v-app-bar color="white" height="100">
    <v-app-bar-title>
      <h2 style="color: #7C868DFF; display: inline-block; margin-right: 5px;">Study</h2>
      <h2 style="color: #E0001BFF; display: inline-block;">Buddy</h2>
    </v-app-bar-title>
  </v-app-bar>

  <v-container class="student-partnership-program">
    <v-card variant="tonal" class="text-center">
      <v-card-title class="headline primary--text text-center">Willkommen bei StudyBuddys</v-card-title>
      <v-card-subtitle class="grey--text mb-3" >Connect with fellow students, find frieds, and enhance you learning experience together</v-card-subtitle>
    </v-card>

    <v-list>
      <v-list-item v-for="(student, index) in students" :key="index">
        <v-sheet class="mb-3 rounded pa-3"> <!-- Light grey box with increased margin -->
          <!-- Verwende v-row, um Avatar und Inhalt nebeneinander anzuordnen -->
          <v-row no-gutters align="center">
            <!-- Linke Spalte für das Avatar-Bild -->
            <v-col cols="1">
              <v-list-item-avatar>
                <v-img
                    :src="student.avatar"
                    alt="Student Avatar"
                    style="border-radius: 50%; width: 35px; height: 35px;"
                ></v-img>
              </v-list-item-avatar>
            </v-col>

            <!-- Rechte Spalte für den Namen und den Abschluss -->
            <v-col>
              <v-list-item-content>
                <v-list-item-title>{{ student.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ student.major }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
          </v-row>
        </v-sheet>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-container>


  <v-icon color="primary">mdi-account-plus</v-icon>
</template>


<script scoped>

export default {
  data() {
    return {
      students: [
        { name: 'John Doe', major: 'Computer Science', mannheim: 'True', avatar: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj' },
        { name: 'Jane Smith', major: 'Engineering', avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
      ],
      selectedStudent: null,
    };
  },
  methods: {
    sendFriendRequest(student) {
      this.selectedStudent = student
    },
  },
};

</script>

<style scoped>
/* Add your component-specific styles here */

.student-partnership-program {
  margin-top: 20px;
  max-width: 1500px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

/* Customize styling as needed */
</style>
