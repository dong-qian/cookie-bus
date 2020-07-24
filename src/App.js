import React from 'react';
import { ActionHeader, FeatureView } from './features';
import { ProfileProvider, FeatureProvider, CookieProvider } from './store';

const App = React.memo(() => {
  return (
    <div className="main relative flex flex-col container mx-auto bg-gray-900">
      <FeatureProvider>
        <ProfileProvider>
          <CookieProvider>
            <ActionHeader />
            <FeatureView />
          </CookieProvider>
        </ProfileProvider>
      </FeatureProvider>
    </div>
  );
});

export default App;
