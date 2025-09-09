import React, { useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  mode?: "new" | "edit";
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
};

export default function AdminRichTextEditor({
  value = "",
  onChange,
  placeholder = "내용을 입력하세요...",
  readOnly = false,
  className = "",
}: Props) {
  const handleChange = useCallback((content: string) => {
    onChange?.(content);
  }, [onChange]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "blockquote", "code-block"],
      ["clean"],
    ],
    clipboard: { matchVisual: false },
  };

  const formats = [
    "header",
    "bold",
    "italic", 
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "blockquote",
    "code-block",
  ];

  return (
    <div className={`bg-white border border-gray-200 rounded-md ${className}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        style={{
          height: '200px'
        }}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .ql-container {
            font-size: 14px !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: none !important;
          }
          .ql-toolbar {
            border-left: none !important;
            border-right: none !important;
            border-top: none !important;
          }
          .ql-editor {
            min-height: 150px !important;
            line-height: 1.5 !important;
            padding: 12px 15px !important;
          }
        `
      }} />
    </div>
  );
}