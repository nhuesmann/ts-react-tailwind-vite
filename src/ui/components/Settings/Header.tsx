import { Icon } from '@iconify/react';
import React, { FC, MouseEventHandler } from 'react';

interface Props {
  onClick: MouseEventHandler;
}

export const SettingsHeader: FC<Props> = ({ onClick }) => {
  return (
    <div className="header">
      <Icon
        icon="material-symbols:arrow-back-ios-rounded"
        width={16}
        height={16}
        className="pointer"
        color="white"
        onClick={onClick}
      />
    </div>
  );
};
