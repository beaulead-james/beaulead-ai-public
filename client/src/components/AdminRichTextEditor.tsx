import React from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/editor.css";

interface AdminRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function AdminRichTextEditor({ value, onChange, placeholder }: AdminRichTextEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }, { size: [] }],
      ['bold','italic','underline','strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
      ['link','image','blockquote','code-block','clean'],
    ],
  };
  
  const formats = [
    'header','font','size','bold','italic','underline','strike',
    'color','background','list','bullet','align','link','image','blockquote','code-block'
  ];

  return (
    <div className="admin-editor-wrapper not-prose">
      <ReactQuill
        key={value || 'empty'} // value가 변경될 때 컴포넌트 재생성
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}