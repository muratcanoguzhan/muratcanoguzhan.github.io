<template>
  <div class="home">
    <h1>Blog Posts</h1>
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
      mdFiles: [],
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
    this.fetchAvailableFiles()
  },
  methods: {
    // Fetch list of available markdown files from index.json
    async fetchAvailableFiles() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('/blog-posts/index.json')
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts index')
        }
        
        this.mdFiles = await response.json()
        console.log(`Found ${this.mdFiles.length} markdown files to load`, this.mdFiles)
        
        // Now fetch all blog posts
        await this.fetchBlogPosts()
      } catch (err) {
        console.error('Error fetching blog post index:', err)
        this.error = 'Failed to load blog posts. Please try again later.'
        this.loading = false
      }
    },
    
    async fetchBlogPosts() {
      try {
        let posts = []
        
        // Process all Markdown files from the index
        for (const filename of this.mdFiles) {
          try {
            const id = filename.replace('.md', '')
            const response = await fetch(`/blog-posts/${filename}`)
            
            if (!response.ok) {
              console.warn(`Could not load blog post: ${filename}`)
              continue
            }
            
            const mdContent = await response.text()
            const postData = this.extractMetadataFromMarkdown(mdContent, id)
            posts.push(postData)
          } catch (err) {
            console.warn(`Error processing ${filename}:`, err)
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
    
    extractMetadataFromMarkdown(mdContent, id) {
      // Extract title (first heading)
      const titleMatch = mdContent.match(/^#\s+(.+)$/m)
      const title = titleMatch ? titleMatch[1] : id
      
      // Extract date
      const dateMatch = mdContent.match(/Date:\s+(.+)$/m)
      const date = dateMatch ? dateMatch[1] : 'Unknown Date'
      
      // Extract excerpt (first paragraph after a heading)
      const paragraphMatch = mdContent.match(/##.+\n\n(.+?)(\n\n|$)/s)
      const excerpt = paragraphMatch 
        ? paragraphMatch[1].substring(0, 150) + '...' 
        : mdContent.substring(0, 150).replace(/^#.+\n/, '') + '...'
      
      return {
        id,
        title,
        date,
        excerpt: excerpt.trim()
      }
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
  color: #2c3e50;
  margin-bottom: 2rem;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.blog-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.date {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.read-more {
  display: inline-block;
  margin-top: 1rem;
  color: #42b983;
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
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #3aa876;
}

.pagination-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9rem;
}
</style> 