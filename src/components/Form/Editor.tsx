import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { UseControllerProps } from "react-hook-form/dist/types";
import { Control } from "react-hook-form/dist/types/form";
import { Controller } from "react-hook-form";

interface EditorProps extends UseControllerProps {
  id: string;
  control: Control<any>;
}
interface MyEditorProps {
  value: string;
  onChange: (event: any) => void;
}

const MyEditor = ({ value, onChange }: MyEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] max-w-[80vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[75vw]",
      },
    },
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <EditorContent
      editor={editor}
      as="textarea"
      rows={6}
      className="max-w-full rounded-md border border-neutral-700 bg-neutral-300 p-1 px-2 text-sm text-zinc-700 md:text-base"
    />
  );
};

export const Editor = ({ ...rest }: EditorProps) => {
  return (
    <Controller
      {...rest}
      render={({ field }) => (
        <MyEditor value={field.value} onChange={field.onChange} />
      )}
    />
  );
};
