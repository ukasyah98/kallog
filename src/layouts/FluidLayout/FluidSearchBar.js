import React from 'react';
import debounce from 'lodash/debounce';
import { fade, makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import FluidSearchBarSuggestions from './FluidSearchBarSuggestions';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 999,
  },
  paper: {
    paddingTop: theme.spacing(.25),
    paddingBottom: theme.spacing(.25),
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginLeft: 0,
    marginRight: theme.spacing(1),
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(1),
    //   width: 'auto',
    // },
    marginLeft: theme.spacing(1),
    // width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    // width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create('width'),
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    // width: '12ch',
    // '&:focus': {
    //   width: '20ch',
    // },
    // },
  },
}));

export default function SolidSearchBar() {
  const inputRef = React.useRef();
  // const wrapperRef = React.useRef();

  // const anchorRef = React.useRef();
  const classes = useStyles();

  // React.useEffect(() => {
  //   anchorRef
  // }, [])
  // const [value, setValue] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [forceOpen, setForceOpen] = React.useState(false)
  const open = forceOpen // Boolean(anchorEl) || forceOpen;
  const id = open ? 'fluid-searchbar' : undefined;

  // useClickOutsideHandler(inputRef, 'fluid-searchbar', handleClose)

  React.useEffect(() => {
    const handler = (e) => {
      if (!id) return

      const el = document.getElementById(id)
      if (inputRef.current.contains(e.target)) return

      if (el.contains(e.target)) {
        inputRef.current.focus()
      } else {
        setForceOpen(false)
      }
    }
    document.addEventListener('pointerdown', handler)
    return () => {
      document.removeEventListener('pointerdown', handler)
    }
  }, [id])

  const handleChange = debounce((e) => {
    const { value } = e.target
    if (!value) {
      setForceOpen(false)
      return
    }
    setForceOpen(true)
  }, 300)
  // const handleFocus = (e) => {
  //   if (e.target.value) {
  //     // setAnchorEl(e.target);
  //   }
  // };

  // const handleWrapperClick = () => {
  //   inputRef.current.focus()
  // }

  // const handlePopperPointerDown = (e) => {
  //   e.preventDefault()
  // }

  const handleInputFocus = (e) => {
    // if (!anchorEl) {
      setAnchorEl(e.target)
    // } else {
      setForceOpen(true)
    // }
  }

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          inputRef={inputRef}
          placeholder="Search..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          aria-describedby={id}
          onChange={(e) => {
            e.persist()
            // setValue(e.target.value)
            handleChange(e)
          }}
          onFocus={handleInputFocus}
          // onChange={(e) => setValue(e.target.value)}
          // value={value}
        />
      </div>

      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <FluidSearchBarSuggestions />
      </Popover> */}
      <Popper
        id={id} open={open} anchorEl={anchorEl}
        placement="bottom-end"
        className={classes.popper}
        // onPointerDown={handlePopperPointerDown}
      >
        <Fade in={open}>
          <Paper elevation={8} className={classes.paper}>
            <FluidSearchBarSuggestions />
          </Paper>
        </Fade>
      </Popper>
    </div>
  );
}
