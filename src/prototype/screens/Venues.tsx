import { Button, GenreTag, StatusBadge } from '../../components';
import { Icon } from '../../components/Icon';
import { NOT_IN_PROTOTYPE, useProto } from '../nav';
import { ListRow, Screen } from '../ui';
import s from '../proto.module.css';

function VenueHero({ name, meta, genres = [] }: { name: string; meta: string; genres?: string[] }) {
  return (
    <div className={s.gradientHero}>
      <h1 className={s.heroTitle}>{name}</h1>
      <p className={s.heroMeta}>{meta}</p>
      {genres.length > 0 && (
        <ul className={s.tagRow} aria-label="Genres">
          {genres.map((g) => (
            <li key={g}>
              <GenreTag variant="outline" size="sm">
                {g}
              </GenreTag>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** A2 · Venue profile, verified and accepting introductions. */
export function VenueVerified() {
  const { go, back, notify, state, update } = useProto();
  const toggleSave = () => {
    update({ savedVenue: !state.savedVenue });
    notify(state.savedVenue ? 'Removed from saved venues' : 'Saved. Find it under Connections › Venues');
  };
  return (
    <Screen
      label="The Lantern Room, venue profile"
      sheet
      topBar={{
        variant: 'overlay',
        leading: { icon: 'chevronLeft', label: 'Back', onClick: () => back() },
        trailing: [
          { icon: 'heart', label: 'Save venue', pressed: state.savedVenue, onClick: toggleSave },
          { icon: 'more', label: 'More options', onClick: () => notify(NOT_IN_PROTOTYPE) },
        ],
      }}
      hero={<VenueHero name="The Lantern Room" meta="Listening room · 120 cap · 0.8 mi · Portland, ME" genres={['Acoustic', 'Folk', 'Jazz']} />}
      footer={
        <div className={s.footerRow}>
          <Button variant="secondary" onClick={toggleSave}>
            {state.savedVenue ? 'Saved' : 'Save venue'}
          </Button>
          {state.introSent ? (
            <Button variant="primary-solid" onClick={() => notify('Intro sent. They review introductions weekly.')}>
              <Icon name="check" /> Intro sent
            </Button>
          ) : (
            <Button iconEnd={<Icon name="arrowRight" />} onClick={() => go('introduce')}>
              Introduce yourself
            </Button>
          )}
        </div>
      }
    >
      <div className={s.signalRow}>
        <span className={s.verified}>
          <Icon name="shieldCheck" size={16} /> Verified venue
        </span>
        <StatusBadge status="accepting-intros" label="Accepting introductions" size="sm" />
      </div>
      <section className={s.block} aria-labelledby="booking-with">
        <h2 id="booking-with" className={s.h3}>Booking with this venue</h2>
        <p className={s.mutedText}>Books acoustic, folk and jazz for Thursday–Saturday nights. Reviews introductions weekly.</p>
        <p className={s.confirmLine}>
          <Icon name="check" size={14} /> Confirmed by venue · Nov 22
        </p>
      </section>
      <hr className={s.divider} />
      <section className={s.block} aria-labelledby="venue-gigs">
        <h2 id="venue-gigs" className={s.h3}>Open gigs (2)</h2>
        <ul className={s.plainList}>
          <li>
            <ListRow light icon="calendar" title="Fri, Dec 11 · 8–10 PM" meta="$250 guarantee · solo / duo" onClick={() => go('gig-detail')} />
          </li>
          <li>
            <ListRow
              light
              icon="calendar"
              title="Thu, Jan 7 · 7–9 PM"
              meta="$200 · any acoustic act"
              onClick={() => notify('Only the Acoustic Friday gig is built in this prototype')}
            />
          </li>
        </ul>
      </section>
    </Screen>
  );
}

/** A4 · Venue profile, unclaimed listing (branch). No apply or intro: only public info and tracking. */
export function VenueUnclaimed() {
  const { back, notify, state, update } = useProto();
  const following = state.savedVenue;
  const toggleFollow = () => {
    update({ savedVenue: !following });
    notify(following ? 'Unfollowed Harborside Taproom' : 'Following. You’ll hear if the venue joins Bookd.');
  };
  return (
    <Screen
      label="Harborside Taproom, unclaimed listing"
      sheet
      topBar={{
        variant: 'overlay',
        leading: { icon: 'chevronLeft', label: 'Back', onClick: () => back() },
        trailing: [
          { icon: 'heart', label: 'Follow venue', pressed: following, onClick: toggleFollow },
          { icon: 'more', label: 'More options', onClick: () => notify(NOT_IN_PROTOTYPE) },
        ],
      }}
      hero={<VenueHero name="Harborside Taproom" meta="Brewery · 1.4 mi · Portland, ME" />}
      footer={
        <div className={s.footerRow}>
          <Button variant="secondary" onClick={() => notify('Outreach logged. Track follow-ups in Connections › Outreach.')}>
            Log outreach
          </Button>
          <Button variant={following ? 'primary-solid' : 'primary'} onClick={toggleFollow}>
            {following ? (
              <>
                <Icon name="check" /> Following
              </>
            ) : (
              'Follow venue'
            )}
          </Button>
        </div>
      }
    >
      <div className={s.signalRow}>
        <span className={s.unclaimed}>
          <Icon name="shield" size={16} /> Unclaimed listing
        </span>
        <StatusBadge status="hosts-music" label="Booking status unknown" size="sm" />
      </div>
      <section className={s.block} aria-labelledby="what-we-know">
        <h2 id="what-we-know" className={s.h3}>What we know</h2>
        <div className={s.evidence}>
          <p>Live music appears on their public events calendar.</p>
          <p className={s.rowMeta}>Public evidence · seen Nov 20 · not confirmed by the venue</p>
        </div>
        <p className={s.mutedText}>The venue hasn’t joined Bookd, so you can’t apply or introduce yourself here yet.</p>
      </section>
      <section className={s.block} aria-labelledby="public-contact">
        <h2 id="public-contact" className={s.h3}>Public contact</h2>
        <ListRow
          light
          icon="mail"
          title="events@harborside.example"
          meta="Listed on the venue’s website"
          onClick={() => notify('This would open your email app. Not part of this prototype.')}
        />
        <p className={s.smallText}>Log it here if you reach out, so you can track follow-ups.</p>
        <p className={s.smallText}>
          <Icon name="building" size={14} /> Is this your venue?{' '}
          <button type="button" className={s.inlineLink} onClick={() => notify('Venue claiming is not part of this prototype yet')}>
            Claim it
          </button>
        </p>
      </section>
    </Screen>
  );
}
