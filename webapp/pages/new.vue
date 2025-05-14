<template>
  <NoteEditor :note @on-save="saveNote" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NoteEditor from '~/components/NoteEditor.vue'
import type { Note } from '~/types';

const router = useRouter();
const note = ref<Note>({
  id: -1,
  title: '',
  updatedAt: new Date(),
  createdAt: new Date(),
  content: ''
});

const saveNote = async (note: Pick<Note, "title" | "content">) => {
  const response = await $fetch<Note>('/api/quickmemos/notes', {
    method: 'POST',
    body: note
  });

  if (response) {
    router.push(`/notes/${response.id}`);
  }
}
</script>