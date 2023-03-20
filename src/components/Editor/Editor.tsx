import React, { useCallback, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
  state: string;
  onChange: (value: string) => void;
  onUpload?: (file: File, cb: (url: string) => void) => void;
};

const Image = Quill.import('formats/image');
Image.className = 'img-width-100';
Quill.register(Image, true);

export function Editor({ state, onChange, onUpload }: Props) {
  const quillRef = useRef<ReactQuill | null>(null);

  // 이미지 업로드 있을 경우 사용
  const handleImage = useCallback(() => {
    if (!onUpload) {
      return null;
    }

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files?.length ? input.files[0] : null;
      if (file) {
        onUpload(file, (url: string) => {
          console.log(url);
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection()?.index ?? 0;
          if (range > -1) {
            quill?.insertEmbed(range, 'image', url);
            quill?.insertText(range + 2, '');
            quill?.setSelection(range + 2, 0);
            quill?.focus();
          }
        });
      }
    });
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          // onUpload ? ['link', 'image'] : ['link'],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: handleImage,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
    'image',
  ];

  return (
    <ReactQuill
      theme="snow"
      ref={quillRef}
      modules={modules}
      style={{
        width: '100%',
        height: '300px',
      }}
      formats={formats}
      value={state}
      onChange={onChange}
    />
  );
}
