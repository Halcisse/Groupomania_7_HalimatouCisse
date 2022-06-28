import { createWebHistory, createRouter } from "vue-router";
import signIn from "@/views/signIn.vue";
import Profil from "@/views/Profil.vue";

const routes = [
  {
    name: "signIn",
    path: "/",
    component: signIn,
  },
  {
    name: "profil",
    path: "/profil",
    component: Profil,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
