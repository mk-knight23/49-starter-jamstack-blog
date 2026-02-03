<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  submit: [data: { author_name: string; author_email: string; content: string }]
}>()

const form = ref({
  author_name: '',
  author_email: '',
  content: '',
})

const errors = ref<Record<string, string>>({})
const submitting = ref(false)

function validate() {
  errors.value = {}

  if (!form.value.author_name.trim()) {
    errors.value.author_name = 'Name is required'
  }

  if (!form.value.author_email.trim()) {
    errors.value.author_email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.author_email)) {
    errors.value.author_email = 'Invalid email address'
  }

  if (!form.value.content.trim()) {
    errors.value.content = 'Comment is required'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validate()) return

  submitting.value = true
  emit('submit', form.value)
  submitting.value = false
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input
          v-model="form.author_name"
          type="text"
          :disabled="submitting"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <div v-if="errors.author_name" class="text-red-600 text-sm mt-1">{{ errors.author_name }}</div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          v-model="form.author_email"
          type="email"
          :disabled="submitting"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <div v-if="errors.author_email" class="text-red-600 text-sm mt-1">{{ errors.author_email }}</div>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
      <textarea
        v-model="form.content"
        rows="4"
        :disabled="submitting"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      ></textarea>
      <div v-if="errors.content" class="text-red-600 text-sm mt-1">{{ errors.content }}</div>
    </div>

    <button
      type="submit"
      :disabled="submitting"
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ submitting ? 'Submitting...' : 'Submit Comment' }}
    </button>

    <p class="text-sm text-gray-600">
      Your comment will be visible after moderation.
    </p>
  </form>
</template>
