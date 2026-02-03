import { ref } from 'vue'
import { useAuth } from './useAuth'

const API_BASE = '/api'

export function useApi() {
  const { getAuthHeaders } = useAuth()

  async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...options.headers,
      },
    })
  }

  return {
    // Posts
    getPosts: (publishedOnly = true) =>
      fetch(`${API_BASE}/posts?published=${publishedOnly}`).then(r => r.json()),

    getPostBySlug: (slug: string) =>
      fetch(`${API_BASE}/posts/${slug}`).then(r => r.json()),

    createPost: (post: any) =>
      fetchWithAuth(`${API_BASE}/posts`, {
        method: 'POST',
        body: JSON.stringify(post),
      }).then(r => r.json()),

    updatePost: (id: number, post: any) =>
      fetchWithAuth(`${API_BASE}/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(post),
      }).then(r => r.json()),

    deletePost: (id: number) =>
      fetchWithAuth(`${API_BASE}/posts/${id}`, {
        method: 'DELETE',
      }).then(r => r.json()),

    // Comments
    getComments: (postId: number, approvedOnly = true) =>
      fetch(`${API_BASE}/posts/${postId}/comments?approved=${approvedOnly}`).then(r => r.json()),

    createComment: (comment: any) =>
      fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
      }).then(r => r.json()),

    getPendingComments: () =>
      fetchWithAuth(`${API_BASE}/comments/pending`).then(r => r.json()),

    approveComment: (id: number) =>
      fetchWithAuth(`${API_BASE}/comments/${id}/approve`, {
        method: 'PUT',
      }).then(r => r.json()),

    deleteComment: (id: number) =>
      fetchWithAuth(`${API_BASE}/comments/${id}`, {
        method: 'DELETE',
      }).then(r => r.json()),

    // Analytics
    trackPageView: (postId: number, isUnique = false) =>
      fetch(`${API_BASE}/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, is_unique: isUnique }),
      }).then(r => r.json()),

    getPopularPosts: (limit = 10) =>
      fetch(`${API_BASE}/analytics/popular?limit=${limit}`).then(r => r.json()),

    getAllAnalytics: () =>
      fetchWithAuth(`${API_BASE}/analytics/all`).then(r => r.json()),
  }
}
