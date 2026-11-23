import type { HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import { statusDefinitions, type Status } from './statuses';
import styles from './StatusBadge.module.css';

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: Status;
  /** Override the default label, e.g. "Open to local acts". Keep it truthful to the status. */
  label?: string;
  size?: 'sm' | 'md';
}

/**
 * Status chip for bookings, venue availability and opportunities. Every badge has an
 * icon and text, so color is never the only signal. Status fills are light in both
 * themes, so a badge reads the same on the dark shell, in a white card or over a photo.
 */
export function StatusBadge({ status, label, size = 'md', className, ...rest }: StatusBadgeProps) {
  const def = statusDefinitions[status];
  const cls = [styles.badge, styles[def.tone], styles[size], def.dashed && styles.dashed, className]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls} data-status={status} {...rest}>
      <Icon name={def.icon} className={styles.icon} />
      {label ?? def.label}
    </span>
  );
}
