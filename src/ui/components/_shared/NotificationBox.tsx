import React, { FC } from 'react';

interface Props {
  text: string;
  buttonText: string;
  error?: boolean;
  visible: boolean;
  onClick?: () => void;
}

export const NotificationBox: FC<Props> = ({
  text,
  buttonText,
  error,
  visible,
  onClick,
}) => {
  const errorClass = error ? 'notification-box-error' : '';
  const visibleClass = visible ? '' : 'notification-box-hidden';

  return (
    <div className={`notification-box ${errorClass} ${visibleClass}`}>
      <p>{text}</p>
      <p onClick={onClick} className="text-bold pointer">
        {buttonText}
      </p>
    </div>
  );
};
