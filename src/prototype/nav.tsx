import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

/** Every screen in the clickable prototype, named after the high-fi frames in Figma. */
export const screenIds = [
  'welcome', // O1
  'local-pulse', // A1
  'venue-verified', // A2
  'introduce', // A3
  'venue-unclaimed', // A4
  'gig-detail', // B1
  'apply', // B2
  'application-sent', // B3
  'offer', // B4
  'confirmed', // B5
  'my-bookd', // M1
  'connections', // M2
  'lineup', // C1
  'post-basics', // C2
  'post-schedule', // C3
  'post-preview', // C4
] as const;

export type ScreenId = (typeof screenIds)[number];

/** What the person has done so far, so later screens can reflect it. */
export interface ProtoState {
  introSent: boolean;
  applied: boolean;
  offerAccepted: boolean;
  savedVenue: boolean;
  publishedDates: number | null;
}

const initialState: ProtoState = {
  introSent: false,
  applied: false,
  offerAccepted: false,
  savedVenue: false,
  publishedDates: null,
};

interface ProtoContextValue {
  screen: ScreenId;
  /** Bumps on every navigation, so screens know to move focus. 0 on first load. */
  navCount: number;
  canGoBack: boolean;
  /** Push a screen. */
  go: (id: ScreenId) => void;
  /** Pop back one screen, or to `fallback` if there is no history. */
  back: (fallback?: ScreenId) => void;
  /** Switch tabs: replace the history with this screen. */
  tab: (id: ScreenId) => void;
  /** Show a short status message (announced to screen readers). */
  notify: (message: string) => void;
  toast: { id: number; message: string } | null;
  state: ProtoState;
  update: (patch: Partial<ProtoState>) => void;
  restart: () => void;
}

const ProtoContext = createContext<ProtoContextValue | null>(null);

export function ProtoProvider({ initialScreen = 'welcome', children }: { initialScreen?: ScreenId; children: ReactNode }) {
  const [stack, setStackRaw] = useState<ScreenId[]>([initialScreen]);
  const [navCount, setNavCount] = useState(0);
  const setStack = useCallback((next: ScreenId[] | ((s: ScreenId[]) => ScreenId[])) => {
    setStackRaw(next);
    setNavCount((n) => n + 1);
  }, []);
  const [state, setState] = useState<ProtoState>(initialState);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const notify = useCallback((message: string) => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), message });
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const value = useMemo<ProtoContextValue>(
    () => ({
      screen: stack[stack.length - 1],
      navCount,
      canGoBack: stack.length > 1,
      go: (id) => setStack((s) => [...s, id]),
      back: (fallback = 'local-pulse') => setStack((s) => (s.length > 1 ? s.slice(0, -1) : [fallback])),
      tab: (id) => setStack([id]),
      notify,
      toast,
      state,
      update: (patch) => setState((s) => ({ ...s, ...patch })),
      restart: () => {
        setStackRaw([initialScreen]);
        setNavCount(0);
        setState(initialState);
        setToast(null);
      },
    }),
    [stack, navCount, setStack, state, toast, notify, initialScreen],
  );

  return <ProtoContext.Provider value={value}>{children}</ProtoContext.Provider>;
}

export function useProto() {
  const ctx = useContext(ProtoContext);
  if (!ctx) throw new Error('useProto must be used inside <ProtoProvider>');
  return ctx;
}

/** Message for tabs and links that are outside this prototype. */
export const NOT_IN_PROTOTYPE = 'Not part of this prototype yet';
