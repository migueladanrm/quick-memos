<template>
  <div class="h-full border-2 border-slate-500 rounded-md w-full">
    <ul>
      <NoteListItem v-for="note in props.notes" :key="note.id" :note="note" @click="selectNote(note.id)" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Note } from "~/types";
import NoteListItem from "./NoteListItem.vue";

interface Props {
  notes: Note[];
}

const props = defineProps<Props>();
const emit = defineEmits(['note-selected']);

const selectNote = (noteId: number) => {
  emit('note-selected', noteId);
};
</script>
