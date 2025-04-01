const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  // Set the correct publicPath for GitHub Pages
  // This should be the name of your repo in production, but development needs '/'
  publicPath: process.env.NODE_ENV === 'production'
    ? '/blog-app/'
    : '/',
  
  // Configure webpack-dev-server to properly serve .md files
  devServer: {
    static: {
      directory: 'public',
      serveIndex: true,
      watch: true
    }
  }
})
