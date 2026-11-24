import { useState } from 'react';
import { BookingSummaryTicket, Button, FilterChip, StatusBadge, type Status } from '../../components';
import { Icon } from '../../components/Icon';
import { act, gig } from '../data';
import { NOT_IN_PROTOTYPE, useProto, type ScreenId } from '../nav';
import { photos, type PhotoName } from '../photos';
import { Footnote, Img, Screen, SectionHeader } from '../ui';
import s from '../proto.module.css';

/** M1 · My Bookd dashboard. Reflects what the person did in the other flows. */
export function MyBookd() {
  const { go, notify, state } = useProto();
  const actions = state.offerAccepted ? 1 : 2;
  return (
    <Screen label="My Bookd" tabs={{ kind: 'musician', active: 'my-bookd' }}>
      <div className={s.pageHead}>
        <div>
          <p className={s.sub}>Good evening, {act.first}</p>
          <h1 className={s.h1}>My Bookd</h1>
        </div>
        <span className={s.avatar} aria-hidden="true">
          {act.initials}
        </span>
      </div>

      <section aria-labelledby="needs-action" className={s.stack}>
        <h2 id="needs-action" className={s.h2}>Needs your action ({actions})</h2>
        {!state.offerAccepted && (
          <article className={s.actionCard}>
            <StatusBadge status="pending" label="Offer sent" size="sm" />
            <h3 className={s.rowTitle}>Offer from The Lantern Room</h3>
            <div className={s.actionFoot}>
              <p className={s.rowMeta}>Fri, Dec 11 · $275 · v2 · reply by Dec 8</p>
              <Button size="sm" iconEnd={<Icon name="arrowRight" />} onClick={() => go('offer')} aria-label="Review offer from The Lantern Room">
                Review
              </Button>
            </div>
          </article>
        )}
        <article className={s.actionCard}>
          <StatusBadge status="accepting-intros" label="Responded" size="sm" />
          <h3 className={s.rowTitle}>Reply from Copper Kettle Café</h3>
          <div className={s.actionFoot}>
            <p className={s.rowMeta}>About your introduction · 1h ago</p>
            <Button size="sm" variant="secondary" onClick={() => notify('Messaging is not part of this prototype yet')} aria-label="Open reply from Copper Kettle Café">
              Open
            </Button>
          </div>
        </article>
      </section>

      <section aria-labelledby="upcoming" className={s.stack}>
        <SectionHeader id="upcoming" title="Upcoming gigs" action="Calendar" onAction={() => notify(NOT_IN_PROTOTYPE)} />
        {state.offerAccepted && (
          <div className={s.ticketLink}>
            <BookingSummaryTicket
              variant="compact"
              status="confirmed"
              venueName={gig.venue}
              date={gig.isoDate}
              setTime="8–10 PM"
              actName="Load-in 7:15 · $275 · not paid yet"
              headingLevel="h3"
            />
            <button type="button" className={s.stretch} onClick={() => go('confirmed')} aria-label="View booking: The Lantern Room, Fri, Dec 11" />
          </div>
        )}
        <div className={s.externalCard}>
          <span className={s.rowIcon} aria-hidden="true">
            <Icon name="calendar" size={20} />
          </span>
          <div className={s.rowText}>
            <h3 className={s.rowTitle}>Private party · Falmouth</h3>
            <span className={s.rowMeta}>Sat, Dec 26 · $300 · logged by you</span>
          </div>
          <StatusBadge status="hosts-music" label="External" size="sm" />
        </div>
        {!state.offerAccepted && <p className={s.smallText}>Accept the Lantern Room offer to see it here as a confirmed gig.</p>}
      </section>

      <section aria-labelledby="quick-add">
        <h2 id="quick-add" className={s.h2}>Quick add</h2>
        <div className={s.wrapRow}>
          <Button size="sm" variant="secondary" iconStart={<Icon name="plus" />} onClick={() => notify(NOT_IN_PROTOTYPE)}>
            External gig
          </Button>
          <Button size="sm" variant="secondary" iconStart={<Icon name="pencil" />} onClick={() => notify(NOT_IN_PROTOTYPE)}>
            Outreach note
          </Button>
          <Button size="sm" variant="secondary" iconStart={<Icon name="users" />} onClick={() => notify(NOT_IN_PROTOTYPE)}>
            Contact
          </Button>
        </div>
      </section>

      <section aria-labelledby="activity">
        <SectionHeader id="activity" title="Recent activity" action="All" onAction={() => notify(NOT_IN_PROTOTYPE)} />
        <ul className={s.panelList}>
          {state.offerAccepted && (
            <li className={s.activity}>
              <Icon name="check" size={16} /> <span>You accepted the Lantern Room offer</span> <span className={s.rowMeta}>Today</span>
            </li>
          )}
          <li className={s.activity}>
            <Icon name="send" size={16} /> <span>You applied to Acoustic Friday</span> <span className={s.rowMeta}>Nov 21</span>
          </li>
          <li className={s.activity}>
            <Icon name="star" size={16} /> <span>You followed Harborside Taproom</span> <span className={s.rowMeta}>Nov 20</span>
          </li>
        </ul>
      </section>
      <Footnote>Fictional demo data. Payment status is tracked by hand; Bookd doesn’t process payments.</Footnote>
    </Screen>
  );
}

