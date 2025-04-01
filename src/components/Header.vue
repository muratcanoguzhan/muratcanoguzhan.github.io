<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo-link">
        <h1 class="logo">Murat Oguzhan</h1>
      </router-link>
      <nav class="nav">
        <router-link to="/blog" class="nav-link">Blog Posts</router-link>
        <router-link to="/" class="nav-link">About Me</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
.header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo-link {
  text-decoration: none;
  color: white;
}

.logo {
  margin: 0;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.logo-link:hover .logo {
  color: #42b983;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover, .router-link-active {
  color: #42b983;
}
</style> 