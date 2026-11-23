import { Button } from './components/Button';

// Placeholder shell. Product screens land here once the UX work is ready.
export default function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        gap: 'var(--bookd-space-4)',
        padding: 'var(--bookd-space-6)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ font: 'var(--bookd-type-4xl-emphasized)', margin: 0 }}>Bookd</h1>
        <p style={{ color: 'var(--bookd-text-sub-700)' }}>
          Local-first booking for musicians and venues.
        </p>
        <Button>Get started</Button>
      </div>
    </main>
  );
}
