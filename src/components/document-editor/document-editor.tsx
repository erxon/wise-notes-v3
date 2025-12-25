"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import MenuBar from "./menubar";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import { useDebouncedCallback } from "use-debounce";
import { useEditorSync } from "@/hooks/use-editor-sync";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IconCheck, IconPencil } from "@tabler/icons-react";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { updateDocument } from "@/app/server-actions/document";
import { useRouter } from "next/navigation";

interface Document {
  id?: string;
  notebookId: number;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const levelClasses = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
} as const;

type HeadingLevel = keyof typeof levelClasses;

const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level as HeadingLevel;
    const baseClass = "font-bold mt-4 mb-2";

    const finalClass = `${baseClass} ${levelClasses[level] || ""}`;

    return [
      `h${level}`,
      {
        ...HTMLAttributes,
        class: finalClass,
      },
      0,
    ];
  },
});

/*
TODO - After the new document was saved, the user will be redirected to the document /editor/[notebookId]/[documentId]
*/

export default function DocumentEditor({
  notebookId,
  existingDocument,
}: {
  notebookId: string;
  existingDocument?: Document;
}) {
  const router = useRouter();
  const { editorState, updateState } = useEditorSync();
  const [editTitle, setEditTitle] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [document, setDocument] = useState<Document>(
    existingDocument || {
      id: "",
      notebookId: Number(notebookId),
      title: "Untitled",
      content: "",
    }
  );

  const handleDocumentUpdate = async () => {
    try {
      setIsSaving(true);
      const updatedDocument = await updateDocument(document);

      if (!existingDocument) {
        router.replace(`/editor/${notebookId}/document/${updatedDocument.id}`);
      }

      setDocument(updatedDocument);
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          error instanceof Error
            ? error.message
            : "Unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const debounced = useDebouncedCallback(async () => {
    await handleDocumentUpdate();
  }, 1000);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-6",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "bg-gray-100 dark:bg-neutral-800 p-2 rounded-lg overflow-x-auto",
          },
        },
        code: {
          HTMLAttributes: {
            class:
              "bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg overflow-x-auto w-fit",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-6",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class:
              "p-4 my-4 border-s-4 border-default bg-neutral-secondary-soft",
          },
        },
      }),
      TextStyleKit,
      Placeholder.configure({
        placeholder: "Write something here...",
        emptyEditorClass: "is-editor-empty",
      }),
      CustomHeading.configure({
        // You can still configure levels and other options here
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
    content: document.content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "mx-auto focus:outline-none prose dark:prose-invert",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDocument({ ...document, content: html });
      debounced();
    },
    onTransaction: () => {
      updateState(editor);
    },
  });

  useEffect(() => {
    if (editor) updateState(editor);
  }, [editor, updateState]);

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <DocumentTitle
          title={document.title}
          setDocument={setDocument}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
        />
        {isSaving && <Spinner />}
      </div>
      <div className="border rounded-lg shadow-lg">
        <MenuBar editor={editor} editorState={editorState} />
        <div className="mt-4 min-h-[calc(100vh-250px)] px-4">
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
}

function DocumentTitle({
  title,
  setDocument,
  editTitle,
  setEditTitle,
}: {
  title: string;
  setDocument: React.Dispatch<React.SetStateAction<Document>>;
  editTitle: boolean;
  setEditTitle: (editTitle: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      {editTitle ? (
        <Input
          className="max-w-[300px]"
          value={title}
          onChange={(e) =>
            setDocument((prev) => {
              return {
                ...prev,
                title: e.target.value,
              };
            })
          }
          onBlur={() => {
            if (title === "") {
              setDocument((prev) => {
                return {
                  ...prev,
                  title: "Untitled",
                };
              });
            }
            setEditTitle(false);
          }}
          placeholder="Type the title here..."
        />
      ) : (
        <h1 className="text-2xl font-semibold">{title}</h1>
      )}
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          if (title === "") {
            setDocument((prev) => {
              return {
                ...prev,
                title: "Untitled",
              };
            });
          }

          setEditTitle(!editTitle);
        }}
      >
        {editTitle ? <IconCheck /> : <IconPencil />}
      </Button>
    </div>
  );
}
