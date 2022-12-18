import React, { FC, MouseEventHandler } from 'react';

import { Button } from '../_shared';
import { SettingsHeader } from './Header';

interface Props {
  onBackArrowClick: MouseEventHandler;
}

const SUPPORT_EMAIL = 'hello@trywriter.app';

export const Settings: FC<Props> = ({ onBackArrowClick }) => {
  // function onFaqClick() {
  //   // just make it an HREF?? how to do that with button?
  // }

  function onSupportClick() {
    window.open(`mailto:${SUPPORT_EMAIL}`);
  }

  return (
    <>
      <SettingsHeader onClick={onBackArrowClick} />
      <div className="content-padding">
        {/* <Button
          onClick={onFaqClick}
          text="FAQ"
          variant="outline"
          fullWidth={false}
        />
        <div className="settings-spacing" /> */}
        <Button
          onClick={onSupportClick}
          text="Email Support"
          variant="outline"
          fullWidth={false}
        />
      </div>
    </>
  );
};
