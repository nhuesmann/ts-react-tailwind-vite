import React, { FC } from 'react';

import { useGlobalState } from '../store';
import { NotificationBox } from './_shared';

interface Props {
  dismissable?: boolean;
}

export const ErrorNotification: FC<Props> = ({ dismissable = true }) => {
  const [error] = useGlobalState('notificationError');
  const [showNotification, setShowNotification] =
    useGlobalState('showNotification');

  const buttonText = dismissable ? 'Close' : '';
  const onClick = () => {
    if (!!error.length && dismissable) {
      setShowNotification(false);
    }
  };

  return (
    <NotificationBox
      text={error}
      buttonText={buttonText}
      error={true}
      visible={showNotification}
      onClick={onClick}
    />
  );
};
