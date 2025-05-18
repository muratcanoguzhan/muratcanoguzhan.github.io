<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <Header v-if="!isLayoutFree" :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
    <main class="main-content" :class="{ 'layout-free': isLayoutFree }">
      <router-view/>
    </main>
    <Footer v-if="!isLayoutFree" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      isDarkMode: false
    }
  },
  computed: {
    isLayoutFree() {
      return this.$route.meta && this.$route.meta.layoutFree;
    }
  },
  created() {
    // Check for user's preferred color scheme or saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      this.isDarkMode = savedMode === 'true';
    } else {
      // Check system preference
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply dark mode to document when component is created
    this.applyThemeToDocument();
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode);
      this.applyThemeToDocument();
    },
    applyThemeToDocument() {
      // Apply dark mode class to the document element
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    }
  }
}
</script>

<style>
:root {
  /* Light theme (default) */
  --background-color: #ffffff;
  --text-color: #2c3e50;
  --accent-color: #42b983;
  --header-bg: #2c3e50;
  --header-text: #ffffff;
  --border-color: #e2e8f0;
}

.dark-mode {
  /* Dark theme */
  --background-color: #1a202c;
  --text-color: #e2e8f0;
  --accent-color: #4fd1c5;
  --header-bg: #171923;
  --header-text: #e2e8f0;
  --border-color: #2d3748;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.layout-free {
  padding: 0;
  margin: 0;
}

a {
  color: var(--accent-color);
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 0.5rem;
}
</style>
