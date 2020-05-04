import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FluidLayout from '../../layouts/FluidLayout/FluidLayout'
import Crud from '../../components/Crud'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default (props) => {
  const classes = useStyles();
  const [data, setData] = React.useState([])

  return (
    <FluidLayout {...props}>
      <Crud
        selector="tag"
        path="/tags"
        dataLength={data.length}
        setData={setData}
        RenderData={({ onUpdateStart, onDeleteStart }) => (
          <div className={classes.root}>
            {data.map((v, i) => (
              <Chip
                key={`${v.name}-${i}`}
                variant="outlined"
                label={v.name}
                clickable
                size="medium"
                // {...itemProps}
                onClick={() => onUpdateStart(v)}
                onDelete={() => onDeleteStart(v)}
              />
            ))}
          </div>
        )}
        fields={[
          {
            name: 'name',
            label: 'Name',
          }
        ]}
      />
    </FluidLayout>
  )
}