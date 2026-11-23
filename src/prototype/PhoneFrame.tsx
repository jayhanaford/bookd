import type { ReactNode } from 'react';
import { Icon } from '../components/Icon';
import { useProto } from './nav';
import s from './proto.module.css';

/**
 * iPhone-sized frame (393 x 852) with a status bar, home indicator and a live region
 * for prototype messages. Shrinks to the viewport on small screens.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  const { toast, restart } = useProto();
  return (
    <div className={s.stage} data-bookd-theme="dark">
      <div className={s.device}>
        <div className={s.statusBar} aria-hidden="true">
          <span>9:41</span>
          <span className={s.statusIcons}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
              <rect x="0" y="8" width="3" height="4" rx="1" />
              <rect x="5" y="5" width="3" height="7" rx="1" />
              <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
              <rect x="15" y="0" width="3" height="12" rx="1" />
            </svg>
            <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor">
              <rect x="0.5" y="0.5" width="22" height="11" rx="3" />
              <rect x="2.5" y="2.5" width="18" height="7" rx="1.5" fill="currentColor" stroke="none" />
              <path d="M24.5 4v4" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {children}
        <div className={s.toastRegion} role="status" aria-live="polite">
          {toast && (
            <p key={toast.id} className={s.toast}>
              <Icon name="info" size={16} />
              {toast.message}
            </p>
          )}
        </div>
        <span className={s.homeIndicator} aria-hidden="true" />
      </div>
      <p className={s.stageNote}>
        Clickable prototype · fictional demo data · photos are AI-generated.{' '}
        <button type="button" className={s.inlineLink} onClick={restart}>
          Restart
        </button>
      </p>
    </div>
  );
}
