import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { IconButton } from "@mui/material";

const Scroll = ({ showBelow }) => {
  const classes = makeStyles((theme) => ({
    toTop: {
      zIndex: 2,
      position: "fixed",
      bottom: "3vh",
      backgroundColor: "#252a41",
      color: "#DCDCDC",
      "&:hover, &.Mui-focusVisible": {
        transition: "0.3s",
        color: "#397BA6",
        backgroundColor: "#252a41",
      },
      [theme.breakpoints.up("xs")]: {
        right: "5%",
        backgroundColor: "#252a41",
      },
      [theme.breakpoints.up("lg")]: {
        right: "2.5%",
      },
    },
  }));

  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  }, []);

  return (
    <>
      <div>
        {show && (
          <IconButton
            onClick={handleClick}
            className={classes.toTop}
            aria-label="to top"
            component="span"
          >
            <ExpandLess />
          </IconButton>
        )}
      </div>
    </>
  );
};
export default Scroll;
