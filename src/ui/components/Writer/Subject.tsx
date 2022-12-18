import React, { FC, FormEvent, useEffect } from 'react';

import { useGlobalState } from '../../store';
import type { ContentTypeOption } from '../../types';
import { ModuleSpacing } from '../_shared';

export const Subject: FC = () => {
  const [contentType] = useGlobalState('contentType');
  const [subject, setSubject] = useGlobalState('subject');
  const [didWrite, setDidWrite] = useGlobalState('didWrite');
  const [error, setError] = useGlobalState('notificationError');
  const [showNotification, setShowNotification] =
    useGlobalState('showNotification');

  const placeholder = getPlaceholder(contentType);

  function handleInput(event: FormEvent<HTMLTextAreaElement>) {
    setSubject(event.currentTarget.value.trim());
  }

  useEffect(() => {
    // Hide "rewrite" button if user changes the subject
    if (didWrite) {
      setDidWrite(false);
    }
    // Clear error if present
    if (showNotification && !!error.length) {
      setError('');
      setShowNotification(false);
    }
  }, [subject]);

  return (
    <ModuleSpacing>
      <p className="label">What do you need written?</p>
      <textarea
        className="textarea user-input"
        placeholder={placeholder}
        onInput={handleInput}
      />
    </ModuleSpacing>
  );
};

function getPlaceholder(contentType: ContentTypeOption) {
  switch (contentType) {
    case 'product copy': {
      return 'e.g. Request phone number for 2 factor auth';
    }
    case 'marketing copy': {
      return 'e.g. Website headline for stock trading app';
    }
    case 'legal copy': {
      return 'e.g. Investing Risk Disclaimer';
    }
    case 'a file name': {
      return 'e.g. Presentation.pdf';
    }
    case 'a review': {
      return 'e.g. 4 stars Italian restaurant';
    }
  }
}
