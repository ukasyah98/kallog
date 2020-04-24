import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';
import { unstable_batchedUpdates } from 'react-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    pointerEvents: 'none',
    width: '100%',
    justifySelf: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: 'bottom .3s ease',

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons({
  onStartPreview
}) {
  const wrapperRef = React.useRef()
  const [marginLeft, setMarginLeft] = React.useState(0)
  const [marginRight, setMarginRight] = React.useState(0)
  const [ready, setReady] = React.useState(false)

  const classes = useStyles();

  React.useEffect(() => {
    if (wrapperRef.current) {
      const bodyWidth = document.body.clientWidth
      const el = wrapperRef.current
      const dimension = el.getBoundingClientRect()

      unstable_batchedUpdates(() => {
        setMarginLeft(dimension.x)
        setMarginRight(bodyWidth - (dimension.x + dimension.width))
        setReady(true)
      })
    }
  }, [])

  return (
    <>
      {/* Dummy component used to retrieve content's dimension */}
      <div
        ref={wrapperRef}
        style={{
          width: '100%',
        }}
      />

      <div
        className={classes.root}
        style={{
          bottom: ready ? 20 : -50,
          paddingLeft: marginLeft,
          paddingRight: marginRight,
        }}
      >
        <div style={{ margin: 'auto' }} />
        <div style={{ pointerEvents: 'auto', display: 'flex' }}>
          <Fab variant="extended" onClick={onStartPreview}>
            <PlayArrowIcon className={classes.extendedIcon} />
            Preview
          </Fab>
          <div style={{ marginRight: 15 }} />
          <Fab variant="extended">
            <SaveIcon className={classes.extendedIcon} />
            Save
          </Fab>
        </div>
        <div style={{ margin: 'auto' }} />
      </div>
    </>
  );
}
