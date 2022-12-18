import React, { FC, FormEvent, KeyboardEvent } from 'react';

import { useGlobalState } from '../../store';
import { ModuleSpacing } from '../_shared';

const MAX_WORD_COUNT = 300;

export const WordCount: FC = () => {
  const [_, setWordCount] = useGlobalState('wordCount');

  function handleKeyDown(event: KeyboardEvent) {
    if (!/[0-9]|Backspace/.test(event.key)) {
      event.preventDefault();
    }
  }

  function handleInput(event: FormEvent<HTMLInputElement>) {
    setWordCount(Math.min(+event.currentTarget.value, MAX_WORD_COUNT));
  }

  return (
    <ModuleSpacing>
      <p className="label">Word count</p>
      <input
        className="user-input"
        placeholder="Optional"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        spellCheck={false}
      />
    </ModuleSpacing>
  );
};
