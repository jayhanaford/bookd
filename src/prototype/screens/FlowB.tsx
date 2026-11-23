import { useState, type ReactNode } from 'react';
import { BookingSummaryTicket, Button, StatusBadge } from '../../components';
import { Icon, type IconName } from '../../components/Icon';
import { act, gig, samples } from '../data';
import { NOT_IN_PROTOTYPE, useProto } from '../nav';
import { photos } from '../photos';
import { Check, Img, Screen, cx } from '../ui';
import s from '../proto.module.css';

function Fact({ icon, term, children, wide }: { icon: IconName; term: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={cx(s.fact, wide && s.factWide)}>
      <Icon name={icon} size={16} className={s.factIcon} />
      <dt className={s.factTerm}>{term}</dt>
      <dd className={s.factValue}>{children}</dd>
    </div>
  );
}

/** B1 · Gig detail */
export function GigDetail() {
  const { go, back, notify, state } = useProto();
  const [saved, setSaved] = useState(false);
  const toggleSave = () => {
    setSaved(!saved);
    notify(saved ? 'Removed from saved gigs' : 'Saved for later');
  };

  let primary = (
    <Button iconEnd={<Icon name="arrowRight" />} onClick={() => go('apply')}>
      Apply to this gig
    </Button>
  );
  if (state.offerAccepted) primary = <Button onClick={() => go('confirmed')}>View booking</Button>;
  else if (state.applied) primary = <Button onClick={() => go('application-sent')}>View application</Button>;

  return (
    <Screen
      label="Gig detail: Acoustic Friday"
      topBar={{
        title: 'Gig detail',
        leading: { icon: 'chevronLeft', label: 'Back', onClick: () => back() },
        trailing: [{ icon: 'heart', label: 'Save gig', pressed: saved, onClick: toggleSave }],
      }}
      footer={
        <div className={s.footerRow}>
          <Button variant="secondary" onClick={toggleSave}>
            {saved ? 'Saved' : 'Save for later'}
          </Button>
          {primary}
        </div>
      }
    >
      <div className={s.gigMedia}>
        <Img photo={photos.taproom} />
        <StatusBadge status="open-gig" className={s.railBadge} />
      </div>
      <div className={s.titleBlock}>
        <h2 className={s.display}>{gig.title}</h2>
        <button type="button" className={s.venueLink} onClick={() => go('venue-verified')}>
          {gig.venue}
          <span className={s.verifiedInline}>
            <Icon name="shieldCheck" size={14} /> Verified
          </span>
          · 0.8 mi <Icon name="chevronRight" size={14} />
        </button>
        <p className={s.accentSmall}>{gig.closes}</p>
      </div>
      <dl className={s.factsCard} data-bookd-theme="light">
        <Fact icon="calendar" term="Date">{gig.date}</Fact>
        <Fact icon="clock" term="Set times">
          {gig.times} · {gig.sets}
        </Fact>
        <Fact icon="dollar" term="Pay">{gig.pay}</Fact>
        <Fact icon="music" term="Style">{gig.style}</Fact>
        <Fact icon="users" term="Provided" wide>
          {gig.provided}
        </Fact>
      </dl>
      <div className={s.successPanel} data-bookd-theme="light">
        <span className={s.successIcon} aria-hidden="true">
          <Icon name="check" size={16} />
        </span>
        <div>
          <p className={s.rowTitle}>You’re free that night</p>
          <p className={s.rowMeta}>No conflicts on your Bookd calendar, including gigs you logged yourself.</p>
        </div>
      </div>
    </Screen>
  );
}

