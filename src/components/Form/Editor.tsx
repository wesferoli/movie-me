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
          "min-h-[120px] max-w-[90vw] rounded-md bg-neutral-300 text-sm text-zinc-700 md:text-base sm:max-w-[90vw] md:max-w-[80vw] p-2 lg:max-w-[75vw] focus:border-2 focus:border-black focus:outline-none",
      },
    },
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} as="textarea" rows={6} />;
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
