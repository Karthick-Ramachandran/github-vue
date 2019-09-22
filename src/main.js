import Vue from "vue";
import App from "./App.vue";
import SearchForm from "./components/SearchForm";
import VueRouter from "vue-router";
import UserRepo from "./components/UserRepo";
import Repo from "./components/Repo";
import Content from "./components/Content";
import Commit from "./components/Commit";

Vue.use(VueRouter);
export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: SearchForm
    },
    {
      path: "/:name",
      component: UserRepo,
      props: true
    },
    {
      path: "/:name/:repo",
      component: Repo,
      props: true
    },
    {
      path: "/:name/:repo/:content",
      component: Content,
      props: true
    },
    {
      path: "/:name/:repo/history/commits",
      component: Commit,
      props: true
    }
  ]
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
