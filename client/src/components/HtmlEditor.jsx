"use client";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const HtmlEditor = ({ setHtml }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const html = draftToHtml(convertToRaw(contentState));
    setHtml(html);
  }, [editorState, setHtml]);

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
      />
    </div>
  );
};

export default HtmlEditor;
