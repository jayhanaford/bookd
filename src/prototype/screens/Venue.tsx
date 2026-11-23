import { useState } from 'react';
import { BookingSummaryTicket, Button, StatusBadge } from '../../components';
import { Icon } from '../../components/Icon';
import { act, gig } from '../data';
import { NOT_IN_PROTOTYPE, useProto } from '../nav';
import { Check, Footnote, ListRow, Screen, SectionHeader, cx } from '../ui';
import s from '../proto.module.css';

function DateTile({ month, day }: { month: string; day: number }) {
  return (
    <span className={s.dateTile} data-bookd-theme="light" aria-hidden="true">
      <span className={s.dateMonth}>{month}</span>
      <span className={s.dateDay}>{day}</span>
    </span>
  );
}

/** C1 · My Lineup, the venue's dashboard. */
export function Lineup() {
  const { go, notify, state } = useProto();
  return (
    <Screen label="My Lineup" tabs={{ kind: 'venue', active: 'my-lineup' }}>
      <div className={s.pageHead}>
        <div>
          <p className={s.sub}>
            The Lantern Room <Icon name="shieldCheck" size={14} className={s.accentText} />
            <span className={s.srOnly}>, verified venue</span>
          </p>
          <h1 className={s.h1}>My Lineup</h1>
        </div>
        <Button size="sm" iconStart={<Icon name="plus" />} onClick={() => go('post-basics')}>
          Post a gig
        </Button>
      </div>

      {state.publishedDates !== null && (
        <div className={s.successPanel} data-bookd-theme="light" role="status">
          <span className={s.successIcon} aria-hidden="true">
            <Icon name="check" size={16} />
          </span>
          <div>
            <p className={s.rowTitle}>{state.publishedDates} open dates published</p>
            <p className={s.rowMeta}>Acoustic Fridays · musicians nearby can apply now</p>
          </div>
        </div>
      )}

      <section aria-labelledby="attention" className={s.stack}>
        <h2 id="attention" className={s.h2}>Needs attention (3)</h2>
        <ul className={cx(s.plainList, s.whiteList)} data-bookd-theme="light">
          <li>
            <ListRow light icon="users" title="2 new applications" meta="Acoustic Friday · Dec 11" onClick={() => notify('Reviewing applicants is not part of this prototype yet')} />
          </li>
          <li>
            <ListRow light icon="message" title="1 introduction" meta={`${act.name} · acoustic duo`} onClick={() => notify(NOT_IN_PROTOTYPE)} />
          </li>
        </ul>
      </section>

      <section aria-labelledby="next-two" className={s.stack}>
        <SectionHeader id="next-two" title="Next 2 weeks" action="Calendar" onAction={() => notify(NOT_IN_PROTOTYPE)} />
        <button type="button" className={s.slotRow} onClick={() => notify(NOT_IN_PROTOTYPE)}>
          <DateTile month="DEC" day={4} />
          <span className={s.rowText}>
            <span className={s.rowTitle}>Fri · 8–10 PM</span>
            <span className={s.badgeLine}>
              <StatusBadge status="open-gig" size="sm" />
              <span className={s.rowMeta}>3 applicants</span>
            </span>
          </span>
          <Icon name="chevronRight" size={20} className={s.chevron} />
        </button>
        <BookingSummaryTicket
          variant="compact"
          status="confirmed"
          venueName={act.name}
          date={gig.isoDate}
          setTime="8–10 PM"
          actName="Load-in 7:15 · $275 agreed"
          headingLevel="h3"
        />
        <button type="button" className={s.slotRow} onClick={() => notify(NOT_IN_PROTOTYPE)}>
          <DateTile month="DEC" day={18} />
          <span className={s.rowText}>
            <span className={s.rowTitle}>Fri · 8–10 PM</span>
            <span className={s.badgeLine}>
              <StatusBadge status="open-gig" size="sm" />
              <span className={s.rowMeta}>No act yet</span>
            </span>
          </span>
          <Icon name="chevronRight" size={20} className={s.chevron} />
        </button>
      </section>
      <Footnote>Fictional demo data. Venue view of the same Lantern Room booking.</Footnote>
    </Screen>
  );
}

function Progress({ step, label }: { step: number; label: string }) {
  return (
    <div className={s.progress}>
      <div className={s.legendRow}>
        <span className={s.label}>{label}</span>
        <span className={s.counter}>{step} of 3</span>
      </div>
      <div className={s.progressBar} role="progressbar" aria-label={`Step ${step} of 3`} aria-valuemin={1} aria-valuemax={3} aria-valuenow={step}>
        {[1, 2, 3].map((i) => (
          <span key={i} className={cx(s.progressSeg, i <= step && s.progressOn)} />
        ))}
      </div>
    </div>
  );
}

