<template>
  <div class="about">
    <h1>About Me</h1>
    <div class="about-content">
      <div class="profile-image">
        <img src="https://via.placeholder.com/150" alt="Profile Image" />
      </div>
      <div class="bio">
        <h2>John Doe</h2>
        <p class="title">Web Developer & Blogger</p>
        <p>
          Welcome to my blog! I'm passionate about web development, especially Vue.js. 
          I created this blog to share my knowledge and experiences with the world.
        </p>
        <p>
          When I'm not coding, you can find me hiking, reading, or trying out new recipes in the kitchen.
        </p>
        <div class="contact-info">
          <h3>Get in Touch</h3>
          <p>Email: john.doe@example.com</p>
          <p>Follow me on social media using the links in the footer!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.about-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.profile-image img {
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.bio {
  flex: 1;
}

h2 {
  margin-top: 0;
  color: #2c3e50;
}

.title {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.contact-info {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

h3 {
  color: #2c3e50;
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
</style> 