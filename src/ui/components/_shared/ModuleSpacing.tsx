import React, { FC } from 'react';

interface Props {
  children?: React.ReactNode;
}

export const ModuleSpacing: FC<Props> = ({ children }) => {
  return <div className="module">{children}</div>;
};
