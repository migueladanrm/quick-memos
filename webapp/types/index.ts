export interface Note {
  id: number;
  title:string;
  content:string;
  createdAt: Date|string;
  updatedAt: Date|string;
}