import React, { useEffect, useMemo, useState } from "react";
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

/**
 * react-quill 래퍼
 * - 내부 state를 사용해 입력 중 리렌더로 인한 커서/IME(한글) 끊김을 방지
 * - 외부 value가 바뀌면 동기화 (최초 로딩/서버 데이터 진입 등)
 */
export default function AdminRichTextEditor({
  value,
  onChange,
  placeholder = "내용을 입력하세요...",
  readOnly = false,
  className = "",
}: Props) {
  const [html, setHtml] = useState<string>(value || "");

  // 외부 value가 바뀐 경우에만 내부 상태 갱신 (불필요한 초기화 방지)
  useEffect(() => {
    if (typeof value === "string" && value !== html) {
      setHtml(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // 툴바/모듈 설정
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "blockquote", "code-block"],
        ["clean"],
      ],
      clipboard: { matchVisual: true },
      history: { delay: 500, maxStack: 200, userOnly: true },
    }),
    []
  );

  // 허용 포맷
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

  // 변경 핸들러: 내부 state만 갱신 → 부모로는 디바운스 없이 그대로 전달 (필요시 상위에서 저장 시점 제어)
  const handleChange = (nextHtml: string) => {
    setHtml(nextHtml);
    onChange?.(nextHtml);
  };

  return (
    <div className={`rounded-lg overflow-hidden bg-white ${className}`}>
      <ReactQuill
        theme="snow"
        value={html}
        onChange={handleChange}
        readOnly={readOnly}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        // 한글 IME 끊김 방지: react-quill가 내부에서 contentEditable을 직접 관리하도록 둔다(완전 컨트롤드 X)
        preserveWhitespace
      />
      <style>{`
        .ql-container { min-height: 320px; font-size: 16px; }
        .ql-editor { min-height: 280px; line-height: 1.6; }
      `}</style>
    </div>
  );
}