import { Button } from '../../components';
import { Icon } from '../../components/Icon';
import { useProto } from '../nav';
import { PHOTO_CREDIT, photos } from '../photos';
import { Footnote, Img, Screen } from '../ui';
import s from '../proto.module.css';

/** O1 · Welcome */
export function Welcome() {
  const { go } = useProto();
  return (
    <Screen
      label="Welcome to Bookd"
      footer={
        <>
          <Button fullWidth size="lg" iconEnd={<Icon name="arrowRight" />} onClick={() => go('local-pulse')}>
            Get started
          </Button>
          <p className={s.centerNote}>
            Already have an account?{' '}
            <button type="button" className={s.inlineLink} onClick={() => go('local-pulse')}>
              Log in
            </button>
          </p>
        </>
      }
    >
      <div className={s.collage} aria-hidden="true">
        <span className={s.glow} />
        <Img photo={photos.taproom} className={s.collageLeft} />
        <Img photo={photos.crowd} className={s.collageRight} />
        <Img photo={photos.performer} className={s.collageCenter} />
        <span className={s.collageChip} style={{ top: 12, left: 16 }}>
          <Icon name="music" /> Folk · Acoustic
        </span>
        <span className={s.collageChip} data-light style={{ top: 244, right: 16 }}>
          <Icon name="pin" /> The Lantern Room · 0.4 mi
        </span>
        <span className={s.collageChip} style={{ top: 284, left: 20 }}>
          <Icon name="calendar" /> Open gig · Fri 8 PM
        </span>
      </div>
      <div className={s.welcomeText}>
        <p className={s.wordmark}>Bookd</p>
        <h1 className={s.welcomeTitle}>Your next gig is closer than you think.</h1>
        <p className={s.lead}>Find local venues that are booking, keep track of every ask, and land the show.</p>
      </div>
      <Footnote>Fictional demo. {PHOTO_CREDIT}</Footnote>
    </Screen>
  );
}
