<template>
  <div class="blog-post">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="post-header">
        <router-link to="/" class="back-link">&larr; Back to Posts</router-link>
      </div>
      <div class="content" v-html="renderedContent"></div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'BlogPostView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: '',
      loading: true,
      error: null
    }
  },
  computed: {
    renderedContent() {
      const md = new MarkdownIt()
      return md.render(this.content)
    }
  },
  mounted() {
    this.fetchBlogPost()
  },
  methods: {
    async fetchBlogPost() {
      this.loading = true
      this.error = null
      
      try {
        console.log(`Fetching blog post: ${this.id}.md`)
        const response = await fetch(`/blog-posts/${this.id}.md`)
        
        if (!response.ok) {
          console.error(`Blog post not found: ${this.id}.md, status: ${response.status}`)
          throw new Error(`Blog post not found (${response.status})`)
        }
        
        this.content = await response.text()
        console.log('Successfully loaded post content:', this.content.substring(0, 100) + '...')
        
        this.loading = false
      } catch (err) {
        console.error('Error fetching blog post:', err)
        this.error = `Failed to load the blog post "${this.id}". Please check that the file exists.`
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading, .error {
  text-align: center;
  margin: 3rem 0;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.post-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  color: #2c3e50;
  text-decoration: none;
  margin-bottom: 1rem;
}

.back-link:hover {
  color: #42b983;
}

.content {
  line-height: 1.6;
}

.content h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.content h2 {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #2c3e50;
}

.content p {
  margin-bottom: 1.5rem;
}
</style> 