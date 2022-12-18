import { Icon } from '@iconify/react';
import React, { FC, MouseEventHandler } from 'react';

interface Props {
  onClick: MouseEventHandler;
}

const FEEDBACK_LINK = 'https://writer.hellonext.co/';

export const WriterHeader: FC<Props> = ({ onClick }) => {
  return (
    <div className="header">
      <a className="text-link" href={FEEDBACK_LINK} target="_blank">
        Feedback
      </a>
      <Icon
        icon="mdi:cog-outline"
        width={20}
        height={20}
        className="pointer"
        onClick={onClick}
      />
    </div>
  );
};
