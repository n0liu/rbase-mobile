import { ReactNode } from 'react';

export interface TabItem {
  key: string;
  label: string;
  count?: number;
}

export interface TabBarProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  extra?: ReactNode;
}
