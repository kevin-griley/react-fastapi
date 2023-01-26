import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

import { ApiProvider } from './contexts/ApiProvider'
import { UserProvider }  from './contexts/UserProvider'

import  ResumePage  from './pages/ResumePage';
import FeedPage from './pages/FeedPage';
import UserPage from './pages/UserPage';

import { SplashPage } from './pages/SplashPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';

import { MantineProvider, ColorSchemeProvider, ColorScheme, MantineThemeOverride} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';


function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };

  const myTheme: MantineThemeOverride = {
    colorScheme: 'light',
    primaryColor: 'orange',
    defaultRadius: 0,
  };

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <ApiProvider>
              <UserProvider>

                <Routes>
                  <Route path="/" element={<SplashPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={ <RegistrationPage /> } />

                  <Route path="*" element={
                    <PrivateRoute>
                      <Routes>
                        <Route path="/resume" element={<ResumePage />} />
                        <Route path="/feed" element={<FeedPage />} />
                        <Route path="/user/:user_id" element={<UserPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </PrivateRoute>
                  } />

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
