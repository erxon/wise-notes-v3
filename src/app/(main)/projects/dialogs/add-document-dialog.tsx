"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  addDocumentsToProject,
  addNotebookToProject,
} from "@/app/server-actions/projects";
import { getNotebooks } from "@/app/server-actions/notebooks";
import { createClient } from "@/lib/supabase/supabaseClient";
import { IconPlus } from "@tabler/icons-react";
import Notebook from "@/lib/types/notebook";
import Document from "@/lib/types/document";

export default function AddDocumentDialog({
  projectId,
}: {
  projectId: number;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedNotebookId, setSelectedNotebookId] = useState<string>("");
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    if (open) {
      const fetchNotebooks = async () => {
        const { data } = await getNotebooks();
        setNotebooks(data);
      };
      fetchNotebooks();
    }
  }, [open]);

  useEffect(() => {
    if (selectedNotebookId) {
      const fetchDocuments = async () => {
        const supabase = createClient();
        const { data } = await supabase
          .from("document")
          .select("*")
          .eq("notebookId", parseInt(selectedNotebookId));

        if (data) {
          setDocuments(data as Document[]);
          setSelectedDocumentIds(new Set()); // Reset selection
        }
      };
      fetchDocuments();
    } else {
      setDocuments([]);
      setSelectedDocumentIds(new Set());
    }
  }, [selectedNotebookId]);

  const toggleDocument = (docId: number) => {
    const newSelected = new Set(selectedDocumentIds);
    if (newSelected.has(docId)) {
      newSelected.delete(docId);
    } else {
      newSelected.add(docId);
    }
    setSelectedDocumentIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedDocumentIds.size === documents.length) {
      setSelectedDocumentIds(new Set());
    } else {
      const allIds = documents.map((d) => parseInt(d.id!));
      setSelectedDocumentIds(new Set(allIds));
    }
  };

  const handleAdd = async () => {
    setLoading(true);

    try {
      if (selectedDocumentIds.size === 0 && !selectedNotebookId) return;

      if (selectedDocumentIds.size > 0) {
        await addDocumentsToProject(projectId, Array.from(selectedDocumentIds));
        toast.success(`${selectedDocumentIds.size} document(s) added`);
      }

      setOpen(false);
      setSelectedDocumentIds(new Set());
      setSelectedNotebookId("");
    } catch (error) {
      toast.error("Failed to add documents");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNotebook = async () => {
    if (!selectedNotebookId) return;
    setLoading(true);

    try {
      await addNotebookToProject(projectId, parseInt(selectedNotebookId));
      setOpen(false);
      toast.success("All notebook documents added");
      setSelectedDocumentIds(new Set());
      setSelectedNotebookId("");
    } catch (error) {
      toast.error("Failed to add notebook");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Connect Documents
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Documents</DialogTitle>
          <DialogDescription>
            Select documents or a whole notebook to add to this project.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Notebook</label>
            <div className="flex gap-2">
              <Select
                value={selectedNotebookId}
                onValueChange={setSelectedNotebookId}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a notebook" />
                </SelectTrigger>
                <SelectContent>
                  {notebooks.map((notebook) => (
                    <SelectItem
                      key={notebook.id}
                      value={notebook.id.toString()}
                    >
                      {notebook.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="secondary"
                onClick={handleAddNotebook}
                disabled={
                  !selectedNotebookId || loading || documents.length === 0
                }
                title="Add all documents from this notebook"
              >
                Add Notebook
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Documents</label>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0"
                onClick={toggleSelectAll}
                disabled={documents.length === 0}
              >
                {selectedDocumentIds.size === documents.length &&
                documents.length > 0
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>

            <div className="border rounded-md max-h-[200px] overflow-y-auto p-2 space-y-2">
              {documents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {selectedNotebookId
                    ? "No documents found"
                    : "Select a notebook first"}
                </p>
              ) : (
                documents.map((doc) => (
                  <div key={doc.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`doc-${doc.id}`}
                      checked={selectedDocumentIds.has(parseInt(doc.id!))}
                      onCheckedChange={() => toggleDocument(parseInt(doc.id!))}
                    />
                    <label
                      htmlFor={`doc-${doc.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full py-1"
                    >
                      {doc.title || "Untitled"}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={selectedDocumentIds.size === 0 || loading}
          >
            {loading
              ? "Adding..."
              : `Add ${selectedDocumentIds.size} Document${
                  selectedDocumentIds.size !== 1 ? "s" : ""
                }`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
