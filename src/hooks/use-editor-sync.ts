"use client";

import { useState, useCallback } from "react";
import { Editor } from "@tiptap/react";

export const useEditorSync = () => {
  const [editorState, setEditorState] = useState<Record<string, boolean>>({});

  const updateState = useCallback((editor: Editor | null) => {
    if (!editor) return;

    setEditorState({
      // Marks
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isStrike: editor.isActive("strike"),
      isCode: editor.isActive("code"),

      // Headings
      isHeading1: editor.isActive("heading", { level: 1 }),
      isHeading2: editor.isActive("heading", { level: 2 }),
      isHeading3: editor.isActive("heading", { level: 3 }),
      isParagraph: editor.isActive("paragraph"),

      // Lists
      isBulletList: editor.isActive("bulletList"),
      isOrderedList: editor.isActive("orderedList"),

      // Commands (Can the user actually do this right now?)
      canBold: editor.can().chain().focus().toggleBold().run(),
      canItalic: editor.can().chain().focus().toggleItalic().run(),
      canStrike: editor.can().chain().focus().toggleStrike().run(),
      canCode: editor.can().chain().focus().toggleCode().run(),

      // Undo and Redo
      canUndo: editor.can().chain().focus().undo().run(),
      canRedo: editor.can().chain().focus().redo().run(),
    });
  }, []);

  return { editorState, updateState };
};
