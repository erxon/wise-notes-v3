import { createStore } from "zustand";

export interface NotebookState {
  notebook: {
    id?: string;
    name: string;
    description?: string;
  } | null;
  notebook_id: string | null;
  setNotebook: (notebook: NotebookState["notebook"]) => void;
  setNotebookId: (notebook_id: NotebookState["notebook_id"]) => void;
}

export const createNotebookStore = (initProps?: Partial<NotebookState>) => {
  return createStore<NotebookState>((set) => ({
    notebook: initProps?.notebook ?? null,
    notebook_id: initProps?.notebook_id ?? null,
    setNotebook: (notebook) => set({ notebook }),
    setNotebookId: (notebook_id) => set({ notebook_id }),
  }));
};

export type NotebookStoreApi = ReturnType<typeof createNotebookStore>;
