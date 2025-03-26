import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import AuthModal from './modules/auth/components/AuthModal';
import AuthenticatedApp from './modules/report/components/AuthenticatedApp';
import UIProvider from './modules/ui/providers/UIProvider';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UIProvider>
      {!session ? <AuthModal /> : <AuthenticatedApp session={session} />}
    </UIProvider>
  );
}

export default App;