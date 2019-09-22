<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-xl-8 col-md-9 col-sm-10 col-xs-10">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            @keyup="setName"
            placeholder="Type the username or organisation name"
          />
        </div>
        <div class="row justify-content-center">
          <button type="button" :disabled="isEmpty" @click="getUsers" class="btn btn-primary">Find</button>
        </div>
        <div v-if="error" class="mt-4 row justify-content-center">
          <h5>User/Organization not found</h5>
        </div>
        <div class v-else>
          <div v-if="loading">
            <h4>Loading.......</h4>
          </div>
          <div v-if="results" class="media mt-5">
            <img
              v-if="results.avatar_url"
              :src="results.avatar_url"
              height="130"
              width="130"
              class="mr-3"
              @click="repos"
            />
            <div class="media-body">
              <h5 class="mt-0">
                <a @click="repos">{{ results.name }}</a>
                <li @click="repos" class="text-danger mt-1" v-if="results.type">{{ results.type }}</li>
              </h5>
              {{ results.bio}}
              <span>
                <a :href="results.blog" v-if="results.blog">Website: {{ results.blog }}</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/github";
import { router } from "../main";
export default {
  name: "SearchForm",
  data() {
    return {
      name: "",
      results: [],
      error: false,
      loading: false
    };
  },
  methods: {
    setName(event) {
      this.name = event.target.value;
    },
    async getUsers() {
      try {
        this.loading = true;
        const users = await api.users(this.name);
        this.results = users.data;
        this.error = false;
        this.loading = false;
      } catch {
        this.error = true;
      }
    },
    repos() {
      router.push(`/${this.results.login}`);
    }
  },
  computed: {
    isEmpty() {
      return this.name === "";
    }
  }
};
</script>

<style scoped>
.media-body a {
  color: blue;
  cursor: pointer;
}
li {
  cursor: pointer;
}
img {
  cursor: pointer;
}
</style>