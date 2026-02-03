import { ref } from 'vue'
import type { Ref } from 'vue'

interface AuthState {
  token: string | null
  user: { id: number; username: string } | null
  isAuthenticated: boolean
}

const TOKEN_KEY = 'admin_token'
const USER_KEY = 'admin_user'

// Helper to safely access localStorage
const getStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(key)
}

const authState: Ref<AuthState> = ref({
  token: getStorage(TOKEN_KEY),
  user: (() => {
    const userStr = getStorage(USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  })(),
  isAuthenticated: !!getStorage(TOKEN_KEY),
})

export function useAuth() {
  async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' }
      }

      authState.value = {
        token: data.token,
        user: data.user,
        isAuthenticated: true,
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, data.token)
        localStorage.setItem(USER_KEY, JSON.stringify(data.user))
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'Network error' }
    }
  }

  function logout(): void {
    authState.value = {
      token: null,
      user: null,
      isAuthenticated: false,
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }

  async function verifyToken(): Promise<boolean> {
    if (!authState.value.token) {
      return false
    }

    try {
      const response = await fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${authState.value.token}`,
        },
      })

      if (!response.ok) {
        logout()
        return false
      }

      return true
    } catch {
      logout()
      return false
    }
  }

  function getAuthHeaders(): Record<string, string> {
    return authState.value.token
      ? { Authorization: `Bearer ${authState.value.token}` }
      : {}
  }

  return {
    authState,
    login,
    logout,
    verifyToken,
    getAuthHeaders,
  }
}
