import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UserProvider } from './contexts/user.context';
import Calendar from './pages/Calendar';
import Login from './pages/Login.page';
import PrivateRoute from './pages/PrivateRoute.page';
import { EventProvider } from './contexts/event.context';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <EventProvider>
            <Routes>
              <Route exact path="/login" element={<Login />} />

              <Route element={<PrivateRoute />}>
                <Route exact path="/" element={<Calendar />} />
              </Route>
            </Routes>
          </EventProvider>
        </UserProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
