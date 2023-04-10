import React, { useState } from 'react';
import './AppBar.sass';

const AppBar = (props) => {
  const [isIphone, setIsIphone] = useState();

  return (
    <div className="appbar">
      <h2 className="appbar__title">{props.title}</h2>
      {/* {props.isIphone ? (
        <FontAwesomeIcon
          icon={faDownload}
          color="#fff"
          fixedWidth
          style={{
            width: displayWidth,
            height: displayWidth,
            position: 'absolute',
            top: '2%',
            right: '5%',
          }}
          onClick={setUserPick(await props.isIphone.prompt().userChoice)}
        />
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default AppBar;
