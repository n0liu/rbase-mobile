'use client';

import { useState, KeyboardEvent } from 'react';
import { UpOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { AIInputBarProps } from './types';

export default function AIInputBar({
  placeholder = '输入问题，对话权威文献',
  buttonText = 'AI问答',
  buttonIcon = <span className={styles.aiIcon}>✦</span>,
  rightIcon = <UpOutline />,
  onSend,
  onAIButtonClick,
  onRightIconClick,
  showRightIcon = true,
}: AIInputBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && onSend) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={styles.bottomBar}>
      <div className={styles.aiButton} onClick={onAIButtonClick}>
        {buttonIcon}
        <span>{buttonText}</span>
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder={placeholder}
          className={styles.inputField}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {showRightIcon && (
        <div className={styles.rightButton} onClick={onRightIconClick || handleSend}>
          {rightIcon}
        </div>
      )}
    </div>
  );
}
