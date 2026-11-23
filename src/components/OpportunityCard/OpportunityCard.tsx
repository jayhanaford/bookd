import type { HTMLAttributes, ReactNode } from 'react';
import { dateParts } from '../../lib/date';
import { Icon } from '../Icon';
import { StatusBadge, type OpportunityStatus } from '../StatusBadge';
import styles from './OpportunityCard.module.css';

export interface OpportunityCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Gig type or title, e.g. "Friday acoustic night". */
  title: string;
  venueName: string;
  /** Performance date, "YYYY-MM-DD" (venue local). */
  date: string;
  /** Performance time as the venue states it, e.g. "8:00 to 10:00 PM". */
  time?: string;
  /** Pay or budget as posted, e.g. "$150 guarantee". */
  pay?: string;
  distance?: string;
  /** Short requirement or audience note, e.g. "Open to local acts". */
  note?: string;
  status: OpportunityStatus;
  /** Link to the gig detail. Covers the whole card. */
  href?: string;
  /** Call to action. Hidden when the opportunity is closed or expired. */
  action?: ReactNode;
  headingLevel?: 'h2' | 'h3' | 'h4';
}

const closedCopy: Record<Exclude<OpportunityStatus, 'open'>, string> = {
  closed: 'No longer taking applications',
  expired: 'This date has passed',
};

/** A published gig a musician can apply to. White card, light-theme island. */
export function OpportunityCard({
  title,
  venueName,
  date,
  time,
  pay,
  distance,
  note,
  status,
  href,
  action,
  headingLevel: Heading = 'h3',
  className,
  ...rest
}: OpportunityCardProps) {
  const d = dateParts(date);
  const isOpen = status === 'open';

  return (
    <article
      data-bookd-theme="light"
      className={[styles.card, !isOpen && styles.inactive, href && styles.linked, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <time className={styles.dateTile} dateTime={date}>
        <span className={styles.month}>{d.month}</span>
        <span className={styles.day}>{d.day}</span>
        <span className={styles.weekday}>{d.weekday}</span>
      </time>

      <div className={styles.body}>
        <div className={styles.top}>
          <Heading className={styles.title}>
            {href ? (
              <a href={href} className={styles.link}>
                {title}
              </a>
            ) : (
              title
            )}
          </Heading>
          <StatusBadge status={status} size="sm" />
        </div>

        <p className={styles.venue}>{venueName}</p>

        <ul className={styles.facts}>
          <li>
            <Icon name="calendar" />
            {d.label}
            {time && `, ${time}`}
          </li>
          {pay && (
            <li>
              <Icon name="dollar" />
              {pay}
            </li>
          )}
          {distance && (
            <li>
              <Icon name="pin" />
              {distance}
            </li>
          )}
        </ul>

        {(note || !isOpen) && <p className={styles.note}>{isOpen ? note : closedCopy[status]}</p>}

        {isOpen && action && <div className={styles.action}>{action}</div>}
      </div>
    </article>
  );
}
