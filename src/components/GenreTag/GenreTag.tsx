import type { HTMLAttributes } from 'react';
import styles from './GenreTag.module.css';

export interface GenreTagProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * `soft` is the gray pill used inside white cards. `outline` is the bordered pill
   * used on the dark shell and over photos. Both work in either theme.
   */
  variant?: 'soft' | 'outline';
  size?: 'sm' | 'md';
}

/**
 * A genre or style label. Not interactive: use FilterChip when the person can
 * pick genres to filter by.
 */
export function GenreTag({ variant = 'soft', size = 'md', className, children, ...rest }: GenreTagProps) {
  const cls = [styles.tag, styles[variant], styles[size], className].filter(Boolean).join(' ');
  return (
    // The soft pill is always light gray, so it is its own light-theme island.
    <span className={cls} data-bookd-theme={variant === 'soft' ? 'light' : undefined} {...rest}>
      {children}
    </span>
  );
}
