#!/bin/bash

# Script to create a new blog post with frontmatter template

if [ -z "$1" ]; then
  echo "Usage: ./new-post.sh 'Post Title'"
  exit 1
fi

TITLE="$1"
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
DATE=$(date +%Y-%m-%d)
FILENAME="src/content/posts/${SLUG}.md"

cat > "$FILENAME" << EOF
---
title: $TITLE
description: ''
excerpt: ''
date: $DATE
author: Your Name
category: Engineering
tags:
  - tag1
  - tag2
draft: false
featured: false
---

Write your content here using Markdown.
EOF

echo "Created new post: $FILENAME"
echo "Edit the file to add your content"
