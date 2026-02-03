#!/bin/bash

# Build script with validation and error handling

set -e

echo "🔨 Starting build process..."
echo ""

# Run TypeScript check
echo "📝 Running TypeScript check..."
npm run type-check || {
  echo "❌ TypeScript check failed"
  exit 1
}

# Build the project
echo "🏗️  Building project..."
npm run build || {
  echo "❌ Build failed"
  exit 1
}

echo ""
echo "✅ Build completed successfully!"
echo "📦 Output: dist/"
echo ""
echo "Preview: npm run preview"
