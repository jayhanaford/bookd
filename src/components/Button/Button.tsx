import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'primary-solid' | 'secondary' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `primary` is the pink-to-magenta gradient CTA. `primary-solid` is its solid
   * fallback for places a gradient can't be used. `secondary` is the outline
   * button, `tertiary` a low-emphasis text button.
   */
  variant?: ButtonVariant;
  /** `sm` 36px, `md` 44px (default, minimum touch target), `lg` 52px. */
  size?: ButtonSize;
  /** Stretch to the width of its container, as on mobile CTAs. */
  fullWidth?: boolean;
  /** Shows a spinner, sets aria-busy and ignores clicks. The label stays for screen readers. */
  loading?: boolean;
  /** Icon before the label. Decorative: hide it from assistive tech yourself if it is an <svg>. */
  iconStart?: ReactNode;
  /** Icon after the label, such as an arrow. */
  iconEnd?: ReactNode;
}

/** Bookd button. All styling comes from `--bookd-*` semantic tokens. */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  iconStart,
  iconEnd,
  className,
  type = 'button',
  children,
  onClick,
  ...rest
}: ButtonProps) {
  const cls = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={cls}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={handleClick}
      {...rest}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : iconStart}
      <span className={styles.label}>{children}</span>
      {!loading && iconEnd}
    </button>
  );
}
