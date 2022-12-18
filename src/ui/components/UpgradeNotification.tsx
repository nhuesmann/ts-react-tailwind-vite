import React, { FC } from 'react';

import { useGlobalState } from '../store';
import { NotificationBox } from './_shared';

export const UpgradeNotification: FC = () => {
  // const [notificationMessage] = useGlobalState('notificationMessage');
  const [showNotification] = useGlobalState('showNotification');

  // TODO: track usage, maybe take text from props (or track usage in state)
  const buttonText = 'You can write 4 more times';

  const onClick = () => {
    // TODO: nav to upgrade!
  };

  return (
    <NotificationBox
      text={buttonText}
      buttonText="Upgrade"
      visible={showNotification}
      onClick={onClick}
    />
  );
};
