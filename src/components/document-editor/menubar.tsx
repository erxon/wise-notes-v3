"use client";

import { Editor } from "@tiptap/react";
import { Button } from "../ui/button";
import {
  Icon,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBlockquote,
  IconBold,
  IconClearFormatting,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconItalic,
  IconList,
  IconListNumbers,
  IconPilcrow,
  IconProps,
  IconStrikethrough,
} from "@tabler/icons-react";
import TooltipWrapper from "../utils/tooltip";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import React from "react";
import { Level } from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";

interface ToolbarItemType {
  id: string;
  label: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  action: (e: Editor) => void;
  state: string;
  can?: string;
}

export default function MenuBar({
  editor,
  editorState,
}: {
  editor: Editor | null;
  editorState: Record<string, boolean>;
}) {
  if (!editor) return null;

  const IconMap = {
    bold: IconBold,
    italic: IconItalic,
    code: IconCode,
    strike: IconStrikethrough,
    clear: IconClearFormatting,
    h1: IconH1,
    h2: IconH2,
    h3: IconH3,
    h4: IconH4,
    h5: IconH5,
    h6: IconH6,
    list: IconList,
    listNumber: IconListNumbers,
    blockquote: IconBlockquote,
    paragraph: IconPilcrow,
    undo: IconArrowBackUp,
    redo: IconArrowForwardUp,
  };

  const toolbarConfig = [
    {
      group: "marks",
      items: [
        {
          id: "bold",
          label: "Bold",
          icon: IconMap["bold"],
          action: (e: Editor) => e.chain().focus().toggleBold().run(),
          state: "isBold",
          can: "canBold",
        },
        {
          id: "italic",
          label: "Italic",
          icon: IconMap["italic"],
          action: (e: Editor) => e.chain().focus().toggleItalic().run(),
          state: "isItalic",
          can: "canItalic",
        },
        {
          id: "strike",
          label: "Strike",
          icon: IconMap["strike"],
          action: (e: Editor) => e.chain().focus().toggleStrike().run(),
          state: "isStrike",
          can: "canStrike",
        },
        {
          id: "code",
          label: "Code",
          icon: IconMap["code"],
          action: (e: Editor) => e.chain().focus().toggleCode().run(),
          state: "isCode",
          can: "canCode",
        },
      ],
    },
    {
      group: "headings",
      items: [1, 2, 3, 4, 5, 6].map((level) => ({
        id: `h${level}`,
        label: `H${level}`,
        icon: IconMap[`h${level as Level}`],
        action: (e: Editor) =>
          e
            .chain()
            .focus()
            .toggleHeading({ level: level as Level })
            .run(),
        state: `isHeading${level}`,
      })),
    },
    {
      group: "lists",
      items: [
        {
          id: "bullet",
          label: "Bullet List",
          icon: IconMap["list"],
          action: (e: Editor) => e.chain().focus().toggleBulletList().run(),
          state: "isBulletList",
        },
        {
          id: "ordered",
          label: "Ordered List",
          icon: IconMap["listNumber"],
          action: (e: Editor) => e.chain().focus().toggleOrderedList().run(),
          state: "isOrderedList",
        },
      ],
    },
    {
      group: "blocks",
      items: [
        {
          id: "blockquote",
          label: "Blockquote",
          icon: IconMap["blockquote"],
          action: (e: Editor) => e.chain().focus().toggleBlockquote().run(),
          state: "isBlockquote",
        },
        {
          id: "Codeblock",
          label: "Code Block",
          icon: IconMap["code"],
          action: (e: Editor) => e.chain().focus().toggleCodeBlock().run(),
          state: "isCodeBlock",
        },
      ],
    },
    {
      group: "Undo Redo",
      items: [
        {
          id: "undo",
          label: "Undo",
          icon: IconMap["undo"],
          action: (e: Editor) => e.chain().focus().undo().run(),
          state: "isUndo",
          can: "canUndo",
        },
        {
          id: "redo",
          label: "Redo",
          icon: IconMap["redo"],
          action: (e: Editor) => e.chain().focus().redo().run(),
          state: "isRedo",
          can: "canRedo",
        },
      ],
    },
  ];

  return (
    <div className="relative group">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-2 p-2">
          {toolbarConfig.map((group, idx) => (
            <div
              key={group.group}
              className={`flex items-center gap-1 ${
                idx !== toolbarConfig.length - 1 ? "border-r pr-2" : ""
              }`}
            >
              {group.items.map((item: ToolbarItemType) => (
                <TooltipWrapper key={item.id} content={item.label}>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className={cn(
                      (editorState as Record<string, boolean>)[item.state] &&
                        "bg-accent text-accent-foreground"
                    )}
                    disabled={
                      item.can
                        ? !(editorState as Record<string, boolean>)[item.can]
                        : false
                    }
                    onClick={() => item.action(editor)}
                  >
                    <item.icon />
                  </Button>
                </TooltipWrapper>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white to-transparent rounded-lg" />
        <ScrollBar
          orientation="horizontal"
          className="transition-opacity opacity-0 hover:opacity-100 pt-1"
        />
      </ScrollArea>
    </div>
  );
}