function Select({ id, label, value, options, onChange, hint }: { id: string; label: string; value: string; options: string[]; onChange: (v: string) => void; hint?: string }) {
  return (
    <div className={s.field}>
      <div className={s.legendRow}>
        <label htmlFor={id} className={s.label}>
          {label}
        </label>
        {hint && <span className={s.counter}>{hint}</span>}
      </div>
      <div className={s.selectWrap}>
        <select id={id} className={s.input} value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <Icon name="chevronDown" size={18} className={s.selectIcon} />
      </div>
    </div>
  );
}

/** C2 · Post a gig, basics. */
export function PostBasics() {
  const { go, back, notify } = useProto();
  const [kind, setKind] = useState<'one-time' | 'recurring'>('recurring');
  const [title, setTitle] = useState('Acoustic Fridays');
  const [styles, setStyles] = useState(['Acoustic', 'Folk', 'Singer-songwriter']);
  const [size, setSize] = useState('Solo or duo');
  const [pay, setPay] = useState('$200–275 guarantee');
  const [provide, setProvide] = useState('House PA, one mic stand');

  return (
    <Screen
      label="Post a gig: basics"
      topBar={{ title: 'Post a gig', leading: { icon: 'x', label: 'Close', onClick: () => back('lineup') } }}
      footer={
        <Button
          fullWidth
          size="lg"
          iconEnd={<Icon name="arrowRight" />}
          onClick={() => {
            if (kind === 'one-time') notify('This prototype continues with the recurring series');
            go('post-schedule');
          }}
        >
          Next: schedule
        </Button>
      }
    >
      <Progress step={1} label="Basics" />
      <fieldset className={s.fieldset}>
        <legend className={s.label}>What kind of gig?</legend>
        <div className={s.optionGrid}>
          {(
            [
              ['one-time', 'One-time', 'A single date'],
              ['recurring', 'Recurring series', 'Same slot, many dates'],
            ] as const
          ).map(([id, name, meta]) => (
            <label key={id} className={cx(s.option, kind === id && s.optionOn)}>
              <input type="radio" name="kind" value={id} checked={kind === id} onChange={() => setKind(id)} className={s.radio} />
              <span className={s.rowText}>
                <span className={s.rowTitle}>{name}</span>
                <span className={s.rowMeta}>{meta}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={s.field}>
        <label htmlFor="gig-title" className={s.label}>
          Title
        </label>
        <input id="gig-title" className={s.input} value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <fieldset className={s.fieldset}>
        <legend className={s.label}>Styles you’re looking for</legend>
        <ul className={s.wrapRow}>
          {styles.map((st) => (
            <li key={st} className={s.removable}>
              {st}
              <button type="button" aria-label={`Remove ${st}`} onClick={() => setStyles((cur) => cur.filter((x) => x !== st))}>
                <Icon name="x" size={14} />
              </button>
            </li>
          ))}
          <li>
            <button type="button" className={s.addChip} onClick={() => notify(NOT_IN_PROTOTYPE)}>
              <Icon name="plus" size={14} /> Add style
            </button>
          </li>
        </ul>
      </fieldset>

      <Select id="act-size" label="Act size" value={size} onChange={setSize} options={['Solo', 'Solo or duo', 'Duo or trio', 'Full band']} />

      <div className={s.field}>
        <div className={s.legendRow}>
          <label htmlFor="pay" className={s.label}>
            Pay per date
          </label>
          <span className={s.counter}>Can differ per date</span>
        </div>
        <input id="pay" className={s.input} value={pay} onChange={(e) => setPay(e.target.value)} />
      </div>

      <div className={s.field}>
        <label htmlFor="provide" className={s.label}>
          What you provide
        </label>
        <input id="provide" className={s.input} value={provide} onChange={(e) => setProvide(e.target.value)} />
      </div>
    </Screen>
  );
}

const DAYS = [
  ['M', 'Monday'],
  ['T', 'Tuesday'],
  ['W', 'Wednesday'],
  ['T', 'Thursday'],
  ['F', 'Friday'],
  ['S', 'Saturday'],
  ['S', 'Sunday'],
] as const;

const TIMES = ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'];

/** C3 · Post a gig, schedule. */
export function PostSchedule() {
  const { go, back } = useProto();
  const [days, setDays] = useState<string[]>(['Friday']);
  const [start, setStart] = useState('8:00 PM');
  const [end, setEnd] = useState('10:00 PM');
  const [tz, setTz] = useState('Eastern · Portland, ME');
  const [through, setThrough] = useState('Feb 19, 2027');
  const [closeEarly, setCloseEarly] = useState(true);

  const summary = days.length ? `Every ${DAYS.filter(([, d]) => days.includes(d)).map(([, d]) => d).join(', ')}` : 'Pick at least one day';

  return (
    <Screen
      label="Post a gig: schedule"
      topBar={{ title: 'Schedule', leading: { icon: 'chevronLeft', label: 'Back', onClick: () => back('post-basics') } }}
      footer={
        <Button fullWidth size="lg" iconEnd={<Icon name="arrowRight" />} onClick={() => go('post-preview')} disabled={days.length === 0}>
          Preview dates
        </Button>
      }
    >
      <Progress step={2} label="Schedule" />
      <fieldset className={s.fieldset}>
        <legend className={s.label}>Repeats every</legend>
        <div className={s.dayRow}>
          {DAYS.map(([short, day]) => (
            <button
              key={day}
              type="button"
              className={s.day}
              aria-pressed={days.includes(day)}
              aria-label={day}
              onClick={() => setDays((cur) => (cur.includes(day) ? cur.filter((x) => x !== day) : [...cur, day]))}
            >
              {short}
            </button>
          ))}
        </div>
        <p className={s.rowMeta} aria-live="polite">
          {summary}
        </p>
      </fieldset>
      <div className={s.twoCol}>
        <Select id="start" label="Start" value={start} onChange={setStart} options={TIMES} />
        <Select id="end" label="End" value={end} onChange={setEnd} options={TIMES} />
      </div>
      <Select id="tz" label="Time zone" value={tz} onChange={setTz} options={['Eastern · Portland, ME', 'Central', 'Mountain', 'Pacific']} />
      <Select id="through" label="Post dates through" hint="12 dates" value={through} onChange={setThrough} options={['Jan 29, 2027', 'Feb 19, 2027', 'Mar 26, 2027']} />
      <div className={s.switchRow}>
        <span className={s.rowText}>
          <span className={s.rowTitle} id="close-early">
            Close applications early
          </span>
          <span className={s.rowMeta}>7 days before each date</span>
        </span>
        <button type="button" role="switch" aria-checked={closeEarly} aria-labelledby="close-early" className={s.switch} onClick={() => setCloseEarly(!closeEarly)}>
          <span className={s.switchThumb} />
        </button>
      </div>
    </Screen>
  );
}

const generated = [
  { id: 'd1', date: 'Fri, Dec 4', on: true, pay: '$200', note: 'Open gig' },
  { id: 'd2', date: 'Fri, Dec 11', on: false, pay: '—', note: 'Skipped · already booked' },
  { id: 'd3', date: 'Fri, Dec 18', on: true, pay: '$200', note: 'Open gig' },
  { id: 'd4', date: 'Fri, Dec 25', on: false, pay: '—', note: 'Skipped · holiday' },
  { id: 'd5', date: 'Fri, Jan 1', on: true, pay: '$200', note: 'Open gig' },
  { id: 'd6', date: 'Fri, Jan 8', on: true, pay: '$250', note: 'Pay edited for this date', edited: true },
];
const MORE = 6;

/** C4 · Preview and publish dates. Each date is its own bookable opportunity. */
export function PostPreview() {
  const { back, tab, notify, update } = useProto();
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(generated.map((g) => [g.id, g.on])));
  const count = Object.values(on).filter(Boolean).length + MORE;

  return (
    <Screen
      label="Preview dates"
      topBar={{ title: 'Preview dates', leading: { icon: 'chevronLeft', label: 'Back', onClick: () => back('post-schedule') } }}
      footer={
        <>
          <Button
            fullWidth
            size="lg"
            iconEnd={<Icon name="arrowRight" />}
            onClick={() => {
              update({ publishedDates: count });
              notify(`${count} open dates published`);
              tab('lineup');
            }}
          >
            Publish {count} open dates
          </Button>
          <Button fullWidth variant="tertiary" onClick={() => notify('Saved as a draft')}>
            Save as draft
          </Button>
        </>
      }
    >
      <Progress step={3} label="Preview" />
      <div>
        <h1 className={s.h1}>12 dates generated</h1>
        <p className={s.mutedText}>Each date is booked on its own. Untick to skip, or edit pay for one date.</p>
      </div>
      <div className={s.stack}>
        {generated.map((g) => (
          <Check
            key={g.id}
            boxed
            checked={on[g.id]}
            onChange={(v) => setOn((cur) => ({ ...cur, [g.id]: v }))}
            meta={<span className={cx(g.edited && s.accentText)}>{on[g.id] ? g.note : g.note.startsWith('Skipped') ? g.note : 'Skipped by you'}</span>}
          >
            <span className={s.dateLine}>
              <span>{g.date} · 8–10 PM</span>
              <span className={s.pay}>{on[g.id] ? (g.pay === '—' ? '$200' : g.pay) : '—'}</span>
            </span>
          </Check>
        ))}
      </div>
      <button type="button" className={s.textLink} onClick={() => notify(NOT_IN_PROTOTYPE)}>
        + {MORE} more dates
      </button>
    </Screen>
  );
}
