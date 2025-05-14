<template>
  <div class="grid grid-rows-[auto_1fr] h-full">
    <div class="flex justify-between items-center mx-4">
      <UButtonGroup>
        <UBadge icon="ri:text-snippet" variant="subtle" size="lg" class="text-xl" color="neutral" />
        <UInput v-model="title" size="xl" placeholder="Introdúzca un título" />
      </UButtonGroup>

      <div class="flex gap-2">
        <UButton v-if="!isNewNote" color="error" leading-icon="ri:delete-bin-6-fill" variant="subtle"
          @click="handleDelete">Eliminar</UButton>
        <UButton leading-icon="ri:save-2-fill" size="lg" variant="subtle" @click="handleSave">Guardar</UButton>
      </div>
    </div>

    <div class="p-4">
      <UTextarea v-model="content" placeholder="Write your note here..." :rows="10" class="w-full" />
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/types';

const props = defineProps<{ note: Note }>();
const emit = defineEmits(['on-save', 'on-delete']);

const isNewNote = computed(() => props.note.id < 0)

const title = ref(props.note.title);
const content = ref(props.note.content);

const handleDelete = () => {
  emit('on-delete', props.note.id);
};

const handleSave = () => {
  const noteToSave = {
    ...(isNewNote.value ? {} : { id: props.note.id }),
    title: title.value,
    content: content.value
  };

  emit('on-save', noteToSave);
};

</script>