<template>
  <div class="container mt-5">
    <div v-if="loading" class="row justify-content-center">
      <h6>Loading....</h6>
    </div>
    <div class="mt-3 row justify-content-center" v-else v-for="repos in repo" :key="repos.id">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">{{ repos.name }}</h5>
          <p class="card-text">{{ repos.description }}</p>
          <a @click="commits(repos.name)" class="card-link">Commit History</a>
          <a @click="visitRepo(repos.name)" class="card-link">View Contents</a>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-if="checkArray && this.page > 1">
      <h4>That's all for now!</h4>
    </div>

    <div class="row justify-content-center mt-2">
      <button
        type="button"
        :disabled="this.repo.length < 16"
        @click="nextPage"
        class="btn btn-block btn-success"
      >Next Page</button>
    </div>
  </div>
</template>

<script>
import api from "../api/github";
import { router } from "../main";
export default {
  name: "UserRepo",
  props: ["name"],
  data() {
    return {
      loading: false,
      repo: [],
      page: 1
    };
  },
  methods: {
    async getRepos() {
      this.loading = true;
      const repos = await api.repos(this.name, this.page);
      this.repo = repos.data;
      this.loading = false;
    },
    nextPage() {
      this.page += 1;
      this.getRepos();
    },
    visitRepo(repo) {
      router.push(`/${this.name}/${repo}`);
    },
    commits(repo) {
      router.push(`/${this.name}/${repo}/history/commits`);
    }
  },
  computed: {
    checkArray() {
      return this.repo.length === 0;
    }
  },
  beforeMount() {
    this.getRepos();
  }
};
</script>

<style scoped>
.card-link {
  cursor: pointer;
}
</style>