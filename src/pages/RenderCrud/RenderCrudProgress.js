import React from 'react'
import { CircularProgress } from '@material-ui/core'

export default ({ top = 0 }) => {
  return (
    <div
      style={{
        position: 'absolute',
        marginTop: top,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <CircularProgress />
    </div>
  )
}