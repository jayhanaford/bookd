import type { ComponentType } from 'react';
import { ProtoProvider, useProto, type ScreenId } from './nav';
import { PhoneFrame } from './PhoneFrame';
import { Apply, ApplicationSent, Confirmed, GigDetail, Offer } from './screens/FlowB';
import { Introduce } from './screens/Introduce';
import { LocalPulse } from './screens/LocalPulse';
import { Connections, MyBookd } from './screens/Musician';
import { Lineup, PostBasics, PostPreview, PostSchedule } from './screens/Venue';
import { VenueUnclaimed, VenueVerified } from './screens/Venues';
import { Welcome } from './screens/Welcome';

const screens: Record<ScreenId, ComponentType> = {
  welcome: Welcome,
  'local-pulse': LocalPulse,
  'venue-verified': VenueVerified,
  introduce: Introduce,
  'venue-unclaimed': VenueUnclaimed,
  'gig-detail': GigDetail,
  apply: Apply,
  'application-sent': ApplicationSent,
  offer: Offer,
  confirmed: Confirmed,
  'my-bookd': MyBookd,
  connections: Connections,
  lineup: Lineup,
  'post-basics': PostBasics,
  'post-schedule': PostSchedule,
  'post-preview': PostPreview,
};

function CurrentScreen() {
  const { screen } = useProto();
  const Screen = screens[screen];
  return <Screen key={screen} />;
}

export interface BookdPrototypeProps {
  /** Where the prototype starts. */
  initialScreen?: ScreenId;
}

/** The clickable Bookd prototype: every high-fi screen wired together inside a phone frame. */
export function BookdPrototype({ initialScreen = 'welcome' }: BookdPrototypeProps) {
  return (
    <ProtoProvider key={initialScreen} initialScreen={initialScreen}>
      <PhoneFrame>
        <CurrentScreen />
      </PhoneFrame>
    </ProtoProvider>
  );
}
