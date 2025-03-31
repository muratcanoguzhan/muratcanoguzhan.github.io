<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} My Blog. All rights reserved.</p>
      <div class="social-links">
        <a href="https://github.com" target="_blank" class="social-link" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://twitter.com" target="_blank" class="social-link" aria-label="Twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" class="social-link" aria-label="LinkedIn">
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem 0;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: white;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #42b983;
}
</style> 