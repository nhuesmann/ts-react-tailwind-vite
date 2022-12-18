import React, { FC } from 'react';

import { useGlobalState } from '../../store';
import type { ReadingLevelOption, SelectOption } from '../../types';
import { Select } from '../_shared';

export const ReadingLevel: FC = () => {
  const options: SelectOption<ReadingLevelOption>[] = [
    {
      value: 'child',
      label: 'Child',
    },
    {
      value: 'teen',
      label: 'Teen',
    },
    {
      value: 'adult',
      label: 'Adult',
    },
    {
      value: 'academic',
      label: 'Academic',
    },
  ];

  const [_, setReadingLevel] = useGlobalState('readingLevel');
  function handleChange(option: SelectOption<ReadingLevelOption>) {
    setReadingLevel(option.value);
  }

  return (
    <Select
      options={options}
      labelText="Reading level"
      menuTop={true}
      onChange={handleChange}
    />
  );
};
