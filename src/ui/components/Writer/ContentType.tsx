import React, { FC } from 'react';

import { useGlobalState } from '../../store';
import type { ContentTypeOption, SelectOption } from '../../types';
import { Select } from '../_shared';

export const ContentType: FC = () => {
  const options: SelectOption<ContentTypeOption>[] = [
    {
      value: 'product copy',
      label: 'Product Copy',
    },
    {
      value: 'marketing copy',
      label: 'Marketing Copy',
    },
    {
      value: 'legal copy',
      label: 'Legal Copy',
    },
    {
      value: 'a file name',
      label: 'File Name',
    },
    {
      value: 'a review',
      label: 'Review',
    },
  ];

  const [_, setContentType] = useGlobalState('contentType');
  function handleChange(option: SelectOption<ContentTypeOption>) {
    setContentType(option.value);
  }

  return (
    <Select
      options={options}
      labelText="Content type"
      onChange={handleChange}
    />
  );
};
