import type { IconName } from '../Icon';

/** Where a booking is in the offer-and-accept process (shared by musician and venue). */
export type BookingStatus = 'confirmed' | 'pending' | 'declined' | 'canceled' | 'completed';

/**
 * What Bookd knows about a venue's booking availability. Modeled separately from
 * verification: a verified venue can still be "not booking", and an unclaimed one
 * can be known to host music.
 */
export type VenueAvailability = 'open-gig' | 'accepting-intros' | 'hosts-music' | 'not-booking' | 'unverified';

/** Lifecycle of a published opportunity (gig posting). */
export type OpportunityStatus = 'open' | 'closed' | 'expired';

export type Status = BookingStatus | VenueAvailability | OpportunityStatus;

export type Tone = 'confirmed' | 'pending' | 'declined' | 'open' | 'unknown';

/** Tone (color pair), icon and default label for every status. Text is always shown. */
export const statusDefinitions: Record<Status, { tone: Tone; icon: IconName; label: string; dashed?: boolean }> = {
  // Booking process
  confirmed: { tone: 'confirmed', icon: 'check', label: 'Confirmed' },
  pending: { tone: 'pending', icon: 'clock', label: 'Pending' },
  declined: { tone: 'declined', icon: 'x', label: 'Declined' },
  canceled: { tone: 'declined', icon: 'ban', label: 'Canceled' },
  completed: { tone: 'unknown', icon: 'check', label: 'Completed' },
  // Venue availability
  'open-gig': { tone: 'open', icon: 'calendar', label: 'Open gig' },
  'accepting-intros': { tone: 'open', icon: 'message', label: 'Accepting intros' },
  'hosts-music': { tone: 'unknown', icon: 'music', label: 'Booking unknown' },
  'not-booking': { tone: 'unknown', icon: 'pause', label: 'Not booking' },
  unverified: { tone: 'unknown', icon: 'help', label: 'Unverified', dashed: true },
  // Opportunity lifecycle
  open: { tone: 'open', icon: 'calendar', label: 'Open' },
  closed: { tone: 'unknown', icon: 'lock', label: 'Closed' },
  expired: { tone: 'unknown', icon: 'history', label: 'Expired' },
};
