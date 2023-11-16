import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DualHousing from "../views/DualHousingView.vue"
import StudyBuddy from "../views/StudyBuddyView.vue"
import EventsParties from "../views/EventsPartiesView.vue"

const routes = [
  {
    path: '/',
    name: 'blackboard',
    component: HomeView
  },
  {
    path: '/dualhousing',
    name: 'dualhousing',
    component: DualHousing
  },
  {
    path: "/studybuddy",
    name: "studybuddy",
    component: StudyBuddy
  },
  {
    path: "/events",
    name: "events",
    component: EventsParties
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
