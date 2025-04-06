<template>
  <div class="about">
    <h1>About Me</h1>
    <div class="about-content">
      <div class="profile-image">
        <img :src="profileImage" alt="Animated Profile Image" />
      </div>
      <div class="bio">
        <h2>Murat</h2>
        <p class="title">Software Developer</p>
        <p>
          Welcome to my blog! I'm passionate about web development, especially SPAs. 
          I created this blog to share my knowledge and experiences with the world.
        </p>
        <p>
          When I'm not coding, you can find me hiking, reading, or trying out new recipes in the kitchen.
        </p>
        <div class="contact-info">
          <h3>Get in Touch</h3>
          <p>Email: m.c.ogzhan@gmail.com</p>
          <p>Follow me on social media using the links in the footer!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profileImage from '@/assets/profile.png'

export default {
  name: 'AboutView',
  data() {
    return {
      profileImage
    }
  }
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: var(--text-color);
  margin-bottom: 2rem;
}

.about-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.profile-image img {
  width: 100%;
  max-width: clamp(150px, 40vw, 300px);
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  object-fit: contain;
}

.bio {
  flex: 1;
  color: var(--text-color);
}

h2 {
  margin-top: 0;
  color: var(--text-color);
}

.title {
  color: var(--text-color);
  opacity: 0.7;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--text-color);
}

.contact-info {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-image {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .profile-image img {
    max-width: 200px;
  }
}

@media (max-width: 320px) {
  .profile-image img {
    max-width: 150px;
  }
}
</style> 