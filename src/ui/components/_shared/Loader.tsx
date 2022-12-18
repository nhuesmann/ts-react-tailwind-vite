import React, { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div className="loader-container">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
