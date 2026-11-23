/**
 * AI-generated photos made in Figma for the Bookd mockups. They show no real people,
 * venues or events. Always keep the "AI-generated" wording in alt text and credits.
 * See src/assets/photos/README.md.
 */
import crowd from '../assets/photos/crowd.jpg';
import performer from '../assets/photos/performer.jpg';
import pianist from '../assets/photos/pianist.jpg';
import taproom from '../assets/photos/taproom.jpg';

export interface Photo {
  src: string;
  alt: string;
}

export const photos = {
  performer: { src: performer, alt: 'AI-generated photo: a solo guitarist singing at a brick-walled bar' },
  taproom: { src: taproom, alt: 'AI-generated photo: a waterfront taproom with a small stage at dusk' },
  crowd: { src: crowd, alt: 'AI-generated photo: a crowd watching a local set in a packed pub' },
  pianist: { src: pianist, alt: 'AI-generated photo: a pianist playing an upright piano in a café' },
} satisfies Record<string, Photo>;

export type PhotoName = keyof typeof photos;

export const PHOTO_CREDIT = 'Photos are AI-generated for this mockup and show no real people or venues.';
