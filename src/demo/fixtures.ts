/**
 * FICTIONAL DEMO DATA. Every venue, act, address, date and amount here is made up
 * for Storybook and tests. None of it describes a real business, performer or
 * booking, and none of it is research evidence.
 */
import type { VenueAvailability } from '../components/StatusBadge';
import type { VenueVerification } from '../components/VenueCard';

export const DEMO_NOTICE = 'Fictional demo data. Venues, acts and dates are made up.';

export interface DemoVenue {
  id: string;
  name: string;
  location: string;
  distance: string;
  capacity: number;
  genres: string[];
  verification: VenueVerification;
  availability: VenueAvailability;
}

export const demoVenues: DemoVenue[] = [
  {
    id: 'lantern-room',
    name: 'The Lantern Room',
    location: 'Harbor District, Portland',
    distance: '0.8 mi',
    capacity: 180,
    genres: ['Indie', 'Folk', 'Singer-songwriter'],
    verification: 'verified',
    availability: 'open-gig',
  },
  {
    id: 'tidewater-hall',
    name: 'Tidewater Hall',
    location: 'Old Mill Row, Portland',
    distance: '2.4 mi',
    capacity: 350,
    genres: ['Rock', 'Alt', 'Punk'],
    verification: 'verified',
    availability: 'accepting-intros',
  },
  {
    id: 'saltbox-brewing',
    name: 'Saltbox Brewing Co.',
    location: 'Fore Point, South Portland',
    distance: '4.1 mi',
    capacity: 90,
    genres: ['Bluegrass', 'Americana'],
    verification: 'unclaimed',
    availability: 'hosts-music',
  },
  {
    id: 'juniper-vine',
    name: 'Juniper & Vine',
    location: 'Cove Street, Portland',
    distance: '1.6 mi',
    capacity: 60,
    genres: ['Jazz', 'Acoustic'],
    verification: 'verified',
    availability: 'not-booking',
  },
  {
    id: 'pier-nine',
    name: 'Pier Nine Taproom',
    location: 'Ferry Landing, Cape Shore',
    distance: '7.9 mi',
    capacity: 120,
    genres: ['Cover band', 'Rock'],
    verification: 'claim-pending',
    availability: 'unverified',
  },
];

export const demoOpportunities = [
  {
    id: 'opp-1',
    title: 'Friday acoustic night',
    venueName: 'The Lantern Room',
    date: '2027-03-12',
    time: '8:00 to 10:00 PM',
    pay: '$150 guarantee',
    distance: '0.8 mi',
    note: 'Open to local acts. Backline provided.',
    status: 'open' as const,
  },
  {
    id: 'opp-2',
    title: 'Saturday headliner slot',
    venueName: 'Tidewater Hall',
    date: '2027-03-20',
    time: '9:30 PM',
    pay: '$300 to $450, door split after 100',
    distance: '2.4 mi',
    status: 'closed' as const,
  },
  {
    id: 'opp-3',
    title: 'Sunday jazz brunch',
    venueName: 'Juniper & Vine',
    date: '2027-01-10',
    time: '11:00 AM to 1:00 PM',
    pay: '$120 plus meal',
    distance: '1.6 mi',
    status: 'expired' as const,
  },
];

export const demoBooking = {
  venueName: 'The Lantern Room',
  venueAddress: '12 Wharf Lane, Harbor District, Portland',
  actName: 'Wren & the Low Tide',
  date: '2027-03-12',
  setTime: '9:00 PM',
  setLength: '2 x 40 min',
  pay: '$150 guarantee',
  paymentNote: 'Not paid yet, tracked by hand',
  reference: 'DEMO-0312',
};

export const demoGenres = ['Indie', 'Rock', 'Folk', 'Jazz', 'Americana', 'Singer-songwriter', 'Punk', 'Bluegrass'];
