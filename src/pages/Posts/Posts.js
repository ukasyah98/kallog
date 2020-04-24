import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { Grid, Box, IconButton, Button } from '@material-ui/core'
import GridOnIcon from '@material-ui/icons/GridOn'
import ListIcon from '@material-ui/icons/ListAlt'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'

import PostCard from './PostCard'
import PostsPagination from './PostsPagination'
import { useSelector } from 'react-redux';

const GRID_VIEW_MODE = 'GRID_VIEW_MODE'
const LIST_VIEW_MODE = 'LIST_VIEW_MODE'

export default (props) => {
  const { history } = props
  const posts = useSelector(state => state.posts)
  const [viewMode, setViewMode] = React.useState(GRID_VIEW_MODE)

  const toggleViewMode = () => {
    setViewMode(vm => vm === GRID_VIEW_MODE ? LIST_VIEW_MODE : GRID_VIEW_MODE)
  }

  return (
    <DashboardLayout {...props}>
      <Box marginBottom={2} display="flex" alignItems="center">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => history.push('/posts/editor')}
        >
          New Post
        </Button>
        <div style={{ flex: 1 }} />
        <IconButton
          color="inherit"
          onClick={toggleViewMode}
        >
          {viewMode === GRID_VIEW_MODE && <GridOnIcon />}
          {viewMode === LIST_VIEW_MODE && <ListIcon />}
        </IconButton>
        <IconButton
          color="inherit"
        >
          <SearchIcon />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {posts.data.map((v, i) => (
          <Grid key={`pst-${i}`} item xs={12} md={6} lg={4}>
            <PostCard {...v} />
          </Grid>
        ))}
      </Grid>
      <PostsPagination />
    </DashboardLayout>
  )
}