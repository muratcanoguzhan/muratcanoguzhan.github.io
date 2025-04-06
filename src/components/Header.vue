<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo-link">
        <h1 class="logo">Murat Oguzhan</h1>
      </router-link>
      <nav class="nav">
        <router-link to="/blog" class="nav-link">Blog</router-link>
        <router-link to="/" class="nav-link">About Me</router-link>
        <button @click="toggleDarkMode" class="theme-toggle" aria-label="Toggle dark mode">
          <i :class="['fas', isDarkMode ? 'fa-sun' : 'fa-moon']"></i>
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.$emit('toggle-dark-mode');
    }
  }
}
</script>

<style scoped>
.header {
  background-color: var(--header-bg);
  color: var(--header-text);
  padding: 1rem 0;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.logo-link {
  text-decoration: none;
  color: var(--header-text);
}

.logo {
  margin: 0;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.logo-link:hover .logo {
  color: var(--accent-color);
}

.nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: var(--header-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover, .router-link-active {
  color: var(--accent-color);
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--header-text);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease, transform 0.3s ease;
}

.theme-toggle:hover {
  color: var(--accent-color);
  transform: rotate(15deg);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.75rem;
  }
  
  .logo {
    font-size: 1.25rem;
  }
  
  .nav {
    width: 100%;
    justify-content: space-around;
    gap: 0.75rem;
  }
  
  .nav-link {
    font-size: 0.95rem;
  }
}

/* For very small screens */
@media (max-width: 320px) {
  .nav {
    gap: 0.5rem;
  }
  
  .nav-link {
    font-size: 0.85rem;
  }
  
  .theme-toggle {
    font-size: 1rem;
  }
}
</style> 