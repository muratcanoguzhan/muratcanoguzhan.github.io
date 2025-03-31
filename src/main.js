import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Add Font Awesome CDN for social media icons
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
document.head.appendChild(link)

// Create Vue app and mount it
const app = createApp(App)

// Use the router
app.use(router)

// Mount the app
app.mount('#app')
