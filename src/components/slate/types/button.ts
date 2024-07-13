import React from 'react';

export type ElementButtonProps = {
  children: React.ReactNode;
  format: string;
  active: boolean;
  onMouseDown?: (event: React.MouseEvent) => void;
};

export type ToolbarButtonProps = {
  format: string;
  icon: string;
};
