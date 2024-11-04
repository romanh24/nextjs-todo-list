import React from 'react';

export type FormState = {
  title: string;
  description: string;
};

export type DataProps = {
  id: number;
  title: string;
  description: string;
};

export type FormProps = {
  data?: DataProps;
  isEdit?: boolean;
  onCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onAdd?: () => void;
  onEdit?: () => void;
};
