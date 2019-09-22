<template>
  <div class="container mt-4 mb-5">
    <div class="row justify-content-center" v-for="message in messages" :key="message.id">
      <div class="card mb-3 text-center" style="width:18rem;">
        <div class="card-title">Commited By: {{ message.commit.committer.name }}</div>
        <div class="card-sub-title">Email: {{ message.commit.committer.email }}</div>
        <div class="card-body">
          <b>Commit message:</b>
          {{ message.commit.message }}
          <br />
          <b>Commited on:</b>
          {{ message.commit.committer.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/github";
export default {
  name: "Commit",
  props: ["name", "repo"],
  data() {
    return {
      messages: []
    };
  },
  methods: {
    async getCommits() {
      const commits = await api.getHistory(this.name, this.repo);
      this.messages = commits.data;
      console.log(commits.data);
    }
  },
  beforeMount() {
    this.getCommits();
  }
};
</script>

<style>
</style>