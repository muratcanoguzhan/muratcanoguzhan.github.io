<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} Murat Oguzhan. All rights reserved.</p>
      <div class="social-links">
        <a href="https://github.com/muratcanoguzhan" target="_blank" class="social-link" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/muratcanoguzhan/" target="_blank" class="social-link" aria-label="LinkedIn">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="https://bsky.app/profile/muratoguzhan.bsky.social" target="_blank" class="social-link bluesky-link" aria-label="Bluesky">
          <img src="/bsky-favicon.png" alt="Bluesky" class="bsky-icon" />
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
  align-items: center;
}

.social-link {
  color: white;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.social-link:hover {
  color: #42b983;
}

.bluesky-link:hover {
  opacity: 0.8;
}

.bsky-icon {
  width: 19px;
  height: 19px;
}
</style> 