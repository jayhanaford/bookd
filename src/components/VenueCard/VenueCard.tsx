import type { HTMLAttributes, ReactNode } from 'react';
import { GenreTag } from '../GenreTag';
import { Icon, type IconName } from '../Icon';
import { MediaPlaceholder } from '../MediaPlaceholder';
import { StatusBadge, type VenueAvailability } from '../StatusBadge';
import styles from './VenueCard.module.css';

/** Who controls the listing. Separate from booking availability. */
export type VenueVerification = 'verified' | 'claim-pending' | 'unclaimed';

const verificationCopy: Record<VenueVerification, { icon: IconName; label: string }> = {
  verified: { icon: 'shieldCheck', label: 'Verified venue' },
  'claim-pending': { icon: 'clock', label: 'Claim pending' },
  unclaimed: { icon: 'shield', label: 'Unclaimed listing' },
};

export interface VenueCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  name: string;
  /** Neighborhood and city, e.g. "East End, Portland". */
  location: string;
  /** Distance from the person's search area, e.g. "0.8 mi". */
  distance?: string;
  capacity?: number;
  genres?: string[];
  verification: VenueVerification;
  availability: VenueAvailability;
  /** Photo (an <img> with alt text). Falls back to a placeholder. */
  media?: ReactNode;
  /** Makes the venue name a link that covers the whole card. */
  href?: string;
  /** Call to action, e.g. a Button. Sits above the card link so both stay clickable. */
  action?: ReactNode;
  /** `stacked`: photo over card (Local Pulse). `compact`: list row with thumbnail. */
  variant?: 'stacked' | 'compact';
  headingLevel?: 'h2' | 'h3' | 'h4';
}

/**
 * Venue preview. A white card (light-theme island) that shows truthful availability
 * and verification as two separate signals.
 */
export function VenueCard({
  name,
  location,
  distance,
  capacity,
  genres = [],
  verification,
  availability,
  media,
  href,
  action,
  variant = 'stacked',
  headingLevel: Heading = 'h3',
  className,
  ...rest
}: VenueCardProps) {
  const ver = verificationCopy[verification];
  const compact = variant === 'compact';
  const visibleGenres = compact ? genres.slice(0, 2) : genres;

  return (
    <article
      data-bookd-theme="light"
      className={[styles.card, styles[variant], href && styles.linked, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className={styles.media}>
        {media ?? <MediaPlaceholder ratio={compact ? '1 / 1' : '16 / 10'} bare={compact} />}
        {distance && !compact && <span className={styles.distance}>{distance}</span>}
      </div>

      <div className={styles.body}>
        <Heading className={styles.name}>
          {href ? (
            <a href={href} className={styles.link}>
              {name}
            </a>
          ) : (
            name
          )}
        </Heading>

        <p className={styles.meta}>
          <span className={styles.metaItem}>
            <Icon name="pin" />
            {location}
          </span>
          {compact && distance && <span className={styles.metaItem}>{distance}</span>}
          {capacity !== undefined && (
            <span className={styles.metaItem}>
              <Icon name="users" />
              <span aria-hidden="true">{capacity} cap</span>
              <span className={styles.srOnly}>Capacity {capacity}</span>
            </span>
          )}
        </p>

        <div className={styles.signals}>
          <StatusBadge status={availability} size="sm" />
          <span className={[styles.verification, styles[verification]].join(' ')}>
            <Icon name={ver.icon} />
            {ver.label}
          </span>
        </div>

        {visibleGenres.length > 0 && (
          <ul className={styles.genres} aria-label="Genres">
            {visibleGenres.map((g) => (
              <li key={g}>
                <GenreTag size="sm">{g}</GenreTag>
              </li>
            ))}
          </ul>
        )}

        {action && <div className={styles.action}>{action}</div>}
      </div>

      {compact && href && (
        <span className={styles.chevron} aria-hidden="true">
          <Icon name="arrowRight" />
        </span>
      )}
    </article>
  );
}
