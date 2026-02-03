import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Post } from '@/utils/content/schema'

// Sample posts data (will be replaced with real content loading)
const samplePosts: Post[] = [
  {
    id: 'mastering-ssg',
    slug: 'mastering-static-site-generation',
    title: 'Mastering Static Site Generation',
    description: 'How SSG is redefining performance on the modern web',
    excerpt: 'How SSG is redefining performance on the modern web',
    date: '2025-10-12',
    author: 'M. Kazi',
    category: 'Engineering',
    tags: ['SSG', 'Performance', 'Vue', 'Vite'],
    draft: false,
    featured: true,
    content: '',
    html: `<p>Static Site Generation (SSG) has evolved from simple HTML emitters to sophisticated, hydration-aware build engines. In 2026, the boundary between static and dynamic is blurring.</p>
<h2>The Performance Mandate</h2>
<p>Modern users expect instant interactions. Pre-rendering the critical path ensures that the Initial Meaningful Paint happens within milliseconds, while subsequent client-side navigation feels native.</p>
<blockquote>"The fastest request is the one that never leaves the edge."</blockquote>
<p>By leveraging Vite-SSG, we distribute processed HTML to global CDNs, reducing Time to First Byte (TTFB) to negligible levels.</p>
<h2>Hydration Strategies</h2>
<p>Partial hydration allows us to selectively hydrate interactive components while keeping the rest as static HTML. This approach significantly reduces JavaScript bundle sizes and improves Time to Interactive (TTI).</p>`,
    readTimeCalc: '8 min read',
  },
  {
    id: 'design-tokens',
    slug: 'scale-with-design-tokens',
    title: 'Scale with Design Tokens',
    description: 'Building resilient systems with semantic variables',
    excerpt: 'Building resilient systems with semantic variables',
    date: '2025-10-10',
    author: 'M. Kazi',
    category: 'Design',
    tags: ['Design System', 'CSS', 'Architecture'],
    draft: false,
    featured: false,
    content: '',
    html: `<p>Design tokens are the atomic units of a design system. They represent the smallest pieces of design decisions, capturing visual attributes like colors, typography, and spacing.</p>
<h2>Semantic vs Primitive</h2>
<p>Primitive tokens represent raw values like <code>#3b82f6</code>, while semantic tokens map to usage contexts like <code>color-primary</code>. This separation allows for theme switching without touching component code.</p>`,
    readTimeCalc: '6 min read',
  },
  {
    id: 'future-of-vue',
    slug: 'the-future-of-vue-35',
    title: 'The Future of Vue 3.5+',
    description: 'Exploring Vapor mode and the evolution of reactivity',
    excerpt: 'Exploring Vapor mode and the evolution of reactivity',
    date: '2025-10-08',
    author: 'M. Kazi',
    category: 'Vue',
    tags: ['Vue', 'Reactivity', 'Performance', 'Vapor Mode'],
    draft: false,
    featured: false,
    content: '',
    html: `<p>Vue 3.5 introduced significant improvements to the reactivity system. The upcoming Vapor mode promises even better performance by eliminating the virtual DOM overhead for pure components.</p>
<h2>Signal-Based Reactivity</h2>
<p>The new signal API provides fine-grained reactivity with better performance characteristics. Unlike Vue's traditional reactive objects, signals update only the parts of the DOM that actually changed.</p>`,
    readTimeCalc: '10 min read',
  },
  {
    id: 'engineering-culture',
    slug: 'building-engineering-culture',
    title: 'Building Engineering Culture',
    description: 'How to foster technical excellence in distributed teams',
    excerpt: 'How to foster technical excellence in distributed teams',
    date: '2025-10-05',
    author: 'M. Kazi',
    category: 'Leadership',
    tags: ['Leadership', 'Culture', 'Teams', 'Management'],
    draft: false,
    featured: false,
    content: '',
    html: `<p>Engineering culture isn't about ping pong tables and free snacks. It's about shared values, clear communication, and continuous improvement.</p>
<h2>Psychological Safety</h2>
<p>The foundation of any healthy engineering culture is psychological safety. Team members must feel safe to take risks, ask questions, and admit mistakes without fear of punishment.</p>`,
    readTimeCalc: '12 min read',
  },
]

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>(samplePosts)
  const loaded = ref(true)

  async function initialize() {
    // Posts are already loaded
  }

  const getPostById = async (id: string) => {
    await initialize()
    return posts.value.find(p => p.id === id)
  }

  const getPostBySlug = async (slug: string) => {
    await initialize()
    return posts.value.find(p => p.slug === slug)
  }

  const getPostsByCategory = async (category: string) => {
    await initialize()
    return posts.value.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }

  const getPostsByTag = async (tag: string) => {
    await initialize()
    return posts.value.filter(p => p.tags?.includes(tag))
  }

  const getAllTagsList = async () => {
    await initialize()
    const tags = new Set<string>()
    posts.value.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }

  const getAllCategoriesList = async () => {
    await initialize()
    const categories = new Set<string>()
    posts.value.forEach(post => categories.add(post.category))
    return Array.from(categories).sort()
  }

  const featuredPosts = computed(() =>
    posts.value.filter(p => p.featured)
  )

  const latestPosts = computed(() =>
    posts.value
  )

  return {
    posts,
    loaded,
    initialize,
    getPostById,
    getPostBySlug,
    getPostsByCategory,
    getPostsByTag,
    getAllTagsList,
    getAllCategoriesList,
    featuredPosts,
    latestPosts,
  }
})
