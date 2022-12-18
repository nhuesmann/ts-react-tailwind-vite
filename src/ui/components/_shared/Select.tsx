import React, { FC } from 'react';
import ReactSelect, { StylesConfig } from 'react-select';

import type { SelectOption } from '../../types';
import { ModuleSpacing } from './ModuleSpacing';

const styles: StylesConfig = {
  // KEEP
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#161616',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
  }),
  indicatorSeparator: () => ({
    color: '#161616',
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: 'rgba(255, 255, 255, 0.6)',
    ':hover': {
      color: 'rgba(255, 255, 255, 0.6)',
    },
    outline: 'none',
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  // KEEP
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#161616',
    borderRadius: 6,
    overflow: 'hidden',
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    padding: 10,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? '#2C2C2C' : '#161616',
    padding: 8,
    borderRadius: 4,
    ':active': {
      backgroundColor: '#2C2C2C',
    },
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: 'white',
  }),
};

interface Props {
  labelText: string;
  options: SelectOption<any>[];
  menuTop?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

export const Select: FC<Props> = ({
  labelText,
  options,
  menuTop,
  value,
  onChange,
}) => {
  return (
    <ModuleSpacing>
      <p className="label">{labelText}</p>
      <ReactSelect
        options={options}
        styles={styles}
        defaultValue={options[0]}
        menuPlacement={menuTop ? 'top' : 'auto'}
        value={value}
        onChange={onChange}
      />
    </ModuleSpacing>
  );
};
