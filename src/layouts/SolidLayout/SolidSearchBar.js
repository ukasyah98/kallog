import React from 'react';
import debounce from 'lodash/debounce';
import { fade, makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import SolidSearchBarSuggestions from './SolidSearchBarSuggestions';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  popper: {
    // opacity: 1,
    // transform: 'none',
    // transition: 'opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    // transition: 'opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    // top: 16,
    // left: 575,
    // transformOrigin: '92px 16px',
  },
  paper: {
    // border: '1px solid',
    paddingTop: theme.spacing(.25),
    paddingBottom: theme.spacing(.25),
    // backgroundColor: theme.palette.background.paper,
  },
  // typography: {
  //   padding: theme.spacing(2),
  // },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(1),
    width: '100%',
    zIndex: 999,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // width: '12ch',
      // '&:focus': {
      //   width: '20ch',
      // },
      width: '20ch',
    },
  },
}));

export default function SolidSearchBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = debounce((e) => {
    const { value } = e.target
    if (!value) {
      setAnchorEl(null)
      return
    }
    if (!anchorEl) {
      setAnchorEl(e.target);
    }
  }, 300)
  const handleFocus = (e) => {
    if (e.target.value) {
      setAnchorEl(e.target);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'solid-searchbar' : undefined;

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          aria-describedby={id}
          onChange={(e) => {
            e.persist()
            handleChange(e)
          }}
          onFocus={handleFocus}
          onBlur={handleClose}
        // onClick={handleClick}
        />
      </div>

      <Popper
        id={id} open={open} anchorEl={anchorEl} placement="bottom-end"
        className={classes.popper}
      >
        <Fade in={open}>
          <Paper elevation={8} className={classes.paper}>
            <SolidSearchBarSuggestions />
          </Paper>
        </Fade>
        {/* <Paper
          className={classes.paper}
          onClick={e => e.preventDefault()}
          elevation={8}
          // onPointerDown={e => e.preventDefault()}
        >
          <SolidSearchBarSuggestions />
        </Paper> */}
      </Popper>
    </div>
  );
}
