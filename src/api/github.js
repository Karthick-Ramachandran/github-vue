import axios from "axios";

const URL = "https://api.github.com";

export default {
  users(username) {
    return axios.get(`${URL}/users/${username}`);
  },
  repos(name, page) {
    return axios.get(`${URL}/users/${name}/repos?page=${page}`);
  },
  singleRepo(name, repo) {
    return axios.get(`${URL}/repos/${name}/${repo}/contents`);
  },
  getContents(name, repo, content) {
    return axios.get(`${URL}/repos/${name}/${repo}/contents/${content}`);
  },
  getHistory(name, repo) {
    return axios.get(`${URL}/repos/${name}/${repo}/commits`);
  }
};
