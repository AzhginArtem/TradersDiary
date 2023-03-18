import React from 'react';
import { Link } from 'react-router-dom';
import './Button.sass';

const Button = (props) => {
  return (
    <Link className="mainButton" to={props.link}>
      {props.title}
    </Link>
  );
};

export default Button;
