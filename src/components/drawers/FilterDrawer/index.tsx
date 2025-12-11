'use client';

import { Popup } from 'antd-mobile';
import styles from './index.module.scss';
import { FilterDrawerProps } from './types';

export default function FilterDrawer({
  visible,
  onClose,
  title,
  menus,
  activeMenu,
  onMenuChange,
  children,
  width = '80vw'
}: FilterDrawerProps) {
  return (
    <Popup
      visible={visible}
      onMaskClick={onClose}
      position="right"
      bodyStyle={{ width }}
    >
      <div className={styles.drawer}>
        {/* 标题栏 */}
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>{title}</span>
          <span className={styles.drawerClose} onClick={onClose}>
            ×
          </span>
        </div>

        {/* 主体区域 */}
        <div className={styles.drawerBody}>
          {/* 左侧菜单 */}
          <div className={styles.drawerMenu}>
            {menus.map((menu) => (
              <div
                key={menu.key}
                className={`${styles.drawerMenuItem} ${
                  activeMenu === menu.key ? styles.drawerMenuItemActive : ''
                }`}
                onClick={() => onMenuChange(menu.key)}
              >
                {menu.label}
              </div>
            ))}
          </div>

          {/* 右侧内容区 */}
          <div className={styles.drawerContent}>{children}</div>
        </div>
      </div>
    </Popup>
  );
}
