import React from 'react';

export type FilterProps = {
  filter: string[];
  handleFilter: (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string[]
  ) => void;
};
