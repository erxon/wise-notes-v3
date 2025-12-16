"use client";

import { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import {
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
  IconPlus,
  IconSeparator,
  IconStrikethrough,
} from "@tabler/icons-react";
import TooltipWrapper from "../utils/tooltip";

export default function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? "is-active" : ""}
        >
          <IconBold />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? "is-active" : ""}
        >
          <IconItalic />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? "is-active" : ""}
        >
          <IconStrikethrough />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? "is-active" : ""}
        >
          <IconCode />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? "is-active" : ""}
        >
          <IconPilcrow />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? "is-active" : ""}
        >
          <IconH1 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState.isHeading2 ? "is-active" : ""}
        >
          <IconH2 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState.isHeading3 ? "is-active" : ""}
        >
          <IconH3 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={editorState.isHeading4 ? "is-active" : ""}
        >
          <IconH4 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={editorState.isHeading5 ? "is-active" : ""}
        >
          <IconH5 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={editorState.isHeading6 ? "is-active" : ""}
        >
          <IconH6 />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? "is-active" : ""}
        >
          <IconList />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? "is-active" : ""}
        >
          <IconListNumbers />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <TooltipWrapper content="Codeblock">
          <Button
            variant={"outline"}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editorState.isCodeBlock ? "is-active" : ""}
          >
            <IconCode />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper content="Blockquote">
          <Button
            variant={"outline"}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editorState.isBlockquote ? "is-active" : ""}
          >
            <IconBlockquote />
          </Button>
        </TooltipWrapper>
      </ButtonGroup>
      <ButtonGroup>
        <TooltipWrapper content="Horizontal line">
          <Button
            variant={"outline"}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <IconSeparator />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper content="New line">
          <Button
            variant={"outline"}
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <IconPlus />
          </Button>
        </TooltipWrapper>
      </ButtonGroup>
      <ButtonGroup>
        <TooltipWrapper content="Undo">
          <Button
            variant={"outline"}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editorState.canUndo}
          >
            <IconArrowBackUp />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper content="Redo">
          <Button
            variant={"outline"}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editorState.canRedo}
          >
            <IconArrowForwardUp />
          </Button>
        </TooltipWrapper>
      </ButtonGroup>
      <ButtonGroup>
        <TooltipWrapper content="Clear formatting">
          <Button
            variant={"outline"}
            onClick={() => {
              editor.chain().focus().clearNodes().run();
              editor.chain().focus().unsetAllMarks().run();
            }}
          >
            <IconClearFormatting />
          </Button>
        </TooltipWrapper>
      </ButtonGroup>
    </ButtonGroup>
  );
}
