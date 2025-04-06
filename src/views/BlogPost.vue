<template>
  <div class="blog-post">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">
      <h2>Error Loading Blog Post</h2>
      <p>{{ error }}</p>
      <div class="debug-info">
        <p>Post ID: {{ id }}</p>
        <p>Expected file: /blog-posts/{{ id }}.md</p>
        <router-link to="/blog" class="back-link">Return to Blog</router-link>
      </div>
    </div>
    <div v-else>
      <div class="post-header">
        <router-link to="/blog" class="back-link">&larr; Back to Posts</router-link>
        <h1>{{ postData.title }}</h1>
        <p class="date">{{ postData.date }}</p>
        <div class="tags">
          <span v-for="tag in postData.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
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
      postData: {
        title: '',
        date: '',
        tags: []
      },
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
    this.fetchPostData()
  },
  methods: {
    async fetchPostData() {
      this.loading = true
      this.error = null
      
      try {
        // First, fetch the metadata from index.json
        const indexResponse = await fetch('/blog-posts/index.json')
        
        if (!indexResponse.ok) {
          throw new Error('Failed to fetch blog posts index')
        }
        
        const posts = await indexResponse.json()
        const post = posts.find(p => p.id === this.id)
        
        if (!post) {
          throw new Error(`Blog post with ID ${this.id} not found in index`)
        }
        
        this.postData = post
        
        // Now fetch the actual blog post content
        await this.fetchBlogPost()
      } catch (err) {
        console.error('Error fetching post data:', err)
        this.error = `Failed to load the blog post "${this.id}". ${err.message}`
        this.loading = false
      }
    },
    
    async fetchBlogPost() {
      try {
        console.log(`Fetching blog post content: ${this.id}.md`)
        // Add a cache-busting parameter to prevent browser caching
        const response = await fetch(`/blog-posts/${this.id}.md?_=${new Date().getTime()}`)
        
        if (!response.ok) {
          console.error(`Blog post content not found: ${this.id}.md, status: ${response.status}`)
          throw new Error(`Blog post content not found (${response.status})`)
        }
        
        this.content = await response.text()
        console.log('Successfully loaded post content:', this.content.substring(0, 100) + '...')
        
        this.loading = false
      } catch (err) {
        console.error('Error fetching blog post content:', err)
        this.error = `Failed to load the blog post content for "${this.id}". Please check that the file exists.`
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

.post-header h1 {
  font-size: 2.5rem;
  margin: 1rem 0 0.5rem;
  color: var(--text-color);
}

.date {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background-color: var(--border-color);
  color: var(--text-color);
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}

.back-link {
  display: inline-block;
  color: var(--text-color);
  text-decoration: none;
  margin-bottom: 1rem;
}

.back-link:hover {
  color: var(--accent-color);
}

/* Global styles for rendered markdown content */
.content {
  line-height: 1.6;
  color: var(--text-color);
}

.content :deep(h1) {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.content :deep(h2) {
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: var(--text-color);
}

.content :deep(h3) {
  font-size: 1.5rem;
  margin: 1.5rem 0 0.8rem;
  color: var(--text-color);
}

.content :deep(p) {
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.content :deep(ul), .content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  color: var(--text-color);
}

.content :deep(li) {
  margin-bottom: 0.5rem;
}

.content :deep(blockquote) {
  border-left: 4px solid var(--accent-color);
  padding-left: 1rem;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  color: var(--text-color);
  opacity: 0.8;
}

.content :deep(pre) {
  background-color: var(--border-color);
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.content :deep(code) {
  font-family: monospace;
  background-color: var(--border-color);
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9em;
  color: var(--text-color);
}

.content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 4px;
}

.content :deep(a) {
  color: var(--accent-color);
  text-decoration: none;
}

.content :deep(a:hover) {
  text-decoration: underline;
}

.content :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 2rem 0;
}

.content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.content :deep(th), .content :deep(td) {
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  text-align: left;
  color: var(--text-color);
}

.content :deep(th) {
  background-color: var(--border-color);
}
</style> 