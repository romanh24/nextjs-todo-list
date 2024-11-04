import { twMerge } from 'tailwind-merge';
import { baseStyle, versionStyles } from '@/app/ui/button/button.styles';
import { ButtonProps } from '@/app/ui/button';
import React from 'react';

export default function Button({
  version = null,
  title,
  className,
  isDisabled = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={isDisabled}
      title={title}
      type="button"
      className={
        version
          ? twMerge(baseStyle, versionStyles[version], className)
          : className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
