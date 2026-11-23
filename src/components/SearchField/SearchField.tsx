import { useId, useRef, useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { Icon } from '../Icon';
import styles from './SearchField.module.css';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value' | 'defaultValue'> {
  /** Accessible name. Always required; shown above the field when `hideLabel` is false. */
  label: string;
  /** Hide the label visually (it stays available to screen readers). Default true. */
  hideLabel?: boolean;
  value?: string;
  defaultValue?: string;
  /** Called with the new text on every change and when the field is cleared. */
  onValueChange?: (value: string) => void;
  /** Shows a filter button at the end of the field. */
  onFiltersClick?: () => void;
  /** Number of active filters, shown on the filter button and in its name. */
  activeFilterCount?: number;
}

/**
 * Search input for venues, gigs and genres. Includes a clear button once there is
 * text and an optional filter button that opens the filter sheet.
 */
export function SearchField({
  label,
  hideLabel = true,
  value,
  defaultValue,
  onValueChange,
  onChange,
  onFiltersClick,
  activeFilterCount = 0,
  className,
  id,
  placeholder = 'Search venues, gigs, or genres',
  ...rest
}: SearchFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inner, setInner] = useState(defaultValue ?? '');
  const current = value ?? inner;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInner(event.target.value);
    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  const clear = () => {
    if (value === undefined) setInner('');
    onValueChange?.('');
    inputRef.current?.focus();
  };

  const filterName =
    activeFilterCount > 0 ? `Filters, ${activeFilterCount} active` : 'Filters';

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={hideLabel ? styles.srOnly : styles.label}>
        {label}
      </label>
      <div className={styles.field}>
        <Icon name="search" className={styles.searchIcon} />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          className={styles.input}
          value={current}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
          {...rest}
        />
        {current !== '' && (
          <button type="button" className={styles.iconButton} onClick={clear} aria-label="Clear search">
            <Icon name="x" />
          </button>
        )}
        {onFiltersClick && (
          <button type="button" className={styles.iconButton} onClick={onFiltersClick} aria-label={filterName}>
            <Icon name="sliders" />
            {activeFilterCount > 0 && (
              <span className={styles.filterCount} aria-hidden="true">
                {activeFilterCount}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
