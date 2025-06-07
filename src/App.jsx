import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router'
import { UserProvider } from './context/UserContext';
import TheCollection from './TheCollection';
import VariantForm from './VariantForm';
import LoginForm from './LoginForm';
import Logout from './Logout';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="container py-5"><h1>Loading...</h1></div>}>
        <UserProvider>
          <Routes>
            <Route path="/collection/" element={<TheCollection />} />
            <Route path="/collection/add" element={<VariantForm />} />
            <Route path="/collection/edit/:id" element={<VariantForm />} />
            <Route path="/collection/login" element={<LoginForm />} />
            <Route path="/collection/logout" element={<Logout />} />
          </Routes>
        </UserProvider>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
