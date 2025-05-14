<template>
  <div>
    <NoteEditor v-if="note" :note @on-delete="deleteNote" @on-save="saveNote" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import NoteEditor from '~/components/NoteEditor.vue'
import type { Note } from '~/types';

const route = useRoute();
const router = useRouter();
const noteId = computed(() => route.params.noteId);

const note = ref<Note | null>(null);

const fetchNote = async () => {
  const response = await $fetch<Note>(`/api/quickmemos/notes/${noteId.value}`)

  note.value = response;
}

const deleteNote = async (noteId: number) => {
  await $fetch<Note>(`/api/quickmemos/notes/${noteId}`, {
    method: 'DELETE'
  });
  router.push('/');
}

const saveNote = async (note: Partial<Note>) => {
  await $fetch<Note>(`/api/quickmemos/notes/${noteId.value}`, {
    method: 'PATCH',
    body: note
  });
  window.location.reload();
}


onMounted(fetchNote);
</script>