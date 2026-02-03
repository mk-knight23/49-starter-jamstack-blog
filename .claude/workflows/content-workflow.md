# Content Management Workflow

## Creating a New Post

1. **Use the post generator script:**
   ```bash
   .claude/scripts/new-post.sh "Your Post Title"
   ```

2. **Edit the frontmatter:**
   - `title`: Post title
   - `description`: Short description for SEO
   - `excerpt`: Summary for post cards
   - `date`: Publication date (YYYY-MM-DD)
   - `author`: Author name
   - `category`: Primary category
   - `tags`: Array of tags
   - `draft`: Set to `true` to exclude from build
   - `featured`: Set to `true` for featured section

3. **Write content in Markdown:**
   - Use standard Markdown syntax
   - Code blocks will be syntax highlighted
   - Images go in `public/` directory

## Content Best Practices

- **Frontmatter Required**: All posts must have complete frontmatter
- **Excerpt Length**: Keep excerpts under 160 characters
- **Tags**: Use 3-5 relevant tags per post
- **Categories**: Use existing categories when possible
- **Draft Posts**: Use `draft: true` for work-in-progress posts

## Post Structure

```
---
title: Post Title
description: SEO description
excerpt: Brief summary
date: 2025-01-15
author: Author Name
category: Category
tags:
  - tag1
  - tag2
draft: false
featured: false
---

Post content in Markdown...

## Heading

Content with **bold**, *italic*, and `code`.
```
