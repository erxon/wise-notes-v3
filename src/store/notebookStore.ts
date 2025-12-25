import { createStore } from "zustand";

export interface NotebookState {
  notebook: {
    id?: string;
    name: string;
    description?: string;
  } | null;
  notebookId: string | null;
  setNotebook: (notebook: NotebookState["notebook"]) => void;
  setNotebookId: (notebookId: NotebookState["notebookId"]) => void;
}

export const createNotebookStore = (initProps?: Partial<NotebookState>) => {
  return createStore<NotebookState>((set) => ({
    notebook: initProps?.notebook ?? null,
    notebookId: initProps?.notebookId ?? null,
    setNotebook: (notebook) => set({ notebook }),
    setNotebookId: (notebookId) => set({ notebookId }),
  }));
};

export type NotebookStoreApi = ReturnType<typeof createNotebookStore>;
