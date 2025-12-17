/*
TODO build editor using tiptap
*/

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import MenuBar from "./menubar";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import { useDebouncedCallback } from "use-debounce";
import { useEditorSync } from "@/hooks/use-editor-sync";
import { useEffect } from "react";

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

export default function DocumentEditor() {
  const { editorState, updateState } = useEditorSync();

  const debounced = useDebouncedCallback((value) => {
    console.log(value);
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
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "mx-auto focus:outline-none prose dark:prose-invert",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      debounced(html);
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
      <div className="border rounded-lg">
        <MenuBar editor={editor} editorState={editorState} />

        <div className="mt-4 min-h-[calc(100vh-250px)] px-4">
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
}
