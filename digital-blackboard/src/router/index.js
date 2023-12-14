import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/BlackBoardView.vue'
import StudyBuddy from "../views/StudyHubView.vue"
import EventsParties from "../views/EventsPartiesView.vue"
import Account from "../views/AccountView.vue"
import DualHousing from "../views/DualLivingView.vue"
const routes = [
  {
    path: '/',
    name: 'blackboard',
    component: HomeView
  },
  {
    path: '/dualliving',
    name: 'dualliving',
    component: DualHousing
    },
  {
    path: "/studyhub",
    name: "studyhub",
    component: StudyBuddy
  },
  {
    path: "/events",
    name: "events",
    component: EventsParties
  },
  {
    path: "/account",
    name: "account",
    component: Account
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
