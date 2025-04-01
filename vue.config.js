const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  // Configure webpack-dev-server to properly serve .md files
  devServer: {
    static: {
      directory: 'public',
      serveIndex: true,
      watch: true,
      // Configure MIME types
      mimeTypes: {
        'text/markdown': ['md']
      }
    }
  }
})
