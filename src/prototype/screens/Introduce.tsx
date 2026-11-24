import { useState } from 'react';
import { Button } from '../../components';
import { Icon } from '../../components/Icon';
import { samples } from '../data';
import { useProto } from '../nav';
import { photos } from '../photos';
import { Check, Img, Screen } from '../ui';
import s from '../proto.module.css';

const MAX_SAMPLES = 3;
const MAX_CHARS = 600;

/** A3 · Introduce yourself to a verified venue. */
export function Introduce() {
  const { back, notify, update } = useProto();
  const [picked, setPicked] = useState<string[]>(['s1', 's2']);
  const [intro, setIntro] = useState(
    'Hi! We’re Juniper & the Tides, an acoustic duo from Portland. We play warm, harmony-led folk and would love to play a listening-room night at The Lantern Room.',
  );
  const [dates, setDates] = useState('Fridays & Saturdays in Dec–Jan');
  const [error, setError] = useState('');

  const send = () => {
    if (picked.length === 0) return setError('Pick at least one sample so the venue can hear you.');
    if (!intro.trim()) return setError('Add a short intro.');
    update({ introSent: true });
    notify('Introduction sent to The Lantern Room');
    back('venue-verified');
  };

  return (
    <Screen
      label="Introduce yourself"
      topBar={{ title: 'Introduce yourself', leading: { icon: 'x', label: 'Close', onClick: () => back('venue-verified') } }}
      footer={
        <>
          {error && (
            <p className={s.error} role="alert">
              {error}
            </p>
          )}
          <Button fullWidth size="lg" iconEnd={<Icon name="arrowRight" />} onClick={send}>
            Send introduction
          </Button>
        </>
      }
    >
      <div className={s.toCard}>
        <Img photo={photos.lantern} className={s.thumb} />
        <div className={s.rowText}>
          <span className={s.rowTitle}>
            To: The Lantern Room <Icon name="shieldCheck" size={14} className={s.accentText} />
            <span className={s.srOnly}>, verified venue</span>
          </span>
          <span className={s.rowMeta}>They review introductions weekly</span>
        </div>
      </div>

      <fieldset className={s.fieldset}>
        <legend className={s.legendRow}>
          <span className={s.label}>Pick up to {MAX_SAMPLES} samples</span>
          <span className={s.counter}>
            {picked.length} of {MAX_SAMPLES} selected
          </span>
        </legend>
        {samples.map((m) => (
          <Check
            key={m.id}
            boxed
            checked={picked.includes(m.id)}
            onChange={(on) => setPicked((cur) => (on ? [...cur, m.id].slice(-MAX_SAMPLES) : cur.filter((x) => x !== m.id)))}
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

      <div className={s.field}>
        <div className={s.legendRow}>
          <label htmlFor="intro" className={s.label}>
            Your intro
          </label>
          <span className={s.counter}>
            {intro.length} / {MAX_CHARS}
          </span>
        </div>
        <textarea id="intro" className={s.input} rows={5} maxLength={MAX_CHARS} value={intro} onChange={(e) => setIntro(e.target.value)} />
      </div>

      <div className={s.field}>
        <label htmlFor="dates" className={s.label}>
          Dates you’re open (optional)
        </label>
        <input id="dates" className={s.input} value={dates} onChange={(e) => setDates(e.target.value)} />
      </div>

      <p className={s.smallText}>
        <Icon name="info" size={14} /> Your profile, genres and travel radius are shared with the venue.
      </p>
    </Screen>
  );
}
