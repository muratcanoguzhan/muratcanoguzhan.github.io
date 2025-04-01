import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Add Font Awesome CDN for social media icons
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
document.head.appendChild(link)

const app = createApp(App)
app.use(router)
app.mount('#app')
