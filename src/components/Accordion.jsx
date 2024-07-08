import PropTypes from "prop-types";
import { useState } from "react";

export default function Accordion({ title, children }) {
  const [expandedState, setExpandedState] = useState(false);
  return (
    <div className={`accordion ${expandedState ? "expanded" : ""}`}>
      <div
        className={`accordion-header`}
        role="presentation"
        onClick={() => setExpandedState(!expandedState)}
      >
        <div className="accordion-header-title">
          <p className={`accordion-title`}>{title}</p>
        </div>
        <span className={`accordion-header__icon-right`}>
          {expandedState ? "-" : "+"}
        </span>
      </div>
      <div className={`accordion-content`}>
        <div className="accordion-content__inner">{children}</div>
      </div>
    </div>
  );
}

Accordion.propTypes = {
  title: PropTypes.any,
  children: PropTypes.any,
};
