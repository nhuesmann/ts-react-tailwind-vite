import React, { FC, MouseEvent } from 'react';

import { useGlobalState } from '../../store';
import { sendMessageToFigma, write } from '../../utils';
import { Button } from '../_shared';

export const Buttons: FC = () => {
  // UI state
  const [apiKey] = useGlobalState('apiKey');
  const [error, setError] = useGlobalState('notificationError');
  const [loading, setLoading] = useGlobalState('loading');
  const [didWrite, setDidWrite] = useGlobalState('didWrite');
  const [___, setShowNotification] = useGlobalState('showNotification');

  // Form data
  const [contentType] = useGlobalState('contentType');
  const [subject] = useGlobalState('subject');
  const [wordCount] = useGlobalState('wordCount');
  const [tone] = useGlobalState('tone');
  const [readingLevel] = useGlobalState('readingLevel');

  const disabled = !apiKey.length || !!error.length;

  function handleClose() {
    sendMessageToFigma({ type: 'U2F_close' });
  }

  async function handleWrite(event: MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();

    // Make sure subject isn't blank
    if (!subject.length) {
      setError('Writer needs a prompt!');
      setShowNotification(true);
      return;
    }

    // Happy path
    setLoading(true);

    const prompt = {
      contentType,
      subject,
      wordCount,
      tone,
      readingLevel,
    };

    const response = await write(apiKey, prompt);

    setLoading(false);

    // If error- show notification with error
    if (response.error?.length) {
      setError(response.error);
      setShowNotification(true);
      return;
    }

    // If good- show side by side buttons, send generated text to Figma
    if (response.copy?.length) {
      setDidWrite(true);
      sendMessageToFigma({
        type: 'U2F_write',
        data: response.copy,
      });
    }
  }

  return (
    <div>
      {didWrite ? (
        <div className="row">
          <Button onClick={handleClose} text="Close" variant="outline" />
          <div className="horizontal-spacing" />
          <Button
            onClick={handleWrite}
            text="Rewrite"
            variant="filled"
            loading={loading}
            disabled={disabled}
          />
        </div>
      ) : (
        <Button
          onClick={handleWrite}
          text="Write"
          variant="filled"
          loading={loading}
        />
      )}
    </div>
  );
};
