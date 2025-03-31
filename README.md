# Vue.js Blog with Markdown Support

This is a simple blog application built with Vue.js that allows you to write blog posts in Markdown format.

## Features

- Header with navigation menu
- Blog post listing page with pagination
- Individual blog post pages with Markdown rendering
- About page
- Footer with social media links
- Responsive design
- Dynamic loading of blog posts from Markdown files

## Project Setup

```bash
# Install dependencies
npm install

# Serve for development at localhost:8080
npm run serve

# Build for production
npm run build
```

## Adding New Blog Posts

To add a new blog post:

1. Create a new Markdown (.md) file in the `public/blog-posts` directory. The filename will be used as the post ID in the URL.
   For example, a file named `my-post.md` will be accessible at `/blog/my-post`.

2. Format your blog post with the following structure:
   ```markdown
   # Your Post Title
   
   Date: Month DD, YYYY
   
   ## Introduction
   
   Your introduction paragraph goes here.
   
   ## Main Content
   
   Your main content here...
   ```

3. Add the filename to the `index.json` file in the `public/blog-posts` directory:
   ```json
   [
     "first-post.md",
     "second-post.md",
     "third-post.md",
     "your-new-post.md"
   ]
   ```

The blog will automatically:
- Load the list of posts from index.json
- Fetch each Markdown file
- Extract the title from the first heading (`# Title`)
- Extract the date from the "Date:" line
- Create an excerpt from the first paragraph after a heading

## How It Works

The application:

1. **Reads Available Files**: Fetches the list of markdown files from index.json
2. **Loads Each Post**: Fetches each .md file listed in the index
3. **Parses Content**: Extracts metadata like title, date, and excerpt from the Markdown content
4. **Sorts Posts**: Displays posts in reverse chronological order (newest first)
5. **Paginates Results**: Shows 6 posts per page when you have many posts
6. **Renders Content**: Uses markdown-it to render the Markdown as HTML in the blog post view

This approach gives you complete control over which posts are visible and in what order, while maintaining the simplicity of writing in Markdown.

## Deploying to GitHub Pages

1. Make sure your repository is configured for GitHub Pages.
2. Run `npm run build` to create a production build.
3. Deploy the contents of the `dist` directory to GitHub Pages.

You can automate this process with GitHub Actions by setting up a workflow file.

## License

MIT