/** B2 · Apply */
export function Apply() {
  const { go, back, notify, update } = useProto();
  const [picked, setPicked] = useState<string[]>(['s1', 's2']);
  const [available, setAvailable] = useState(true);
  const [sets, setSets] = useState(true);
  const [note, setNote] = useState('We’d love to play your listening room. Happy to keep it quiet and acoustic.');
  const [rate, setRate] = useState('$250 · same as posted');
  const [error, setError] = useState('');

  const send = () => {
    if (!available || !sets) return setError('Confirm both items so the venue knows you can play this slot.');
    update({ applied: true });
    go('application-sent');
  };

  return (
    <Screen
      label="Apply to Acoustic Friday"
      topBar={{ title: 'Apply', leading: { icon: 'x', label: 'Close', onClick: () => back('gig-detail') } }}
      footer={
        <>
          {error && (
            <p className={s.error} role="alert">
              {error}
            </p>
          )}
          <Button fullWidth size="lg" iconEnd={<Icon name="arrowRight" />} onClick={send}>
            Send application
          </Button>
        </>
      }
    >
      <div className={s.toCard}>
        <span className={s.dateTile} data-bookd-theme="light" aria-hidden="true">
          <span className={s.dateMonth}>DEC</span>
          <span className={s.dateDay}>11</span>
        </span>
        <div className={s.rowText}>
          <span className={s.rowTitle}>
            {gig.title} · {gig.venue}
          </span>
          <span className={s.rowMeta}>Fri 8–10 PM · {gig.pay}</span>
        </div>
      </div>

      <fieldset className={s.fieldset}>
        <legend className={s.legendRow}>
          <span className={s.label}>Samples to include</span>
          <button type="button" className={s.textLink} onClick={() => notify(NOT_IN_PROTOTYPE)}>
            Change
          </button>
        </legend>
        {samples.slice(0, 2).map((m) => (
          <Check
            key={m.id}
            boxed
            checked={picked.includes(m.id)}
            onChange={(on) => setPicked((cur) => (on ? [...cur, m.id] : cur.filter((x) => x !== m.id)))}
            meta={m.meta}
            leading={
              <span className={s.mediaTile} aria-hidden="true">
                <Icon name={m.kind === 'video' ? 'video' : 'play'} size={16} />
              </span>
            }
          >
            {m.title}
          </Check>
        ))}
      </fieldset>

      <fieldset className={s.fieldset}>
        <legend className={s.label}>Confirm</legend>
        <Check checked={available} onChange={setAvailable}>
          I’m available Fri, Dec 11, 8–10 PM
        </Check>
        <Check checked={sets} onChange={setSets}>
          I can play two 50-min sets
        </Check>
      </fieldset>

      <div className={s.field}>
        <div className={s.legendRow}>
          <label htmlFor="note" className={s.label}>
            Note to the venue (optional)
          </label>
          <span className={s.counter}>{note.length} / 600</span>
        </div>
        <textarea id="note" className={s.input} rows={4} maxLength={600} value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <div className={s.field}>
        <label htmlFor="rate" className={s.label}>
          Your rate (optional)
        </label>
        <input id="rate" className={s.input} value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>
    </Screen>
  );
}

const steps = [
  { title: 'Submitted', meta: 'Today', state: 'done' },
  { title: 'Venue reviews', meta: 'They may message you with questions', state: 'current' },
  { title: 'Offer sent', meta: 'Exact date, times and pay, for you to accept', state: 'todo' },
  { title: 'You accept → Confirmed', meta: 'Added to both calendars', state: 'todo' },
] as const;

