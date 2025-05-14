import type { Note } from "~/types";

export class NotesService {
  async list(): Promise<Note[]> {
    const notes = await $fetch<Note[]>("/api/quickmemos/notes");
    return notes;
  }
}
