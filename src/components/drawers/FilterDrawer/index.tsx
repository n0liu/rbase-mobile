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
  contentRef,
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
          {/* 顶部菜单 */}
          <div className={styles.drawerMenu}>
            {menus.map((menu) => (
              <div
                key={menu}
                className={`${styles.drawerMenuItem} ${
                  activeMenu === menu ? styles.drawerMenuItemActive : ''
                }`}
                onClick={() => onMenuChange(menu)}
              >
                {menu}
              </div>
            ))}
          </div>

          {/* 内容区 */}
          <div className={styles.drawerContent} ref={contentRef}>{children}</div>
        </div>
      </div>
    </Popup>
  );
}
