import React, { FC, MouseEventHandler } from 'react';

import { Loader } from './Loader';

interface Props {
  text: string;
  variant: 'filled' | 'outline';
  loading?: boolean;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: FC<Props> = ({
  text,
  variant,
  loading,
  onClick,
  disabled,
  fullWidth = true,
}) => {
  const fullWidthClass = fullWidth ? 'full-width' : '';
  const buttonClass = `button button-${variant} ${fullWidthClass}`;
  const textClass = `text-bold ${disabled ? 'button-disabled' : ''}`;

  return (
    <button onClick={onClick} className={buttonClass} disabled={disabled}>
      {loading ? <Loader /> : <p className={textClass}>{text}</p>}
    </button>
  );
};
