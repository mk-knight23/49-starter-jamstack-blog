<script setup lang="ts">
import type { Comment } from '@/utils/content/schema'

defineProps<{
  comments: Comment[]
  loading: boolean
}>()
</script>

<template>
  <div class="space-y-6">
    <div v-if="loading" class="text-center py-8 text-gray-600">
      Loading comments...
    </div>

    <div v-else-if="comments.length === 0" class="text-center py-8 text-gray-600">
      No comments yet. Be the first to comment!
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="bg-gray-50 rounded-lg p-4"
      >
        <div class="flex justify-between items-start mb-2">
          <div>
            <div class="font-medium text-gray-900">{{ comment.author_name }}</div>
            <div class="text-sm text-gray-600">
              {{ new Date(comment.created_at).toLocaleDateString() }}
            </div>
          </div>
        </div>
        <div class="text-gray-700 prose prose-sm max-w-none">
          {{ comment.content }}
        </div>
      </div>
    </div>
  </div>
</template>
