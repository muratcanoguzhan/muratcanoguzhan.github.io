<template>
  <div class="home">
    <div v-if="loading" class="loading">Loading blog posts...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="blogPosts.length === 0" class="no-posts">
      No blog posts found.
    </div>
    <div v-else>
      <div class="blog-list">
        <div v-for="post in paginatedPosts" :key="post.id" class="blog-card">
          <h2>{{ post.title }}</h2>
          <p class="date">{{ post.date }}</p>
          <div class="tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <p>{{ post.excerpt }}</p>
          <router-link :to="{ name: 'BlogPost', params: { id: post.id }}" class="read-more">
            Read More
          </router-link>
        </div>
      </div>
      
      <!-- Pagination only shown if needed -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          Previous
        </button>
        <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      blogPosts: [],
      loading: true,
      error: null,
      currentPage: 1,
      postsPerPage: 6 // Show 6 posts per page
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.blogPosts.length / this.postsPerPage)
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage
      const end = start + this.postsPerPage
      return this.blogPosts.slice(start, end)
    }
  },
  created() {
    this.fetchBlogPosts()
  },
  methods: {
    // Fetch blog posts from index.json
    async fetchBlogPosts() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('/blog-posts/index.json')
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts index')
        }
        
        const posts = await response.json()
        console.log(`Found ${posts.length} blog posts to load`, posts)
        
        // Process all posts from the index to add excerpt
        for (const post of posts) {
          try {
            const response = await fetch(`/blog-posts/${post.id}.md`)
            
            if (!response.ok) {
              console.warn(`Could not load blog post: ${post.id}.md`)
              continue
            }
            
            const mdContent = await response.text()
            post.excerpt = this.extractExcerptFromMarkdown(mdContent)
          } catch (err) {
            console.warn(`Error processing ${post.id}:`, err)
          }
        }
        
        // Sort posts by date (newest first) if we have more than one
        if (posts.length > 1) {
          this.blogPosts = posts.sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return dateB - dateA
          })
        } else {
          this.blogPosts = posts
        }
        
        this.loading = false
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        this.error = 'Failed to load blog posts. Please try again later.'
        this.loading = false
      }
    },
    
    extractExcerptFromMarkdown(mdContent) {
      // Extract excerpt (first paragraph)
      const paragraphMatch = mdContent.match(/^(.+?)(\n\n|$)/s)
      return paragraphMatch 
        ? paragraphMatch[1].substring(0, 150) + '...' 
        : mdContent.substring(0, 150) + '...'
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: var(--text-color);
  margin-bottom: 2rem;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.blog-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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

.read-more {
  display: inline-block;
  margin-top: 1rem;
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}

.loading, .error, .no-posts {
  text-align: center;
  margin: 3rem 0;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.no-posts {
  color: #7f8c8d;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.pagination-btn {
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--accent-color);
  opacity: 0.9;
}

.pagination-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9rem;
}
</style> 