import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/user.context';
import Calendar from './pages/Calendar';
import Login from './pages/Login.page';
import PrivateRoute from './pages/PrivateRoute.page';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Calendar />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
