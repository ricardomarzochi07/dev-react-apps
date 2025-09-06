import React, { Suspense, lazy } from 'react';

const RemoteHeader = lazy(() => import("iam/Header")); // "iam" debe coincidir con el name del remote

const App = () => (
  <Suspense fallback={<div>Loading remote...</div>}>
    <RemoteHeader />
  </Suspense>
);

export default App;