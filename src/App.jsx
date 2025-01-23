import React, { useState, useEffect } from 'react';
import { AuthModal } from './components/AuthModal';
import { supabase } from './supabaseClient';
import AuthenticatedApp from './components/AuthenticatedApp';

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

  if (!session) {
    return <AuthModal />;
  }

  return <AuthenticatedApp session={session} />;
}

export default App;