import { useState } from "react";
import PropTypes from "prop-types";

function Delayed(props) {
  const [hidden, setHidden] = useState(true);

  setTimeout(() => {
    setHidden(false);
  }, props.waitBeforeShow);
  return hidden ? "" : props.children;
}

Delayed.propTypes = {
  waitBeforeShow: PropTypes.number.isRequired,
};

export default Delayed;
