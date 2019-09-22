<template>
  <div class="nav">
    <div>
      <router-link to="/">VueGithub</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  background-color: #f8fff8;
  padding: 1rem;
  font-weight: bold;
  font-size: 1.6rem;
}
.nav a {
  color: black;
}
.nav a:hover {
  text-decoration: none;
}
</style>