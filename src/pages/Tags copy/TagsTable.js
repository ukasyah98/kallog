import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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

const tags = [
  'react', 'web', 'programming', 'full-stack',
  'vuejs', 'angularjs', 'math', 'machine-learning',
  'linear-regression', 'supervised-learning', 'unsupervised-learning',
  'docker',
  'react', 'web', 'programming', 'full-stack',
  'react', 'web', 'programming', 'full-stack',
  'react', 'web', 'programming', 'full-stack',
  'react', 'web', 'programming', 'full-stack',
  'react', 'web', 'programming', 'full-stack',
  'react', 'web', 'programming', 'full-stack',
  'react', 'web', 'programming', 'full-stack',
  'react', 'web', 'programming', 'full-stack',
  'react', 'web', 'programming', 'full-stack',
  'react', 'web', 'programming', 'full-stack',
]

export default ({
  onItemClick,
  onDeleteStart,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {tags.map((v, i) => (
        <Chip
          key={`${v}-${i}`}
          variant="outlined"
          label={v}
          clickable
          size="medium"
          onClick={() => onItemClick({ name: v })}
          onDelete={() => onDeleteStart({ name: v })}
        />
      ))}
    </div>
  )
}