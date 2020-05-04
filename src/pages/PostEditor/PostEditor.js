import React from 'react';
import debounce from 'lodash/debounce'
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor'
import createFluentMarkdownPlugin from 'draft-js-fluent-markdown-plugin';
import BasicLayout from '../../layouts/BasicLayout'

const PLUGINS = [createFluentMarkdownPlugin()];



export default function PostEditor({
  ...rest
}) {
  // const [data, setData] = React.useState({
  //   title: '',
  // })
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );

  // const [postTitle, setPostTitle] = React.useState('')

  const debounceOnChange = debounce((e) => {
    console.log(e.target.value)
  }, 1000)

  return (
    <BasicLayout
      title="New Post"
      prevPath="/posts"
      actions={(
        <>
          <i>Not Saved</i>
        </>
      )}
      {...rest}
    >
      <div className="post-editor">
        <input
          defaultValue={'postTitle'}
          onChange={(e) => {
            e.persist()
            debounceOnChange(e)
          }}
          placeholder="Title goes here..."
          autoFocus
          style={{
            fontFamily: 'inherit',
            fontWeight: 'bold',
            fontSize: '2em',
            border: 'none',
            outline: 'none',
            width: '100%',
            marginBottom: 30,
          }}
        />
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