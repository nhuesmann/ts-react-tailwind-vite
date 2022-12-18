import React, { FC } from 'react';

import { useGlobalState } from '../../store';
import type { SelectOption, ToneOption } from '../../types';
import { Select } from '../_shared';

export const Tone: FC = () => {
  const options: SelectOption<ToneOption>[] = [
    {
      value: 'neutral',
      label: 'Neutral',
    },
    {
      value: 'friendly',
      label: 'Friendly',
    },
    {
      value: 'funny',
      label: 'Funny',
    },
    {
      value: 'urgent',
      label: 'Urgent',
    },
  ];

  const [_, setTone] = useGlobalState('tone');
  function handleChange(option: SelectOption<ToneOption>) {
    setTone(option.value);
  }

  return <Select options={options} labelText="Tone" onChange={handleChange} />;
};
