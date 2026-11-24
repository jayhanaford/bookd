import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { dateParts } from '../../lib/date';
import { Icon, type IconName } from '../Icon';
import { StatusBadge } from '../StatusBadge';
import styles from './BookingSummaryTicket.module.css';

export type TicketStatus = 'confirmed' | 'pending' | 'canceled';

const headlines: Record<TicketStatus, string> = {
  confirmed: 'Your gig is confirmed',
  pending: 'Waiting on a final answer',
  canceled: 'This gig was canceled',
};

export interface BookingSummaryTicketProps extends HTMLAttributes<HTMLElement> {
  status: TicketStatus;
  venueName: string;
  venueAddress?: string;
  actName: string;
  /** Performance date, "YYYY-MM-DD" (venue local). */
  date: string;
  /** e.g. "9:00 PM" */
  setTime: string;
  /** e.g. "40 min" or "2 x 45 min" */
  setLength?: string;
  /** Load-in time, e.g. "7:15 PM". */
  loadIn?: string;
  /** Override the status badge text, e.g. "Offer sent · v2" on a pending offer. */
  statusLabel?: string;
  /** Agreed pay as both sides accepted it, e.g. "$200 guarantee". Tracked by hand; Bookd doesn't process payments. */
  pay?: string;
  /** Manually tracked payment state, e.g. "Not paid yet". */
  paymentNote?: string;
  /** Override the line under the venue name. */
  headline?: string;
  /** Optional photo at the top of the full ticket. */
  media?: ReactNode;
  /** Booking reference as plain text. Never rendered as a barcode or QR code. */
  reference?: string;
  /** `ticket`: full gig pass. `compact`: one-line stub for lists and inboxes. */
  variant?: 'ticket' | 'compact';
  /** Actions under the ticket, e.g. "Add to calendar". */
  actions?: ReactNode;
  headingLevel?: 'h2' | 'h3' | 'h4';
}

function Row({ icon, term, children, wide }: { icon: IconName; term: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={[styles.row, wide && styles.wide].filter(Boolean).join(' ')}>
      <Icon name={icon} className={styles.rowIcon} />
      <dt className={styles.term}>{term}</dt>
      <dd className={styles.value}>{children}</dd>
    </div>
  );
}

/**
 * Bookd's signature booking summary: a white, notched "gig pass" for a performance
 * both sides agreed to. It stands for a gig, not an admission ticket, so it has no
 * barcode, QR code, seat or download-to-enter. The notches and perforation are
 * decorative; the content is a plain heading plus a description list.
 */
export function BookingSummaryTicket({
  status,
  venueName,
  venueAddress,
  actName,
  date,
  setTime,
  setLength,
  loadIn,
  statusLabel,
  pay,
  paymentNote,
  headline,
  media,
  reference,
  variant = 'ticket',
  actions,
  headingLevel: Heading = 'h3',
  className,
  ...rest
}: BookingSummaryTicketProps) {
  const headingId = useId();
  const d = dateParts(date);
  const cls = [styles.ticket, styles[variant], styles[status], className].filter(Boolean).join(' ');

  if (variant === 'compact') {
    return (
      <article data-bookd-theme="light" className={cls} aria-labelledby={headingId} {...rest}>
        <div className={styles.stubMain}>
          <span className={styles.mark} aria-hidden="true">
            <Icon name="pulse" />
          </span>
          <div className={styles.compactText}>
            <Heading id={headingId} className={styles.compactTitle}>
              {venueName}
            </Heading>
            <p className={styles.compactMeta}>
              <time dateTime={date}>{d.label}</time>, {setTime}
            </p>
            <p className={styles.compactMeta}>{actName}</p>
          </div>
        </div>
        <div className={styles.stubSide}>
          <StatusBadge status={status} label={statusLabel} size="sm" />
        </div>
      </article>
    );
  }

  return (
    <div className={styles.wrap}>
      <article data-bookd-theme="light" className={cls} aria-labelledby={headingId} {...rest}>
        <div className={styles.head}>
          {media && <div className={styles.media}>{media}</div>}
          <div className={styles.headText}>
            <StatusBadge status={status} label={statusLabel} className={styles.badge} />
            <Heading id={headingId} className={styles.venue}>
              {venueName}
            </Heading>
            <p className={styles.headline}>{headline ?? headlines[status]}</p>
          </div>
        </div>

        <div className={styles.details}>
          <dl className={styles.grid}>
            <Row icon="calendar" term="Date">
              <time dateTime={date}>{d.label}, {d.year}</time>
            </Row>
            <Row icon="clock" term="Set time">{setTime}</Row>
            <Row icon="mic" term="Your act">{actName}</Row>
            {setLength && <Row icon="timer" term="Set length">{setLength}</Row>}
            {loadIn && <Row icon="clock" term="Load-in">{loadIn}</Row>}
            <Row icon="pin" term="Venue" wide>
              {venueName}
              {venueAddress && <span className={styles.sub}>{venueAddress}</span>}
            </Row>
            {pay && (
              <Row icon="dollar" term="Agreed pay" wide>
                {pay}
                {paymentNote && <span className={styles.sub}>{paymentNote}</span>}
              </Row>
            )}
          </dl>
          {reference && <p className={styles.reference}>Booking ref {reference}</p>}
        </div>
      </article>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
