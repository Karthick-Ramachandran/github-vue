<template>
  <div class="container">
    <div class="row justify-content-center mt-3" v-if="loading">Loading....</div>

    <div class="row justify-content-center mt-5" v-if="filedata.length">
      <div v-for="data in filedata" :key="data.download_url">
        <div class="card text-center" style="width: 18rem;">
          <div class="card-title">{{ data.name }}</div>
          <div class="card-body">
            <a :href="data.download_url">See the data</a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="row justify-content-center"
      v-if="filedata.type"
      v-html="base.decode(filedata.content)"
    ></div>
  </div>
</template>

<script>
import api from "../api/github";
import base64 from "base-64";
export default {
  name: "Content",
  props: ["name", "repo", "content"],
  data() {
    return {
      base: base64,
      filedata: [],
      loading: false
    };
  },
  methods: {
    async getData() {
      this.loading = true;
      const file = await api.getContents(this.name, this.repo, this.content);
      this.filedata = file.data;
      this.loading = false;
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>

<style>
</style>