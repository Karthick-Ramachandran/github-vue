<template>
  <div class="container mt-5">
    <div class="row justify-content-center" v-if="loading">Loading...</div>
    <div class="row justify-content-center" v-else v-for="repo in repoData" :key="repo.name">
      <div class="card mb-3" style="width: 18rem;">
        <div class="card-body text-center">
          <h5 class="card-title">{{ repo.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ repo.type }}</h6>
          <a @click="openFile(repo.name)" class="card-link">Open {{ repo.type }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/github";
import { router } from "../main";
export default {
  name: "Repo",
  props: ["name", "repo"],
  data() {
    return {
      loading: false,
      repoData: []
    };
  },
  methods: {
    async getData() {
      this.loading = true;
      const single = await api.singleRepo(this.name, this.repo);
      this.repoData = single.data;
      this.loading = false;
    },
    openFile(file) {
      router.push(`/${this.name}/${this.repo}/${file}`);
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>

<style scoped>
.card-link {
  cursor: pointer;
}
</style>