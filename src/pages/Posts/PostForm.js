import React from 'react'
import FormLayout from '../../layouts/FormLayout'
import { TextField } from '@material-ui/core'
import PostFormActionButtons from './PostFormActionButtons'
import PostPreview from './PostPreview'

export default (props) => {
  const [contents, setContents] = React.useState(`
# Hello World

- Hai
  `)
  const [openPostPreview, setOpenPostPreview] = React.useState(true)

  const handlePostPreviewClose = () => {
    setOpenPostPreview(false)
  }

  return (
    <FormLayout
      title="New Post"
      prevPath="/posts"
      {...props}
    >
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Title"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          multiline
          rows={10}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="ff-post-contents"
          label="Contents"
          name="ff-post-contents"
          // value={<i>Hello Bro</i>}
          onChange={(e) => setContents(e.target.value)}
          value={contents}
        />
      </form>

      <PostFormActionButtons onStartPreview={() => setOpenPostPreview(true)} />

      <PostPreview
        open={openPostPreview}
        onClose={handlePostPreviewClose}
        data={{
          contents,
        }}
      />
    </FormLayout>
  )
}