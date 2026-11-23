/**
 * FICTIONAL DEMO DATA for the clickable prototypes. Every venue, act, address, email,
 * date and amount is made up and matches the high-fi screens in Figma. None of it
 * describes a real business, performer or booking.
 */
import type { PhotoName } from './photos';

export const act = { name: 'Juniper & the Tides', first: 'Juniper', initials: 'JT' };

export const openGigs: {
  id: string;
  date: string;
  time: string;
  venue: string;
  pay: string;
  style: string;
  distance: string;
  posted: string;
  photo: PhotoName;
}[] = [
  { id: 'acoustic-friday', date: 'Fri, Dec 11', time: '8–10 PM', venue: 'The Lantern Room', pay: '$250 guarantee', style: 'Solo / duo · acoustic', distance: '0.8 mi', posted: 'posted 2h ago', photo: 'taproom' },
  { id: 'folk-night', date: 'Sat, Dec 19', time: '6–9 PM', venue: 'Copper Kettle Café', pay: '$150 + tips', style: 'Folk · singer-songwriter', distance: '2.1 mi', posted: 'posted 1d ago', photo: 'pianist' },
  { id: 'sunday-matinee', date: 'Sun, Jan 3', time: '1–3 PM', venue: 'The Lantern Room', pay: '$200 guarantee', style: 'Sunday matinee · acoustic', distance: '0.8 mi', posted: 'posted 3d ago', photo: 'performer' },
];

export const whoIsBooking = [
  { id: 'w1', icon: 'calendar', text: 'Copper Kettle Café posted an open date', source: 'Venue-posted', strong: true, when: '2h ago' },
  { id: 'w2', icon: 'message', text: 'The Lantern Room is accepting introductions', source: 'Venue-confirmed', strong: true, when: '1d ago' },
  { id: 'w3', icon: 'music', text: 'Harborside Taproom lists live music on its public calendar', source: 'Public evidence · unconfirmed', strong: false, when: '3d ago' },
] as const;

export const nearbyVenues = [
  { id: 'lantern', name: 'The Lantern Room', type: 'Listening room', distance: '0.8 mi', verification: 'verified', availability: 'accepting-intros', photo: 'taproom', genres: ['Acoustic', 'Folk'] },
  { id: 'harborside', name: 'Harborside Taproom', type: 'Brewery', distance: '1.4 mi', verification: 'unclaimed', availability: 'hosts-music', photo: 'crowd', genres: ['Live music'] },
  { id: 'copper', name: 'Copper Kettle Café', type: 'Café', distance: '2.1 mi', verification: 'verified', availability: 'not-booking', photo: 'pianist', genres: ['Folk', 'Piano'] },
  { id: 'fore', name: 'Fore Street Social', type: 'Restaurant & bar', distance: '3.0 mi', verification: 'unclaimed', availability: 'hosts-music', photo: 'performer', genres: ['Covers'] },
] as const;

export const samples = [
  { id: 's1', title: '“Low Tide” · live, audio', meta: '2:48 · recorded Oct 2026', kind: 'audio' },
  { id: 's2', title: 'Full set at a café · video', meta: '12:10', kind: 'video' },
  { id: 's3', title: '“Northbound” · studio, audio', meta: '3:32', kind: 'audio' },
] as const;

export const gig = {
  title: 'Acoustic Friday',
  venue: 'The Lantern Room',
  address: 'The Lantern Room, 12 Demo St, Portland, ME',
  isoDate: '2026-12-11',
  date: 'Fri, Dec 11',
  times: '8:00–10:00 PM',
  sets: 'two 50-min sets',
  pay: '$250 guarantee',
  offerPay: '$275 guarantee',
  loadIn: '7:15 PM',
  style: 'Solo / duo · acoustic, folk',
  provided: 'House PA and one mic stand',
  closes: 'Applications close Fri, Dec 4',
  reference: 'BKD-PWM-0142',
};

export const DEMO_FOOTNOTE = 'Fictional demo data.';
