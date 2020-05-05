import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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

const disabledProps = {
  style: {
    pointerEvents: 'none',
  },
  tabIndex: -1,
}

export default function ({
  disabled,
  page, setPage,
  lastPage,
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
          height: 65,
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
        <div style={{ pointerEvents: disabled ? 'none' : 'auto', display: 'flex' }}>
          <Fab
            size="small"
            aria-label="page-previous"
            onClick={() => setPage(page => page - 1)}
            {...(page === 1 ? disabledProps : {})}
          >
            <ChevronLeftIcon />
          </Fab>
          <div style={{ marginRight: 10 }} />

          <Fab size="medium" variant="extended" {...disabledProps}>
            Page {page} of {lastPage}
          </Fab>

          <div style={{ marginRight: 10 }} />
          <Fab
            size="small"
            aria-label="page-previous"
            onClick={() => setPage(page => page + 1)}
            {...(page === lastPage ? disabledProps : {})}
          >
            <ChevronRightIcon />
          </Fab>
        </div>
        <div style={{ margin: 'auto' }} />
      </div>
    </>
  );
}