/** B3 · Application sent */
export function ApplicationSent() {
  const { go, tab } = useProto();
  return (
    <Screen
      label="Application sent"
      topBar={{ leading: { icon: 'x', label: 'Close', onClick: () => tab('local-pulse') } }}
      footer={
        <>
          <Button fullWidth onClick={() => tab('connections')}>
            View in Connections
          </Button>
          <Button fullWidth variant="secondary" onClick={() => tab('local-pulse')}>
            Back to Local Pulse
          </Button>
        </>
      }
    >
      <div className={s.successHead}>
        <span className={s.bigCheck} aria-hidden="true">
          <Icon name="check" size={28} />
        </span>
        <h1 className={s.h1}>Application sent</h1>
        <p className={s.mutedText}>The Lantern Room will review it. You’ll get a notice if they reply or send an offer. Nothing is booked yet.</p>
      </div>
      <div className={s.summaryCard}>
        <div className={s.rowText}>
          <span className={s.rowTitle}>
            {gig.title} · {gig.venue}
          </span>
          <span className={s.rowMeta}>Fri, Dec 11 · 8–10 PM</span>
        </div>
        <StatusBadge status="pending" label="Submitted" size="sm" />
      </div>
      <section aria-labelledby="next">
        <h2 id="next" className={s.h2}>What happens next</h2>
        <ol className={s.steps}>
          {steps.map((st) => (
            <li key={st.title} className={cx(s.step, s[st.state])} aria-current={st.state === 'current' ? 'step' : undefined}>
              <span className={s.stepDot} aria-hidden="true">
                {st.state === 'done' && <Icon name="check" size={12} />}
              </span>
              <span className={s.rowText}>
                <span className={s.rowTitle}>
                  {st.title}
                  {st.state === 'done' && <span className={s.srOnly}> (done)</span>}
                </span>
                <span className={s.rowMeta}>{st.meta}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
      <button type="button" className={s.protoShortcut} onClick={() => go('offer')}>
        <span className={s.protoTag}>Prototype</span>
        Skip ahead: the venue sends an offer
        <Icon name="arrowRight" size={16} />
      </button>
    </Screen>
  );
}

/** B4 · Review booking offer (versioned) */
export function Offer() {
  const { go, back, notify, update, state } = useProto();
  const accept = () => {
    update({ offerAccepted: true, applied: true });
    go('confirmed');
  };
  return (
    <Screen
      label="Booking offer from The Lantern Room"
      topBar={{
        title: 'Booking offer',
        leading: { icon: 'chevronLeft', label: 'Back', onClick: () => back('my-bookd') },
        trailing: [{ icon: 'more', label: 'More options', onClick: () => notify(NOT_IN_PROTOTYPE) }],
      }}
      footer={
        state.offerAccepted ? (
          <Button fullWidth size="lg" onClick={() => go('confirmed')}>
            View confirmed booking
          </Button>
        ) : (
          <>
            <Button fullWidth size="lg" iconEnd={<Icon name="arrowRight" />} onClick={accept}>
              Accept offer
            </Button>
            <Button fullWidth variant="tertiary" onClick={() => notify('Asking for changes is not part of this prototype yet')}>
              Ask for changes or decline
            </Button>
          </>
        )
      }
    >
      <BookingSummaryTicket
        status={state.offerAccepted ? 'confirmed' : 'pending'}
        statusLabel={state.offerAccepted ? undefined : 'Offer sent · v2'}
        venueName={gig.venue}
        headline={state.offerAccepted ? 'You accepted this offer' : 'Sent you a booking offer · updated Dec 3'}
        actName={act.name}
        date={gig.isoDate}
        setTime={gig.times}
        setLength="two 50-min sets"
        loadIn={gig.loadIn}
        pay={gig.offerPay}
        paymentNote="Changed from $250 in v1"
        venueAddress="12 Demo St, Portland, ME"
        headingLevel="h2"
      />
      <p className={s.infoPanel}>
        <Icon name="info" size={16} />
        Offer v2 (v1 had a $250 guarantee). Nothing is booked until you accept. If terms change later, the venue sends a new version for you to accept.
      </p>
    </Screen>
  );
}

/** B5 · Booking confirmed: the ticket appears only once both sides agreed. */
export function Confirmed() {
  const { tab, notify } = useProto();
  const [paid, setPaid] = useState(false);
  return (
    <Screen
      label="Booking confirmed"
      footer={
        <div className={s.footerRow}>
          <Button variant="secondary" onClick={() => notify('Messaging is not part of this prototype yet')}>
            Message venue
          </Button>
          <Button iconEnd={<Icon name="arrowRight" />} onClick={() => tab('my-bookd')}>
            Go to My Bookd
          </Button>
        </div>
      }
    >
      <div className={s.titleBlock}>
        <h1 className={s.display}>You’re booked!</h1>
        <p className={s.mutedText}>Added to your calendar and The Lantern Room’s lineup.</p>
      </div>
      <BookingSummaryTicket
        status="confirmed"
        venueName={gig.venue}
        headline={`${act.name} is booked`}
        media={<Img photo={photos.taproom} />}
        actName={act.name}
        date={gig.isoDate}
        setTime={gig.times}
        loadIn={gig.loadIn}
        pay={gig.offerPay}
        paymentNote={paid ? 'Marked as paid by you' : 'Not paid yet'}
        reference={`${gig.reference} · shared record for artist and venue`}
        headingLevel="h2"
        actions={
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => {
              setPaid(!paid);
              notify(paid ? 'Marked as not paid' : 'Marked as paid. Bookd doesn’t process payments.');
            }}
          >
            {paid ? 'Undo: mark as not paid' : 'Mark when paid'}
          </Button>
        }
      />
    </Screen>
  );
}
