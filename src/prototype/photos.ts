/**
 * AI-generated photos made in Figma for the Bookd mockups. They show no real people,
 * venues or events. Always keep the "AI-generated" wording in alt text and credits.
 * See src/assets/photos/README.md.
 */
import barnWedding from '../assets/photos/barn-wedding.jpg';
import crowd from '../assets/photos/crowd.jpg';
import harborPatio from '../assets/photos/harbor-patio.jpg';
import performer from '../assets/photos/performer.jpg';
import pianist from '../assets/photos/pianist.jpg';
import copper from '../assets/photos/venue-copper-kettle-cafe.jpg';
import fore from '../assets/photos/venue-fore-street-social.jpg';
import harborside from '../assets/photos/venue-harborside-taproom.jpg';
import lantern from '../assets/photos/venue-lantern-room.jpg';

export interface Photo {
  src: string;
  alt: string;
}

export const photos = {
  performer: { src: performer, alt: 'AI-generated photo: a solo guitarist singing at a brick-walled bar' },
  crowd: { src: crowd, alt: 'AI-generated photo: a crowd watching a local set in a packed pub' },
  pianist: { src: pianist, alt: 'AI-generated photo: a pianist playing an upright piano in a café' },
  harborPatio: { src: harborPatio, alt: 'AI-generated photo: a mandolin and upright bass duo playing on a harbor-side patio' },
  barnWedding: { src: barnWedding, alt: 'AI-generated photo: guests dancing to a singer and keyboard player at a barn wedding' },
  lantern: { src: lantern, alt: 'AI-generated photo: a lantern-lit listening room with rows of wooden chairs' },
  harborside: { src: harborside, alt: 'AI-generated photo: a waterfront brick taproom with a small stage at dusk' },
  copper: { src: copper, alt: 'AI-generated photo: a bright café with plants and a guitar by the window' },
  fore: { src: fore, alt: 'AI-generated photo: a restaurant bar with green velvet stools and a marble counter' },
} satisfies Record<string, Photo>;

export type PhotoName = keyof typeof photos;

export const PHOTO_CREDIT = 'Photos are AI-generated for this mockup and show no real people or venues.';
