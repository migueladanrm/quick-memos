<template>
  <div class="flex items-center gap-2 border-b border-slate-600 hover:bg-slate-700 px-4 py-2">
    <UIcon name="ri:sticky-note-line" class="text-3xl" />
    <div class="flex flex-col">
      <span class="font-bold text-lg">{{ note.title }}</span>
      <span class="font-medium text-sm text-slate-400">{{ formatDate(note.updatedAt) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/types';

defineProps<{ note: Note }>();

const formatDate = (datetime: string | Date): string => {
  if (!datetime) return '';
  const date = typeof datetime === 'string' ? new Date(datetime) : datetime;
  return date.toLocaleString();
};
</script>

<style scoped>
.note-list-item {
  display: flex;
}
</style>