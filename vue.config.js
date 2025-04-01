const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  // Set the correct publicPath for GitHub Pages
  publicPath: './',
  
  // Configure webpack-dev-server to properly serve .md files
  devServer: {
    static: {
      directory: 'public',
      serveIndex: true,
      watch: true
    }
  }
})
