import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg'; // Import the Editor directly

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
