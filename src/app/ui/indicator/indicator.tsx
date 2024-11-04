import React from 'react';
import { IndicatorProps } from '@/app/ui/indicator/indicator.types';

const Indicator = ({ color }: IndicatorProps) => {
  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-2 left-2 w-4 h-4 ${color} rounded-full shadow`}
    />
  );
};

export default Indicator;
