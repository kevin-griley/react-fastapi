import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { ApiProvider } from './contexts/ApiProvider'
import { UserProvider }  from './contexts/UserProvider'
import  ResumePage  from './pages/ResumePage';
import FeedPage from './pages/FeedPage';
import { LoginPage } from './pages/LoginPage';
import UserPage from './pages/UserPage';
import { RegistrationPage } from './pages/RegistrationPage';

import { MantineProvider, ColorSchemeProvider, ColorScheme, Paper} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';


function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <ApiProvider>
              <UserProvider>


                <Routes>
                  <Route path="/" element={<ResumePage />} />

                  <Route path="/feed" element={
                    <PrivateRoute><FeedPage /></PrivateRoute>
                  } />

                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={ <RegistrationPage /> } />
                  <Route path="/user/:user_id" element={<UserPage />} />
                  <Route path="*" element={< Navigate to="/" />} />
                </Routes>

              </UserProvider>
            </ApiProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default App;
