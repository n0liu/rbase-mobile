'use client';

import styles from './index.module.css';
import { icons } from '@/icons';

interface SvgIconProps {
  name: string;
  className?: string;
}

export default function SvgIcon({ name, className }: SvgIconProps) {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`SvgIcon: icon "${name}" not found`);
    return null;
  }

  return (
    <span className={`${styles.svgIcon} ${className || ''}`}>
      <IconComponent />
    </span>
  );
}