interface Connection {
  id: string;
  venue: string;
  detail: string;
  status: Status;
  statusLabel?: string;
  note: string;
  photo: PhotoName;
  to?: ScreenId;
}

/** M2 · Connections: every application, intro, saved venue and outreach note. */
export function Connections() {
  const { go, notify, state } = useProto();
  const [tab, setTab] = useState('applications');

  const lantern: Connection = state.offerAccepted
    ? { id: 'a1', venue: 'The Lantern Room', detail: 'Acoustic Friday · Dec 11', status: 'confirmed', note: 'You accepted offer v2', photo: 'lantern', to: 'confirmed' }
    : { id: 'a1', venue: 'The Lantern Room', detail: 'Acoustic Friday · Dec 11', status: 'open-gig', statusLabel: 'Offer to review', note: 'Offer v2 received Dec 3', photo: 'lantern', to: 'offer' };

  const groups: Record<string, { label: string; items: Connection[] }> = {
    applications: {
      label: 'Applications',
      items: [
        lantern,
        { id: 'a2', venue: 'Copper Kettle Café', detail: 'Folk night · Dec 19', status: 'pending', statusLabel: 'Submitted', note: 'Applied Nov 21', photo: 'copper' },
        { id: 'a3', venue: 'Fore Street Social', detail: 'Sunday brunch set · Jan 3', status: 'declined', note: 'Venue chose another act · Nov 18', photo: 'fore' },
      ],
    },
    intros: {
      label: 'Intros',
      items: [
        ...(state.introSent
          ? [{ id: 'i0', venue: 'The Lantern Room', detail: 'Introduction', status: 'pending', statusLabel: 'Sent', note: 'Sent today · reviewed weekly', photo: 'lantern', to: 'venue-verified' } as Connection]
          : []),
        { id: 'i1', venue: 'Copper Kettle Café', detail: 'Introduction', status: 'accepting-intros', statusLabel: 'Responded', note: 'Reply 1h ago', photo: 'copper' },
        { id: 'i2', venue: 'Tidewater Hall', detail: 'Introduction', status: 'pending', statusLabel: 'Sent', note: 'Sent Nov 12', photo: 'crowd' },
      ],
    },
    venues: {
      label: 'Venues',
      items: [
        { id: 'v1', venue: 'The Lantern Room', detail: 'Listening room · 0.8 mi', status: 'accepting-intros', note: 'Saved', photo: 'lantern', to: 'venue-verified' },
        { id: 'v2', venue: 'Harborside Taproom', detail: 'Brewery · 1.4 mi', status: 'hosts-music', note: 'Following · unclaimed', photo: 'harborside', to: 'venue-unclaimed' },
        { id: 'v3', venue: 'Copper Kettle Café', detail: 'Café · 2.1 mi', status: 'not-booking', note: 'Saved', photo: 'copper' },
        { id: 'v4', venue: 'Fore Street Social', detail: 'Restaurant & bar · 3.0 mi', status: 'hosts-music', note: 'Saved · unclaimed', photo: 'fore' },
      ],
    },
    outreach: {
      label: 'Outreach',
      items: [
        { id: 'o1', venue: 'Harborside Taproom', detail: 'Emailed events@harborside.example', status: 'pending', statusLabel: 'Follow up Dec 1', note: 'Logged by you · Nov 20', photo: 'harborside', to: 'venue-unclaimed' },
      ],
    },
  };

  const current = groups[tab];

  return (
    <Screen label="Connections" tabs={{ kind: 'musician', active: 'connections' }}>
      <div>
        <h1 className={s.h1}>Connections</h1>
        <p className={s.sub}>Every application, intro, saved venue and outreach note, with where it stands.</p>
      </div>
      <div className={s.chipRow} role="group" aria-label="Show">
        {Object.entries(groups).map(([id, g]) => (
          <FilterChip key={id} selected={tab === id} onSelectedChange={() => setTab(id)}>
            {g.label} · {g.items.length}
          </FilterChip>
        ))}
      </div>
      <ul className={s.stack} aria-label={current.label}>
        {current.items.map((c) => (
          <li key={c.id}>
            <button type="button" className={s.connection} onClick={() => (c.to ? go(c.to) : notify(NOT_IN_PROTOTYPE))}>
              <Img photo={photos[c.photo]} className={s.thumb} />
              <span className={s.rowText}>
                <span className={s.rowTitle}>{c.venue}</span>
                <span className={s.rowMeta}>{c.detail}</span>
                <span className={s.badgeLine}>
                  <StatusBadge status={c.status} label={c.statusLabel} size="sm" />
                  <span className={s.rowMeta}>{c.note}</span>
                </span>
              </span>
              <Icon name="chevronRight" size={20} className={s.chevron} />
            </button>
          </li>
        ))}
      </ul>
      <Footnote>
        Statuses: Submitted → In discussion → Offer sent → Confirmed, or Declined / Canceled. Each change is kept in the history. Fictional demo data.
      </Footnote>
    </Screen>
  );
}
