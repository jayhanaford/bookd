import { useState, type MouseEvent } from 'react';
import { Button, FilterChip, SearchField, StatusBadge, VenueCard } from '../../components';
import { Icon } from '../../components/Icon';
import { nearbyVenues, openGigs, whoIsBooking } from '../data';
import { NOT_IN_PROTOTYPE, useProto, type ScreenId } from '../nav';
import { PHOTO_CREDIT, photos } from '../photos';
import { Footnote, Img, Screen, SectionHeader, cx } from '../ui';
import s from '../proto.module.css';

const chips = ['Folk / acoustic', 'Breweries', 'Verified booking', 'This month'];

const venueScreens: Record<string, ScreenId | undefined> = {
  lantern: 'venue-verified',
  harborside: 'venue-unclaimed',
};

/** A1 · Local Pulse: open gigs first, then who's booking, then nearby venues. */
export function LocalPulse() {
  const { go, notify } = useProto();
  const [selected, setSelected] = useState<string[]>(['Folk / acoustic']);
  const [view, setView] = useState<'list' | 'map'>('list');

  const openVenue = (id: string) => (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('a')) return;
    event.preventDefault();
    const target = venueScreens[id];
    if (target) go(target);
    else notify(NOT_IN_PROTOTYPE);
  };

  return (
    <Screen label="Local Pulse" tabs={{ kind: 'musician', active: 'local-pulse' }}>
      <div className={s.pageHead}>
        <div>
          <p className={s.eyebrow}>Local Pulse</p>
          <h1 className={s.h1}>
            <button type="button" className={s.titleButton} onClick={() => notify('Changing area is not part of this prototype yet')}>
              Portland, ME <Icon name="chevronDown" size={20} />
            </button>
          </h1>
          <p className={s.sub}>Within 15 mi · 3 open gigs this month</p>
        </div>
        <div className={s.segmented} role="group" aria-label="View">
          <button type="button" aria-pressed={view === 'list'} aria-label="List view" onClick={() => setView('list')}>
            <Icon name="list" size={18} />
          </button>
          <button
            type="button"
            aria-pressed={view === 'map'}
            aria-label="Map view"
            onClick={() => {
              setView('list');
              notify('Map view is not part of this prototype yet');
            }}
          >
            <Icon name="map" size={18} />
          </button>
        </div>
      </div>

      <SearchField label="Search Local Pulse" placeholder="Search venues, genres, towns" onFiltersClick={() => notify(NOT_IN_PROTOTYPE)} />

      <div className={s.chipRow} role="group" aria-label="Quick filters">
        <button type="button" className={s.filtersButton} onClick={() => notify(NOT_IN_PROTOTYPE)}>
          <Icon name="sliders" size={16} /> Filters
        </button>
        {chips.map((c) => (
          <FilterChip
            key={c}
            selected={selected.includes(c)}
            onSelectedChange={(on) => setSelected((cur) => (on ? [...cur, c] : cur.filter((x) => x !== c)))}
          >
            {c}
          </FilterChip>
        ))}
      </div>

      <section aria-labelledby="open-gigs">
        <SectionHeader id="open-gigs" title="New open gigs near you" action="See all 3" onAction={() => notify(NOT_IN_PROTOTYPE)} />
        <ul className={s.rail}>
          {openGigs.map((g, i) => (
            <li key={g.id}>
              <article className={s.railCard} data-bookd-theme="light">
                <div className={s.railMedia}>
                  <Img photo={photos[g.photo]} />
                  <StatusBadge status="open-gig" size="sm" className={s.railBadge} />
                  <span className={s.railDistance}>{g.distance}</span>
                </div>
                <div className={s.railBody}>
                  <p className={s.railDate}>
                    {g.date} · {g.time}
                  </p>
                  <h3 className={s.h3}>{g.venue}</h3>
                  <p className={s.railPay}>{g.pay}</p>
                  <p className={s.mutedText}>{g.style}</p>
                  <p className={s.verifiedLine}>
                    <Icon name="shieldCheck" size={14} /> Verified venue · {g.posted}
                  </p>
                  <Button
                    size="sm"
                    fullWidth
                    iconEnd={<Icon name="arrowRight" />}
                    aria-label={`View gig: ${g.venue}, ${g.date}`}
                    onClick={() => (i === 0 ? go('gig-detail') : notify('Only the Acoustic Friday gig is built in this prototype'))}
                  >
                    View gig
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="who-booking">
        <div className={s.sectionHeader}>
          <h2 id="who-booking" className={s.h2}>Who&rsquo;s booking</h2>
          <button
            type="button"
            className={s.mutedLink}
            onClick={() => notify('Venue-posted and venue-confirmed items come from venues. Public evidence is unconfirmed.')}
          >
            How we source these <Icon name="info" size={14} />
          </button>
        </div>
        <ul className={s.panelList}>
          {whoIsBooking.map((w) => {
            const target: ScreenId | undefined = w.id === 'w2' ? 'venue-verified' : w.id === 'w3' ? 'venue-unclaimed' : undefined;
            return (
              <li key={w.id}>
                <button type="button" className={s.feedItem} onClick={() => (target ? go(target) : notify(NOT_IN_PROTOTYPE))}>
                  <span className={s.feedIcon} aria-hidden="true">
                    <Icon name={w.icon} size={16} />
                  </span>
                  <span className={s.rowText}>
                    <span>{w.text}</span>
                    <span className={s.rowMeta}>
                      <span className={cx(w.strong && s.accentText)}>{w.source}</span> · {w.when}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="nearby">
        <div className={s.sectionHeader}>
          <h2 id="nearby" className={s.h2}>Nearby venues</h2>
          <button type="button" className={s.mutedLink} onClick={() => notify(NOT_IN_PROTOTYPE)}>
            Nearest first <Icon name="chevronDown" size={14} />
          </button>
        </div>
        <ul className={s.stack}>
          {nearbyVenues.map((v) => (
            <li key={v.id}>
              <VenueCard
                variant="compact"
                name={v.name}
                location={v.type}
                distance={v.distance}
                verification={v.verification}
                availability={v.availability}
                genres={[...v.genres]}
                media={<Img photo={photos[v.photo]} />}
                href={`#venue-${v.id}`}
                onClick={openVenue(v.id)}
              />
            </li>
          ))}
        </ul>
      </section>

      <Footnote>Fictional demo data. {PHOTO_CREDIT}</Footnote>
    </Screen>
  );
}
