<template>
  <div class="h-screen grid grid-rows-[1fr_auto] bg-gray-700">
    <div class="flex justify-center items-center py-16">
      <UCard class="h-full w-[70%]">
        <template #header>
          <TopBar />
        </template>

        <div class="h-full grid grid-cols-[minmax(0,_0.33fr)_1fr] flex-grow">
          <div class="h-full grid grid-rows-[auto_1fr]">
            <div class="flex flex-row-reverse items-center justify-between pb-4">
              <UButtonGroup>
                <UButton leading-icon="ri:file-add-fill" label="Nueva Nota" size="lg" variant="subtle" color="primary"
                  @click="$router.push('/new')" />
                <UButton color="neutral" icon="ri:loop-right-fill" size="lg" variant="subtle" @click="fetchNotes" />
              </UButtonGroup>
            </div>
            <div v-if="isFetching">
              <span class="text-lg">Cargando...</span>
            </div>
            <div v-else-if="fetchError">
              <span class="text-lg text-red-500">Error al cargar las notas</span>
            </div>
            <NotesList v-else class="w-full" :notes="notes" @note-selected="handleNoteSelected" />
          </div>
          <slot />
        </div>

      </UCard>
    </div>
    <div class="flex justify-center items-center py-4">
      <span class="text-base text-slate-400 hover:text-white cursor-pointer select-none">Estado del servicio</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import NotesList from '~/components/NotesList.vue';
import TopBar from '~/components/TopBar.vue';
import { NotesService } from '~/services/notes.service';
import type { Note } from '~/types';

const route = useRoute();
const router = useRouter();
const notesService = new NotesService();

const isFetching = ref(false);
const fetchError = ref(false);
const notes = ref<Note[]>([]);

const fetchNotes = async () => {
  isFetching.value = true;
  fetchError.value = false;
  try {
    const notesResult = await notesService.list();
    notes.value = notesResult;
  } catch (error) {
    console.error('Error fetching notes:', error);
    fetchError.value = true;
  }
  finally {
    isFetching.value = false;
  }
}

const handleNoteSelected = (noteId: number) => {
  router.push(`/notes/${noteId}`);
};

onMounted(() => {
  fetchNotes();
});

watch(() => route.name, () => {
  fetchNotes()
})
</script>