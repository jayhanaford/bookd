import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import styles from './FilterChip.module.css';

export interface FilterChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Whether the filter is on. Exposed to assistive tech as aria-pressed. */
  selected?: boolean;
  /** Called with the next value when the chip is pressed. */
  onSelectedChange?: (selected: boolean) => void;
  /** Optional leading icon (decorative). Replaced by a check mark while selected. */
  icon?: ReactNode;
  /** Optional result count, e.g. 12 venues. Read out as part of the label. */
  count?: number;
}

/**
 * A toggle for one filter value (a genre, venue type or date). Selected chips use the
 * brand gradient with a dark label and a check mark, so selection never relies on
 * color alone.
 */
export function FilterChip({
  selected = false,
  onSelectedChange,
  icon,
  count,
  className,
  children,
  onClick,
  type = 'button',
  ...rest
}: FilterChipProps) {
  const cls = [styles.chip, selected && styles.selected, className].filter(Boolean).join(' ');
  return (
    <button
      type={type}
      className={cls}
      aria-pressed={selected}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onSelectedChange?.(!selected);
      }}
      {...rest}
    >
      {selected ? <Icon name="check" className={styles.icon} /> : icon}
      <span>{children}</span>
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </button>
  );
}
