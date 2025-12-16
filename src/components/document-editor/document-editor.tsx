/*
TODO build editor using tiptap
*/

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import MenuBar from "./menubar";
import { all, createLowlight } from "lowlight";
import { TextStyleKit } from "@tiptap/extension-text-style";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import Heading from "@tiptap/extension-heading";

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
  // Override the renderHTML method
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level as HeadingLevel;

    // --- Custom Styling Logic (Tailwind) ---
    const baseClass = "font-bold mt-4 mb-2";
    const levelClasses = {
      1: "text-4xl",
      2: "text-3xl",
      3: "text-2xl",
      4: "text-xl",
      5: "text-lg",
      6: "text-base",
    };

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
  const lowlight = createLowlight(all);

  lowlight.register("html", html);
  lowlight.register("css", css);
  lowlight.register("js", js);
  lowlight.register("ts", ts);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
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
            class: "list-decimal ml-4",
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
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "mx-auto focus:outline-none prose dark:prose-invert",
      },
    },
  });

  return (
    <div>
      {editor && <MenuBar editor={editor} />}
      <div className="mt-8">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
