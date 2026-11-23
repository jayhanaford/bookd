import type { HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import styles from './MediaPlaceholder.module.css';

export interface MediaPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  /** Width / height, e.g. "16 / 10". */
  ratio?: string;
  /** Visible caption. Defaults to "Photo coming soon". */
  caption?: string;
  /** Hide the caption and icon (for small thumbnails). */
  bare?: boolean;
}

/**
 * Stand-in for venue and performer photos until real, rights-cleared images exist.
 * Bookd doesn't ship stock or generated photos as if they were real venues.
 * Decorative: the card around it carries the venue name.
 */
export function MediaPlaceholder({ ratio = '16 / 10', caption = 'Photo coming soon', bare = false, className, style, ...rest }: MediaPlaceholderProps) {
  return (
    <div
      className={[styles.media, className].filter(Boolean).join(' ')}
      style={{ aspectRatio: ratio, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {!bare && (
        <span className={styles.caption}>
          <Icon name="music" />
          {caption}
        </span>
      )}
    </div>
  );
}
