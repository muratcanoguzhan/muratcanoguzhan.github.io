<template>
  <div class="blog-post">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">
      <h2>Error Loading Blog Post</h2>
      <p>{{ error }}</p>
      <div class="debug-info">
        <p>Post ID: {{ id }}</p>
        <p>Expected file: /blog-posts/{{ id }}.md</p>
        <router-link to="/blog" class="back-link">Return to Blog Posts</router-link>
      </div>
    </div>
    <div v-else>
      <div class="post-header">
        <router-link to="/blog" class="back-link">&larr; Back to Posts</router-link>
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
      if (!this.content) return ''
      
      try {
        const md = new MarkdownIt({
          html: true,
          linkify: true,
          typographer: true
        })
        
        return md.render(this.content)
      } catch (error) {
        console.error('Error rendering markdown:', error)
        return '<p>Error rendering content</p>'
      }
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
        // Add a cache-busting parameter to prevent browser caching
        const response = await fetch(`/blog-posts/${this.id}.md?_=${new Date().getTime()}`)
        
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

/* Global styles for rendered markdown content */
.content {
  line-height: 1.6;
}

.content :deep(h1) {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.content :deep(h2) {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #2c3e50;
}

.content :deep(h3) {
  font-size: 1.5rem;
  margin: 1.5rem 0 0.8rem;
  color: #2c3e50;
}

.content :deep(p) {
  margin-bottom: 1.5rem;
}

.content :deep(ul), .content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.content :deep(li) {
  margin-bottom: 0.5rem;
}

.content :deep(blockquote) {
  border-left: 4px solid #42b983;
  padding-left: 1rem;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  color: #777;
}

.content :deep(pre) {
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.content :deep(code) {
  font-family: monospace;
  background-color: #f8f8f8;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9em;
}

.content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 4px;
}

.content :deep(a) {
  color: #42b983;
  text-decoration: none;
}

.content :deep(a:hover) {
  text-decoration: underline;
}

.content :deep(hr) {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 2rem 0;
}

.content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.content :deep(th), .content :deep(td) {
  border: 1px solid #e0e0e0;
  padding: 0.5rem;
  text-align: left;
}

.content :deep(th) {
  background-color: #f8f8f8;
}
</style> 