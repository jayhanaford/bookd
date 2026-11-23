import type { HTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './BottomNavigation.module.css';

export interface BottomNavigationItem {
  id: string;
  label: string;
  icon: IconName;
}

export interface BottomNavigationProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  items: BottomNavigationItem[];
  /** The tab for the current screen. Marked with aria-current="page". */
  activeId: string;
  onSelect?: (id: string) => void;
  /** Accessible name of the nav landmark. */
  label?: string;
}

/**
 * Bookd's tab bar. The active tab gets the gradient pill behind its icon plus bold,
 * full-contrast text, so the current tab never relies on color alone.
 */
export function BottomNavigation({ items, activeId, onSelect, label = 'Main', className, ...rest }: BottomNavigationProps) {
  return (
    <nav aria-label={label} className={[styles.nav, className].filter(Boolean).join(' ')} {...rest}>
      <ul className={styles.list}>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={[styles.tab, active && styles.active].filter(Boolean).join(' ')}
                aria-current={active ? 'page' : undefined}
                onClick={() => onSelect?.(item.id)}
              >
                <span className={styles.pill}>
                  <Icon name={item.icon} size={20} />
                </span>
                <span className={styles.label}>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
