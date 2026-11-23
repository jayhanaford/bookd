import { useEffect, useRef, type ReactNode } from 'react';
import { BottomNavigation, musicianTabs, venueTabs, TopBar, type TopBarProps } from '../components';
import { Icon, type IconName } from '../components/Icon';
import { NOT_IN_PROTOTYPE, useProto, type ScreenId } from './nav';
import type { Photo } from './photos';
import s from './proto.module.css';

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

const musicianTabScreens: Record<string, ScreenId | undefined> = {
  'my-bookd': 'my-bookd',
  'local-pulse': 'local-pulse',
  connections: 'connections',
};
const venueTabScreens: Record<string, ScreenId | undefined> = { 'my-lineup': 'lineup' };

interface ScreenProps {
  /** Accessible name for the screen's main region. */
  label: string;
  topBar?: TopBarProps;
  /** Sticky actions pinned above the home indicator. */
  footer?: ReactNode;
  /** Show the musician or venue tab bar with this tab active. */
  tabs?: { kind: 'musician' | 'venue'; active: string };
  /** Content that bleeds under the status bar (photo or gradient headers). */
  hero?: ReactNode;
  /** Put the content on a white sheet (light-theme island), as on the venue profiles. */
  sheet?: boolean;
  children: ReactNode;
}

/**
 * One phone screen: optional top bar, a scrolling main region, sticky footer actions
 * and the tab bar. Moves focus to the new screen on navigation so keyboard and
 * screen reader users land at the top.
 */
export function Screen({ label, topBar, footer, tabs, hero, sheet, children }: ScreenProps) {
  const { screen, navCount, tab, notify } = useProto();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    main.scrollTop = 0;
    // Skip the first load so Storybook doesn't steal focus.
    if (navCount > 0) main.focus({ preventScroll: true });
  }, [screen, navCount]);

  const onTab = (id: string) => {
    const map = tabs?.kind === 'venue' ? venueTabScreens : musicianTabScreens;
    const target = map[id];
    if (target) tab(target);
    else notify(NOT_IN_PROTOTYPE);
  };

  return (
    <div className={cx(s.screen, !!hero && s.screenHero)}>
      <main ref={mainRef} className={s.main} tabIndex={-1} aria-label={label}>
        {topBar && <TopBar {...topBar} className={cx(s.topBar, !!hero && s.topBarOverHero)} />}
        {hero}
        <div className={cx(s.content, sheet && s.sheet)} data-bookd-theme={sheet ? 'light' : undefined}>
          {children}
        </div>
      </main>
      {footer && (
        <div className={cx(s.footer, sheet && s.footerLight)} data-bookd-theme={sheet ? 'light' : undefined}>
          {footer}
        </div>
      )}
      {tabs && (
        <BottomNavigation
          items={tabs.kind === 'venue' ? venueTabs : musicianTabs}
          activeId={tabs.active}
          onSelect={onTab}
          label={tabs.kind === 'venue' ? 'Venue' : 'Main'}
          className={s.tabs}
        />
      )}
    </div>
  );
}

export function SectionHeader({ title, action, onAction, id }: { title: string; action?: string; onAction?: () => void; id?: string }) {
  return (
    <div className={s.sectionHeader}>
      <h2 id={id} className={s.h2}>{title}</h2>
      {action && (
        <button type="button" className={s.textLink} onClick={onAction}>
          {action}
          <Icon name="chevronRight" size={16} />
        </button>
      )}
    </div>
  );
}

export function Img({ photo, className }: { photo: Photo; className?: string }) {
  return <img src={photo.src} alt={photo.alt} className={cx(s.img, className)} />;
}

/** A tappable row with a leading icon tile, text and a chevron. */
export function ListRow({
  icon,
  title,
  meta,
  onClick,
  trailing,
  light,
}: {
  icon?: IconName;
  title: ReactNode;
  meta?: ReactNode;
  onClick?: () => void;
  trailing?: ReactNode;
  light?: boolean;
}) {
  const inner = (
    <>
      {icon && (
        <span className={s.rowIcon} aria-hidden="true">
          <Icon name={icon} size={20} />
        </span>
      )}
      <span className={s.rowText}>
        <span className={s.rowTitle}>{title}</span>
        {meta && <span className={s.rowMeta}>{meta}</span>}
      </span>
      {trailing}
      {onClick && <Icon name="chevronRight" size={20} className={s.chevron} />}
    </>
  );
  const cls = cx(s.row, light && s.rowLight);
  return onClick ? (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/** A checkbox styled as Bookd's pink check, with its text as the label. */
export function Check({
  checked,
  onChange,
  children,
  meta,
  boxed,
  leading,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  meta?: ReactNode;
  boxed?: boolean;
  leading?: ReactNode;
}) {
  return (
    <label className={cx(s.check, boxed && s.checkBoxed, boxed && checked && s.checkOn)}>
      <input type="checkbox" className={s.checkInput} checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className={s.checkBox} aria-hidden="true">
        <Icon name="check" size={14} />
      </span>
      {leading}
      <span className={s.rowText}>
        <span className={s.checkLabel}>{children}</span>
        {meta && <span className={s.rowMeta}>{meta}</span>}
      </span>
    </label>
  );
}

/** Small print at the end of a screen: demo-data and photo credits. */
export function Footnote({ children }: { children: ReactNode }) {
  return <p className={s.footnote}>{children}</p>;
}
