import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { Grid, Box, IconButton, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'

export default (props) => {
  const { history } = props

  return (
    <DashboardLayout {...props}>
      <Box marginBottom={2} display="flex" alignItems="center">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => history.push('/tags/editor')}
        >
          New Tag
        </Button>
        <div style={{ flex: 1 }} />
        <IconButton
          color="inherit"
        >
          <SearchIcon />
        </IconButton>
      </Box>
      {/* <Grid container spacing={3}>
        {posts.data.map((v, i) => (
          <Grid key={`pst-${i}`} item xs={12} md={6} lg={4}>
            <PostCard {...v} />
          </Grid>
        ))}
      </Grid> */}
      {/* <PostsPagination /> */}
    </DashboardLayout>
  )
}