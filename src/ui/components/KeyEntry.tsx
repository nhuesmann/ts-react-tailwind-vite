import React, { ChangeEvent, FC, MouseEvent } from 'react';

import { useGlobalState } from '../store';
import type { ServerResponse } from '../types';
import { authenticateKey, sendMessageToFigma } from '../utils';
import { Button, ModuleSpacing } from './_shared';

export const KeyEntry: FC = () => {
  const [_, setApiKey] = useGlobalState('apiKey');
  const [apiKeyInput, setApiKeyInput] = useGlobalState('apiKeyInput');
  const [error, setError] = useGlobalState('notificationError');
  const [__, setShowKeyEntry] = useGlobalState('showKeyEntry');
  const [___, setShowNotification] = useGlobalState('showNotification');
  const [loading, setLoading] = useGlobalState('loading');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (error.length) {
      setError('');
      setShowNotification(false);
    }

    setApiKeyInput(event.target.value);
  }

  const disabled = apiKeyInput.length === 0 || !!error.length;

  async function handleActivate(event: MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();

    setLoading(true);

    const response: ServerResponse = await authenticateKey(apiKeyInput);

    setLoading(false);

    // If error- show notification with error
    if (response.error?.length) {
      setError(response.error);
      setShowNotification(true);
      return;
    }

    // If good- set api key, hide key input screen, tell Figma to cache
    if (response.success) {
      setApiKey(apiKeyInput);
      setShowKeyEntry(false);
      sendMessageToFigma({ type: 'U2F_cache_key', data: apiKeyInput });
    }
  }

  return (
    <div className="absolute blur">
      <div className="flex-center">
        <div className="api-key-entry-container">
          <p className="text-center">
            Writer is in beta.
            <br />
            <a className="text-link" href="https://trywriter.app/">
              Request
            </a>{' '}
            an invite.
          </p>
          <input
            className="user-input api-key-input text-center"
            placeholder="Enter beta key"
            value={apiKeyInput}
            onChange={handleChange}
            spellCheck={false}
          />
          <ModuleSpacing />
          <Button
            text="Activate Key"
            variant="filled"
            onClick={handleActivate}
            disabled={disabled}
            loading={loading}
          />
        </div>
      </div>
      <div className="blur-background absolute" />
    </div>
  );
};
