'use client';

import Image from 'next/image';
import styles from './index.module.scss';
import { PersonCardProps } from './types';

export default function PersonCard({ person, onClick }: PersonCardProps) {
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
        <h3 className={styles.name}>{person.name}</h3>
        {person.title && (
          <p className={styles.title}>{person.title}</p>
        )}
        {person.organization && (
          <p className={styles.organization}>{person.organization}</p>
        )}
        {person.researchArea && (
          <p className={styles.researchArea}>研究方向: {person.researchArea}</p>
        )}
        {person.articleCount !== undefined && (
          <p className={styles.articleCount}>{person.articleCount} 篇文章</p>
        )}
      </div>
    </div>
  );
}
