import Stack from '@mui/material/Stack';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Indicator from '@/app/ui/indicator';
import React from 'react';
import { ColorStatus } from '@/app/types/statuses';
import { FilterProps } from '@/app/ui/filter/filter.types';

const { pending, done, wontdo } = ColorStatus;

const Filter = ({ filter, handleFilter }: FilterProps) => {
  return (
    <Stack
      direction="row"
      spacing={4}
      className="absolute right-[1.375rem] top-14"
    >
      <ToggleButtonGroup
        value={filter}
        onChange={handleFilter}
        aria-label="status"
      >
        <ToggleButton value="pending" aria-label="pending" title="Pending">
          <Indicator color={pending} />
        </ToggleButton>
        <ToggleButton value="done" aria-label="done" title="Done">
          <Indicator color={done} />
        </ToggleButton>
        <ToggleButton value="wontdo" aria-label="wontdo" title="Won't Do">
          <Indicator color={wontdo} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default Filter;
