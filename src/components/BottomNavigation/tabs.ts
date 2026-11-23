import type { BottomNavigationItem } from './BottomNavigation';

/** Musician tabs from the high-fi screens. */
export const musicianTabs: BottomNavigationItem[] = [
  { id: 'my-bookd', label: 'My Bookd', icon: 'home' },
  { id: 'local-pulse', label: 'Local Pulse', icon: 'pulse' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'connections', label: 'Connections', icon: 'users' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

/** Venue tabs from the high-fi screens (Flow C). */
export const venueTabs: BottomNavigationItem[] = [
  { id: 'my-lineup', label: 'My Lineup', icon: 'list' },
  { id: 'find-talent', label: 'Find Talent', icon: 'search' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'inquiries', label: 'Inquiries', icon: 'message' },
  { id: 'venue', label: 'Venue', icon: 'building' },
];
