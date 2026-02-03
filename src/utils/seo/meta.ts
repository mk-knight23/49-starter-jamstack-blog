import type { Post } from '@/utils/content/schema'

export interface SiteMeta {
  title: string
  description: string
  url: string
  image?: string
}

const siteConfig = {
  title: 'Vue SSG Editorial Blog',
  description: 'A high-performance editorial blog built with Vue 3, Vite-SSG, and TypeScript',
  url: 'https://49-starter-jamstack-blog.vercel.app',
  author: 'M. Kazi',
}

export function generateMeta(post?: Post): SiteMeta {
  if (post) {
    return {
      title: `${post.title} | ${siteConfig.title}`,
      description: post.excerpt || post.description || siteConfig.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      image: post.image,
    }
  }

  return {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
  }
}

export function generateOpenGraph(meta: SiteMeta, post?: Post) {
  return {
    'og:type': post ? 'article' : 'website',
    'og:title': meta.title,
    'og:description': meta.description,
    'og:url': meta.url,
    'og:image': meta.image || `${siteConfig.url}/og-image.png`,
    'og:site_name': siteConfig.title,
    ...(post && {
      'article:published_time': post.date,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': post.tags?.join(','),
    }),
  }
}

export function generateTwitterCard(meta: SiteMeta) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': meta.title,
    'twitter:description': meta.description,
    'twitter:image': meta.image || `${siteConfig.url}/og-image.png`,
    'twitter:site': '@mkazi_dev',
  }
}

export function generateStructuredData(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.description,
    image: post.image || `${siteConfig.url}/og-image.png`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
  }
}
