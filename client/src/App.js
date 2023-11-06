import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/user.context';
import Calendar from './pages/Calendar';
import Login from './pages/Login.page';
import PrivateRoute from './pages/PrivateRoute.page';
import { EventProvider } from './contexts/event.context';

function App() {
  return (
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
  );
}

export default App;
