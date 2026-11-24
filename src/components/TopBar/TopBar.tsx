import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './TopBar.module.css';

export interface TopBarAction {
  icon: IconName;
  /** Accessible name, e.g. "Back" or "Save venue". */
  label: string;
  onClick?: () => void;
  /** Shows the icon button as switched on (aria-pressed), e.g. a saved heart. */
  pressed?: boolean;
}

export interface TopBarProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Centered screen title. Leave empty on screens whose page heading sits below the bar. */
  title?: ReactNode;
  /** Leading button, usually back (`chevronLeft`) or close (`x`). */
  leading?: TopBarAction;
  /** Up to two trailing icon buttons. */
  trailing?: TopBarAction[];
  /**
   * `solid`: sits on the dark canvas. `overlay`: transparent, with round dark buttons
   * for use over a photo or gradient header.
   */
  variant?: 'solid' | 'overlay';
}

function IconButton({ action }: { action: TopBarAction }) {
  return (
    <button
      type="button"
      className={styles.iconButton}
      aria-label={action.label}
      aria-pressed={action.pressed}
      onClick={action.onClick}
    >
      <Icon name={action.icon} size={20} />
    </button>
  );
}

/**
 * Bookd's screen header: an optional back or close button, a centered title and up
 * to two icon actions. Every icon button has an accessible name and a 44px target.
 */
export function TopBar({ title, leading, trailing = [], variant = 'solid', className, ...rest }: TopBarProps) {
  return (
    <header className={[styles.bar, styles[variant], className].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.side}>{leading && <IconButton action={leading} />}</div>
      {title ? <h1 className={styles.title}>{title}</h1> : <span />}
      <div className={[styles.side, styles.end].join(' ')}>
        {trailing.map((a) => (
          <IconButton key={a.label} action={a} />
        ))}
      </div>
    </header>
  );
}
