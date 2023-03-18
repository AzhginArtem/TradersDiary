import React from 'react';
import './AppBar.sass';

const AppBar = (props) => {
  return (
    <div className="appbar">
      <h2 className="appbar__title">{props.title}</h2>
    </div>
  );
};

export default AppBar;
