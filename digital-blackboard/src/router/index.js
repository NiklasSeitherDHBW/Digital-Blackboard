import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudyBuddy from "../views/StudyBuddyView.vue"
import EventsParties from "../views/EventsPartiesView.vue"
import LogIn from "../views/LogInView.vue"
import DualHousing from "../views/DualLivingView.vue"
import TestPage from "@/views/TestPageView.vue"
import TestPage2 from "@/views/TestPageView2.vue";

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
    path: "/login",
    name: "login",
    component: LogIn
  },
  {
    path: "/test",
    name: "test",
    component: TestPage
  },
  {
    path: "/test2",
    name: "test2",
    component: TestPage2
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
