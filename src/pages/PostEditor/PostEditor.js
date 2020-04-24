import React from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor'
import createFluentMarkdownPlugin from 'draft-js-fluent-markdown-plugin';
import BasicLayout from '../../layouts/BasicLayout'

const PLUGINS = [createFluentMarkdownPlugin()];

const TitleEditor = () => {
  return (
    <input
      // defaultValue="Hello World"
      placeholder="Title goes here..."
      autoFocus
      style={{
        fontFamily: 'inherit',
        fontWeight: 'bold',
        fontSize: '2em',
        border: 'none',
        outline: 'none',
        // background: 'lightblue',
        width: '100%',
        // padding: 10,
        marginBottom: 30,
      }}
    />
  )
}

export default function PostEditor({
  ...rest
}) {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );
  return (
    <BasicLayout
      title="New Post"
      prevPath="/posts"
      {...rest}
    >
      <div className="post-editor">
        <TitleEditor />
        <Editor
          placeholder="Content goes here..."
          editorState={editorState}
          onChange={setEditorState}
          plugins={PLUGINS}
        />
      </div>
    </BasicLayout>
  );
}