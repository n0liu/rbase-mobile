'use client';

import Image from 'next/image';
import styles from './index.module.scss';
import { PersonCardProps } from './types';

export default function PersonCard({ person, onClick, renderName, renderTitle }: PersonCardProps) {
  return (
    <div className={styles.personCard} onClick={onClick}>
      <Image
        src={person.avatar}
        alt={person.name}
        width={60}
        height={60}
        className={styles.avatar}
      />
      <div className={styles.personInfo}>
        <h3 className={styles.name}>{renderName ? renderName(person.name) : person.name}</h3>
        {person.title && (
          <p className={styles.title}>{renderTitle ? renderTitle(person.title) : person.title}</p>
        )}
        {person.researchArea && (
          <p className={styles.researchArea}>研究方向: {person.researchArea}</p>
        )}
      </div>
    </div>
  );
}
