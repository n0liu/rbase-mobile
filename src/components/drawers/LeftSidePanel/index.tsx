'use client';

import { Popup } from 'antd-mobile';
import styles from './index.module.scss';
import { LeftSidePanelProps } from './types';

export default function LeftSidePanel({
  visible,
  onClose,
  title,
  width = '75vw',
  children
}: LeftSidePanelProps) {
  return (
    <Popup
      visible={visible}
      onMaskClick={onClose}
      position="left"
      bodyStyle={{ width }}
    >
      <div className={styles.panel}>
        {/* 标题栏 */}
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>{title}</span>
          <span className={styles.panelClose} onClick={onClose}>
            ×
          </span>
        </div>

        {/* 内容区 */}
        <div className={styles.panelBody}>{children}</div>
      </div>
    </Popup>
  );
}
